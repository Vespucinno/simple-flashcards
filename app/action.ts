"use server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export async function checkPassword(
  usernameInput: string,
  passwordInput: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: usernameInput,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const isPasswordValid = await bcrypt.compare(passwordInput, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "Password incorrect" };
    }
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Database Error: ", error);
    return { success: false, message: "Something wrong with the server" };
  }
}
