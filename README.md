# Movie API

## Overview

The Movie API is a RESTful API built with Express and TypeScript, utilizing Prisma for ORM and PostgreSQL as the database. This API allows users to interact with movie data, including listing movies with pagination and filters, and updating movie information.

## Table of Contents

- [Movie API](#movie-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [API Documentation](#api-documentation)
    - [List Movies](#list-movies)
    - [Update Movie](#update-movie)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sgayathrii/movie-metadata-api.git

2. **Navigate to the project directory:**

    cd movie-api

3.  **Install dependencies:**
    
    npm install

## Configuration

1. **Create a .env file in the root directory of the project:**
   
    DATABASE_URL=postgresql://username:password@localhost:5432/your-database
    PORT=8000

    Replace username, password, localhost, 5432, and your-database with your PostgreSQL database credentials.

2. **Setup Prisma:**
   
   Initialize Prisma and run migrations:

   npx prisma format
   npx prisma generate
   npx prisma migrate dev
   
3. **Populate data from seed.ts**
   npm run seed

## API Documentation

### List Movies

- **Endpoint:** `GET /api/movies`

- **Description:** Fetch a list of movies with optional filters, sorting, and pagination.

- **Query Parameters:**

  - `page` (number): The page number for pagination. Default is `1`.

  - `pageSize` (number): The number of movies per page. Default is `10`.

  - `title` (string): Filter movies by title (case-insensitive). If provided, the API will return movies with titles that contain this string.

  - `genreId` (number): Filter movies by genre ID. If provided, the API will return movies that contain this genre ID in their genres array.

  - `sortBy` (string): Sort by field. Can be `"title"` or `"releaseDate"`. Default is `"title"`.

  - `sortOrder` (string): Sort order. Can be `"asc"` (ascending) or `"desc"` (descending). Default is `"asc"`.

- **Example Request:**

  ```http
  GET /api/movies?page=1&pageSize=5&title=A Man Apart&genreId=28&sortBy=releaseDate&sortOrder=desc

### Update Movie

- **Endpoint:** `PUT /api/movies/:id`

- **Description:** Update a specific movie by its ID.

- **URL Parameters:**

  - `id` (number): The ID of the movie you want to update.

- **Request Body:**

  The request body should be a JSON object containing any of the following fields you wish to update:

  - `title` (string): The new title of the movie.
  - `overview` (string): The new overview of the movie.
  - `genres` (array of objects): The new list of genres. Each genre should be an object with `id` and `name` fields.
  - `releaseDate` (string, ISO 8601 format): The new release date of the movie.
  - `runtime` (number): The new runtime of the movie in minutes.
  - `voteAverage` (number): The new average vote rating of the movie.

  **Example Request Body:**

  ```json
  {
    "title": "New Movie Title",
    "overview": "Updated overview of the movie.",
    "genres": [
      { "id": 14, "name": "Fantasy" },
      { "id": 18, "name": "Drama" }
    ],
    "releaseDate": "2024-01-01T00:00:00.000Z",
    "runtime": 150,
    "voteAverage": 9.0
  }

- **Example Request:**
  
  ```http
  PUT /api/movies/3426 (`3426` is an example of an auto-incremented ID generated when data was populated into the database.)

## Testing

### Unit Tests

To run the unit tests, use the following command:

```bash
npm test
