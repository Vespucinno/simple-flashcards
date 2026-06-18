import { globalDatabaseMock } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  try {
    return NextResponse.json(globalDatabaseMock);
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
