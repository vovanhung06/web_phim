
import express from "express";
const router = express.Router();
import { getGenres, createGenre, updateGenre, deleteGenre } from "../controllers/genreController.js";

router.get("/", getGenres);
router.post("/", createGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
