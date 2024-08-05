import { Request, Response } from "express";
import { getMovies } from "../services/movieService";

export const listMovies = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1;
        const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

        const { movies, totalCount } = await getMovies(page, pageSize);
        
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