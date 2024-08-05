import prisma from "../../prisma";

export const getMovies = async () => {
    try {
        const movies = await prisma.movie.findMany();
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};
