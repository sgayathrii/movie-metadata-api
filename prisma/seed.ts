import prisma from "../prisma";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { Prisma } from "@prisma/client";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  title: string;
  overview: string;
  genres: Genre[];
  releaseDate: string;
  runtime: number;
  voteAverage: number;
}

const seedDatabase = async () => {
  await prisma.movie.deleteMany();

  const movies: (Omit<Movie, 'genres'> & { genres: Prisma.JsonArray })[] = [];

  fs.createReadStream(path.resolve(__dirname, '../movies.csv'))
    .pipe(csv({ separator: ',' }))
    .on('data', (row) => {
      try {
        // Ensure all required fields are present
        if (!row.title || !row.overview || !row.genres || !row.release_date || !row.runtime || !row.vote_average) {
          throw new Error('Missing required field');
        }

        // Parse and format the row data
        const movie = {
          title: row.title,
          overview: row.overview,
          genres: JSON.parse(row.genres.replace(/'/g, '"')) as Prisma.JsonArray,
          releaseDate: new Date(row.release_date).toISOString(),
          runtime: parseFloat(row.runtime),
          voteAverage: parseFloat(row.vote_average),
        };

        // Ensure parsed values are valid
        if (isNaN(movie.runtime) || isNaN(movie.voteAverage)) {
          throw new Error('Invalid number format');
        }

        movies.push(movie);
      } catch (error) {
        console.error('Error processing row:', error, row);
      }
    })
    .on('end', async () => {
      try {
        if (movies.length > 0) {
          await prisma.movie.createMany({
            data: movies,
          });
          console.log('Database seeded successfully');
        } else {
          console.log('No valid data to seed');
        }
      } catch (error) {
        console.error('Error seeding database', error);
      } finally {
        await prisma.$disconnect();
      }
    });
};

seedDatabase();