import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cards = await prisma.card.findMany({
      include: {
        questions: true,
      },
    });
    return NextResponse.json(cards);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
