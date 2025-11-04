import { event } from "@primeuix/themes/aura/timeline";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //1. Get the [code] from the URL
  const code = event.context.params?.code;

  //2. Get the new movie data from the request
  const body = await readBody(event);

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Movie code is required!",
    });
  }

  //3. Use 'prisma.movie.update'
  const updateMovie = await prisma.movie.update({
    where: {
      code: code,
    },
    data: {
      name: body.name,
      genre: body.genre,
      year: parseInt(body.year),
      //don't update the code so it stays unique
    },
  });

  return updateMovie;
});
