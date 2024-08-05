import { Request, Response } from "express";
import { listMovies, updateMovie } from "../services/movieService";

export const listMoviesController = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

        const { movies, totalCount } = await listMovies(page, pageSize);

        res.json({
            data: movies,
            pagination: {
                page,
                pageSize,
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            },
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