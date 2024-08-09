import prisma from "../prisma"
import { Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface MovieData {
  title: string;
  overview: string;
  genres: string; 
  release_date: string;
  runtime: string;
  vote_average: string;
}

const seedDatabase = async () => {
  // Delete existing movies to avoid duplication
  await prisma.movie.deleteMany(); 

  const movies: Prisma.MovieCreateManyInput[] = [];

  fs.createReadStream(path.resolve(__dirname, '../movies.csv'))
    .pipe(csv({ separator: ',' })) 
    .on('data', (row: MovieData) => {
      try {

         // Handle empty or missing fields and convert genres from string to JSON
        const title = row.title || 'Unknown Title';
        const overview = row.overview || 'No overview provided';
        const genres = row.genres ? JSON.parse(row.genres.replace(/'/g, '"')) as Prisma.JsonArray : [];
        const releaseDate = row.release_date ? new Date(row.release_date).toISOString() : new Date().toISOString();
        const runtime = parseFloat(row.runtime) || 0;
        const voteAverage = parseFloat(row.vote_average) || 0;


        // Construct movie object
        const movie = {
            title,
            overview,
            genres,
            releaseDate,
            runtime,
            voteAverage,
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
          // Seed the database with parsed movie data
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
          // Disconnect Prisma client
        await prisma.$disconnect(); 
      }
    });
};

seedDatabase();