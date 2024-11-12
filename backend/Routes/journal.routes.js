import express from "express";
import {
    createJournalEntry,
    getAllJournalEntries,
    getJournalEntriesByDate,
    updateJournalEntry,
    deleteJournalEntry,
    getJournalFrequency,
} from "../Controllers/journal.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createJournalEntry);
router.get("/", protectRoute, getAllJournalEntries);
router.get("/by-date", protectRoute, getJournalEntriesByDate);
router.put("/:id", protectRoute, updateJournalEntry);
router.delete("/:id", protectRoute, deleteJournalEntry);
router.get("/frequency", protectRoute, getJournalFrequency);

export default router;
