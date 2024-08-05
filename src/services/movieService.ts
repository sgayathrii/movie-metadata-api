import prisma from "../../prisma";



export const listMovies = async (page: number, pageSize: number) => {
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
