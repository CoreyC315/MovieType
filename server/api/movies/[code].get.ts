import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get the 'code' from the URL (e.g., "XYZ123")
  const code = event.context.params?.code;

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Movie code is required",
    });
  }

  try {
    // Find the single movie in the database that matches the code
    const movie = await prisma.movie.findUnique({
      where: {
        code: code,
      },
    });

    if (!movie) {
      throw createError({
        statusCode: 404,
        statusMessage: "Movie not found",
      });
    }

    // Return the found movie
    return movie;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching movie",
    });
  }
});
