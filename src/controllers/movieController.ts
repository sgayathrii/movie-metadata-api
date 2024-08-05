import { Request, Response } from "express";
import { getMovies } from "../services/movieService";

export const listMovies = async (req: Request, res: Response) => {
    try {
        const movies = await getMovies();
        res.json({ data: movies });
    } catch(error) {
        res.status(500).json({ error: 'An error occurred while fetching movies'+error });
    }
};