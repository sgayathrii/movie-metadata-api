import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

interface MovieFilter {
    title?: string;
    genreId?: number;
}

export const listMovies = async (page: number, pageSize: number, filterBy: MovieFilter) => {
    try {

        const skip = (page - 1) * pageSize;

        const filterClause: Prisma.MovieWhereInput = {};

        if (filterBy.title) {
            filterClause.title = {
                contains: filterBy.title,
                mode: 'insensitive', // Case-insensitive search
            };
        }

        if (filterBy.genreId) {
            filterClause.genres = {
              array_contains: [{ id: filterBy.genreId }], 
            };
        }

        const movies = await prisma.movie.findMany({
            where: filterClause,
            skip,
            take: pageSize, 
        });

        const totalCount = await prisma.movie.count({where: filterClause,});

        return {
            movies,
            totalCount,
        };
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};

export const updateMovie = async (id: number, data: Partial<{
    title: string;
    overview: string;
    genres: { id: number; name: string }[]; 
    releaseDate: Date;
    runtime: number;
    voteAverage: number;
}>) => {
    try {
        // Update the movie with the given id
        const updatedMovie = await prisma.movie.update({
            where: { id },
            data,
        });
        return updatedMovie;
    } catch (error) {
        console.error('Error updating movie:', error);
        throw new Error('Failed to update movie');
    }
};
