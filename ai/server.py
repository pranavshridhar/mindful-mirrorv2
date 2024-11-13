import spacy
import torch
from transformers import DistilBertTokenizer, DistilBertModel
from sklearn.cluster import KMeans
import numpy as np
from collections import defaultdict
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline
from flask import Flask, request, jsonify
from flask_cors import CORS
import socket

nlp = spacy.load('en_core_web_sm')
torch.backends.mps.is_available()
device = "mps" if torch.backends.mps.is_available() else "cpu"
tokenizer = DistilBertTokenizer.from_pretrained("distilbert-base-uncased")
model = DistilBertModel.from_pretrained("distilbert-base-uncased").to(device)
emotion_detector = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=None, device=device)


app = Flask(__name__)
CORS(app)

def embed_sentences(sentences):
    embeddings = []
    for sentence in sentences:
        # Tokenize and send to device
        inputs = tokenizer(sentence, return_tensors="pt", truncation=True, max_length=512).to(device)

        # Forward pass without gradients to save memory
        with torch.no_grad():
            outputs = model(**inputs)

        # Mean pooling on the last hidden state to get a single embedding vector for the sentence
        sentence_embedding = outputs.last_hidden_state.mean(dim=1).squeeze().cpu().numpy()
        embeddings.append(sentence_embedding)

    return embeddings

def chunkify(bare_sentences, similarity_threshold=0.75): 
    
    final_chunks = []
    current_chunk = [(0, bare_sentences[0])]
    embeddings = embed_sentences(bare_sentences)
    

    for i in range(1, len(bare_sentences)):

        similarity = cosine_similarity(
            [embeddings[i - 1]], [embeddings[i]]
        )[0, 0]

        if similarity >= similarity_threshold:
            current_chunk.append((i, bare_sentences[i]))  # Append as (index, text)
        else:
            # Otherwise, finalize the current chunk and start a new one
            final_chunks.append(current_chunk)
            current_chunk = [(i, bare_sentences[i])]  # Start a new chunk with the new sentence
    
    if current_chunk:
        final_chunks.append(current_chunk)

    return final_chunks

def analyze_emotions_in_chunk(chunk_text):
    results = emotion_detector(chunk_text)
    emotions = {item['label']: item['score'] for item in results[0]}

    return {
        "chunk": chunk_text,
        "emotions": emotions
    }

def process_chunks(chunks):
    chunk_emotions = []

    for chunk in chunks:
        chunk_text = " ".join(sentence for _, sentence in chunk)
        analysis_result = analyze_emotions_in_chunk(chunk_text)
        start_index = chunk[0][0]
        end_index = chunk[-1][0]

        analysis_result["start_index"] = start_index
        analysis_result["end_index"] = end_index
        chunk_emotions.append(analysis_result)

        return chunk_emotions
        
        
def process(text):
    doc = nlp(text)
    sentences = list(doc.sents)
    bare_text = [sen.text.strip() for sen in sentences]

    chunks = chunkify(bare_text)
    data = process_chunks(chunks)

    sendback = []

    for chunk in data:
        first_sentence = sentences[chunk['start_index']]
        last_sentence = sentences[chunk['end_index']]

        chunk_data = {
            "start_idx": first_sentence.start_char,
            "end_idx": last_sentence.end_char,
            "emotions": chunk["emotions"]
        }

        sendback.append(chunk_data)

    return sendback





@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    entry = data["entry"]

    results = process(entry)
    return jsonify(results), 200


    

@app.route("/", methods=["GET"])
def basic():
    return jsonify({"message": "Hello world"}), 200


if __name__ == '__main__':

    # Run Flask app, binding to 0.0.0.0 to be accessible on the network
    app.run(host="0.0.0.0", port=5001, debug=True)