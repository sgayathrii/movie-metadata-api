import express from 'express';
import { listMoviesController, updateMovieController } from "../controllers/movieController";


const router = express.Router();

// Route to list movies
router.get("/", listMoviesController);

// Route to update
router.put("/:id", updateMovieController);

export default router;