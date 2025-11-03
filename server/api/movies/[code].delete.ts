import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // 1. Get the code from the params.
  // The '?' handles if 'params' is undefined.
  const code = event.context.params?.code;

  // 2. Add a check to make sure code exists
  if (!code) {
    // Throw an error if no code is provided in the URL
    throw createError({
      statusCode: 400, // Bad Request
      statusMessage: "Movie code is required",
    });
  }

  // 3. Use 'where' to tell Prisma WHICH movie to delete
  const deletedMovie = await prisma.movie.delete({
    where: {
      code: code,
    },
  });

  return deletedMovie;
});
