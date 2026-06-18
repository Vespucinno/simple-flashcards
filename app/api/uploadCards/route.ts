import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
// Pindahkan mock database ke file eksternal agar tidak bentrok saat diimport di tempat lain
import { globalDatabaseMock } from "@/lib/db";

async function saveImage(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const fileExtension =
    path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const filename = `card-${uniqueSuffix}${fileExtension}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  // Membuat folder public/uploads jika belum ada
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const imageFile = formData.get("image") as File | null;

    // 1. Basic Data Validation
    if (!imageFile || typeof imageFile === "string") {
      return NextResponse.json(
        { error: "No image file uploaded." },
        { status: 400 },
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 },
      );
    }

    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      // Perbaikan Mime-Type Typo di sini
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(imageFile.type)) {
        return NextResponse.json(
          {
            error:
              "Invalid image format. Only JPEG, PNG, and WebP are allowed.",
          },
          { status: 400 },
        );
      }

      imageUrl = await saveImage(imageFile);
    }

    const newCard = {
      id: crypto.randomUUID(),
      image: imageUrl,
      title: title.toString(),
      description: description.toString(),
      createdAt: new Date().toISOString(),
    };

    globalDatabaseMock.push(newCard);

    console.log("Saving to DB:", newCard);

    return NextResponse.json(
      {
        message: "Card created successfully",
        card: newCard, // Mengembalikan objek card yang asli, bukan string teks biasa
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
