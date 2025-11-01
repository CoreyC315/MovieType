import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //1. Read the data from the request body
  //readbody is what parses the JSON from frontend
  const body = await readBody(event);

  //2. make sure that the varibles are correct before
  //being sent to the DB
  const data = {
    name: body.name,
    genre: body.genre,
    code: body.code,
    year: parseInt(body.year),
  };

  //3. Make the entry to the DB
  const newMovie = await prisma.movie.create({
    data: data,
  });

  //4. return the movie that was just made
  return newMovie;
});
