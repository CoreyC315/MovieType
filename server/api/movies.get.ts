import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// This is the server-side code that runs when you call /api/movies
export default defineEventHandler(async (event) => {
  
  // Use Prisma to find all movies in the table
  const movies = await prisma.movie.findMany({
    orderBy: {
      code: 'asc', // Order them by code
    },
  });

  return movies;
});