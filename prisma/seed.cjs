const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');
  
  // We use 'upsert' to avoid creating duplicates if you run it again
  // It will 'update' or 'insert' based on the unique 'code' field.
  const moviesData = [
    { code: "001", name: "The Shawshank Redemption", genre: "Drama", year: 1994 },
    { code: "002", name: "The Godfather", genre: "Crime, Drama", year: 1972 },
    { code: "003", name: "The Dark Knight", genre: "Action, Crime, Drama", year: 2008 },
    { code: "004", name: "Pulp Fiction", genre: "Crime, Drama", year: 1994 },
    { code: "005", name: "Inception", genre: "Sci-Fi, Action", year: 2010 }
  ];

  for (const m of moviesData) {
    await prisma.movie.upsert({
      where: { code: m.code },
      update: {},
      create: m,
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });