import { Request, Response } from "express";
import { listMovies, updateMovie } from "../services/movieService";

interface MovieFilter {
  title?: string;
  genreId?: number;
}

interface MovieSort {
  sortBy?: "title" | "releaseDate";
  sortOrder?: "asc" | "desc";
}

export const listMoviesController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10);
    const pageSize = parseInt(req.query.pageSize as string, 10);

    const title = req.query.title as string;
    const genreId = req.query.genreId
      ? parseInt(req.query.genreId as string, 10)
      : undefined;

    const sortBy = (req.query.sortBy as "title" | "releaseDate") || "title";
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "asc";

    const filters: MovieFilter = {
      title,
      genreId,
    };

    const sorting: MovieSort = {
      sortBy,
      sortOrder,
    };

    const result = await listMovies(page, pageSize, filters, sorting);

    res.json({
      data: result.movies,
      pagination: {
        page: page || 1,
        pageSize: pageSize || 10,
        totalCount: result.totalCount,
        totalPages: pageSize ? Math.ceil(result.totalCount / pageSize) : 1
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching movies: " + error });
  }
};

export const updateMovieController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;

  try {
    const updatedMovie = await updateMovie(id, data);
    res.json({ data: updatedMovie });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the movie: " + error });
  }
};
