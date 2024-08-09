import { Prisma } from "@prisma/client";
import prisma from "../../prisma";

interface MovieFilter {
  title?: string;
  genreId?: number;
}

interface MovieSort {
  sortBy?: "title" | "releaseDate";
  sortOrder?: "asc" | "desc";
}

export const listMovies = async (
  page: number = 1,
  pageSize: number = 10,
  filterBy: MovieFilter = {},
  sortBy: MovieSort
) => {
  try {

    // Calculate pagination
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize ? pageSize : undefined;

    const filterClause: Prisma.MovieWhereInput = {};

    // Add title filter if provided
    if (filterBy.title) {
      filterClause.title = {
        contains: filterBy.title,
        mode: "insensitive",
      };
    }

     // Add genre filter if provided
    if (filterBy.genreId) {
      filterClause.genres = {
        array_contains: [{ id: filterBy.genreId }],
      };
      
    }

    // Apply sorting if a field is specified
    const { sortBy: sortField = "title", sortOrder = "asc" } = sortBy;

    const orderByClause: Prisma.MovieOrderByWithRelationInput = {};

    if (sortField) {
      orderByClause[sortField] = sortOrder;
    }

    // Fetch movies from the database with filters, pagination, and sorting
    const movies = await prisma.movie.findMany({
      where: filterClause,
      skip,
      take,
      orderBy: orderByClause,
    });

    // Count total movies matching the filter
    const totalCount = await prisma.movie.count({ where: filterClause });

    return {
      movies,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error("Failed to fetch movies");
  }
};

export const updateMovie = async (
  id: number,
  data: Partial<{
    title: string;
    overview: string;
    genres: { id: number; name: string }[];
    releaseDate: Date;
    runtime: number;
    voteAverage: number;
  }>
) => {
  try {
    // Update the movie with the given id
    const updatedMovie = await prisma.movie.update({
      where: { id },
      data,
    });
    return updatedMovie;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw new Error("Failed to update movie");
  }
};
