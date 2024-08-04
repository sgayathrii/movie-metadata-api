-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "genres" JSONB NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "runtime" DOUBLE PRECISION NOT NULL,
    "voteAverage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
