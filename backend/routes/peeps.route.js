import express from "express";
import {
  getPeeps,
  createPeep,
  createComment
} from "../controllers/peeps.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new peep
router.post("/", auth, createPeep);

// Get all peeps in reverse chronological order
router.get("/", getPeeps);

router.post("/comment", auth, createComment);

export default router;
