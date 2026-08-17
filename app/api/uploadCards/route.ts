import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import prisma from "@/lib/db";

type CardInput = {
  question?: unknown;
  answer?: unknown;
};

type ValidCard = {
  question: string;
  answer: string;
};

async function saveImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileExtension =
    path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const filename = `card-${uniqueSuffix}${fileExtension}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      title?: unknown;
      description?: unknown;
      question?: unknown;
      answer?: unknown;
      cards?: CardInput[];
      flashcards?: CardInput[];
    };

    const title = typeof body.title === "string" ? body.title : "";
    const description =
      typeof body.description === "string" ? body.description : "";

    const rawCards: CardInput[] = Array.isArray(body.cards)
      ? body.cards
      : Array.isArray(body.flashcards)
        ? body.flashcards
        : [];

    const cards: ValidCard[] = rawCards
      .map((card: CardInput) => ({
        question:
          typeof card?.question === "string" ? card.question.trim() : "",
        answer: typeof card?.answer === "string" ? card.answer.trim() : "",
      }))
      .filter((card: ValidCard) => card.question && card.answer);

    if (typeof body.question === "string" || typeof body.answer === "string") {
      cards.push({
        question: typeof body.question === "string" ? body.question.trim() : "",
        answer: typeof body.answer === "string" ? body.answer.trim() : "",
      });
    }

    const validCards = cards.filter((card: ValidCard): card is ValidCard =>
      Boolean(card.question && card.answer),
    );

    if (!title.trim() || !description.trim() || validCards.length === 0) {
      return NextResponse.json(
        {
          error:
            "Title, description, and at least one valid question-answer pair are required",
        },
        { status: 400 },
      );
    }

    const newCard = await prisma.card.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        questions: {
          createMany: {
            data: validCards.map((card) => ({
              question: card.question,
              answer: card.answer,
            })),
          },
        },
      },
      include: {
        questions: true,
      },
    });

    console.log("Saving to DB:", newCard);

    return NextResponse.json(
      {
        message: "Card created successfully",
        card: newCard,
      },
      { status: 201 },
    );
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
