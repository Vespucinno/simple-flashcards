import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (await prisma.user.findUnique({ where: { email } })) {
      console.log(
        "User: " +
          username +
          " " +
          "Email: " +
          email +
          " has already registered",
      );

      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log("New user registered:", newUser);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
