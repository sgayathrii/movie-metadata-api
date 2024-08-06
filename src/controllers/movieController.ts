import { Request, Response } from "express";
import { listMovies, updateMovie } from "../services/movieService";

export const listMoviesController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

        const title = req.query.title as string;
        const genreId = req.query.genreId ? parseInt(req.query.genreId as string, 10) : undefined;

        const filters = {
            title,
            genreId
        };

        const result = await listMovies(page, pageSize, filters);

        res.json({
            movies: result.movies,
            totalCount: result.totalCount,
            page,
            pageSize
        });
    } catch(error) {
        res.status(500).json({ error: 'An error occurred while fetching movies'+error });
    }
};

export const updateMovieController = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;

    try {
        const updatedMovie = await updateMovie(id, data);
        res.json({ data: updatedMovie });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the movie: ' + error });
    }
}