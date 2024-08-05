import express from 'express';
import { listMovies } from "../controllers/movieController";


const router = express.Router();

router.get("/", listMovies);

export default router;