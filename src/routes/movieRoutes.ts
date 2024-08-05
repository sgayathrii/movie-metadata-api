import express from 'express';
import { listMoviesController, updateMovieController } from "../controllers/movieController";


const router = express.Router();

router.get("/", listMoviesController);

router.put("/:id", updateMovieController);

export default router;