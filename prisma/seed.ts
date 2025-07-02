import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();
async function main() {
  const dragostin = await client?.user.upsert({
    where: {
      email: "drago@test.com",
      nickname: "dragostin",
      password: bcrypt.hashSync("qweqweqwe", 10),
    },
    update: {},
    create: {
      email: "test@test.com",
      nickname: "dragostin",
      password: bcrypt.hashSync("qweqweqwe", 10),
    },
  });

  const meli = await client?.user.upsert({
    where: {
      email: "meli@meli.com",
      nickname: "meli",
      password: bcrypt.hashSync("qweqweqwe", 10),
    },
    update: {},
    create: {
      email: "meli@meli.com",
      nickname: "meli",
      password: bcrypt.hashSync("qweqweqwe", 10),
    },
  });

  const generalServer = await client?.server.upsert({
    where: {
      id: "general-server-id", // Use a unique identifier
      name: "General",
      imageUrl: "https://files.edgestore.dev/gvjup3a0sy7esas3/publicImages/_public/fbfeb46c-ef03-406f-8c4c-5a2af025f362.jpg",
      thumbnailUrl: "https://files.edgestore.dev/gvjup3a0sy7esas3/publicImages/_public/fbfeb46c-ef03-406f-8c4c-5a2af025f362.jpg",
    },
    update: {},
    create: {
      id: "general-server-id", // Ensure the same unique identifier is used here
      name: "General",
      imageUrl: "https://files.edgestore.dev/gvjup3a0sy7esas3/publicImages/_public/fbfeb46c-ef03-406f-8c4c-5a2af025f362.jpg",
      thumbnailUrl: "https://files.edgestore.dev/gvjup3a0sy7esas3/publicImages/_public/fbfeb46c-ef03-406f-8c4c-5a2af025f362.jpg",
      user: {
        connect: {
          id: dragostin.id,
        },
      },
    },
  });
}

main()
  .then(async () => {
    console.log("seeded");
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });
