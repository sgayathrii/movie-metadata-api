import prisma from "../../prisma";

export const getMovies = async (page: number, pageSize: number) => {
    try {

        const skip = (page - 1) * pageSize;

        const movies = await prisma.movie.findMany({
            skip,
            take: pageSize, 
        });

        const totalCount = await prisma.movie.count();

        return {
            movies,
            totalCount,
        };
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw new Error('Failed to fetch movies');
    }
};
