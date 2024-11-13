package com.example.demo.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MindfulMirrorController {
    @GetMapping("/")
    public MessageResponse helloWorld() {
        return new MessageResponse("Hello World!");
    }
}
