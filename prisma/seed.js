import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME;

  if (!email || !password || !name) {
    throw new Error(
      "Admin environment variables are missing"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    12
  );

  await prisma.admin.upsert({
    where: {
      email: email.toLowerCase(),
    },

    update: {},

    create: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  console.log("Admin initialized");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });