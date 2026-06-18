"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { flashcards } from "@/data/flashcards";
import { globalDatabaseMock } from "@/lib/db";

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function Dashboard() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      try {
        const res = await fetch("/api/getCards");
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setCards(json.data || json);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="text-xl text-slate-600 animate-pulse">Loading cards...</p>
      </div>
    );
  }

  return (
    <div>
      {/* 1. NAVIGATION BAR */}
      <nav className="flex items-center bg-white justify-between px-6 py-4 max-w-7xl mx-auto border-b border-slate-200">
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent">
          ⚡ FlashCards
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-green-800 font-medium hover:text-green-900 transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-full hover:bg-green-900 transition shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <div className="px-6 pt-20 pb-16 text-center bg-slate-50">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Dashboard
        </h1>
        <p className="text-2xl text-center text-slate-900">
          Choose the topic you want to practice
        </p>

        <button>
          <Link
            href="/"
            className="mt-5 inline-flex items-center justify-center px-5 py-2 text-base font-medium text-white bg-red-700 rounded-xl hover:bg-red-800 transition transform hover:-translate-y-0.5 shadow-lg gap-2 group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              ←
            </span>
            Back
          </Link>
        </button>
      </div>

      {/* 3. FLASHCARDS LIST (Menggunakan Map agar otomatis) */}
      <div className="flex flex-row flex-wrap gap-8 p-8 justify-center">
        {cards.length === 0 ? (
          <p className="text-slate-500">Belum ada flashcard yang tersedia.</p>
        ) : (
          cards.map((card) => (
            <Card
              key={card.id}
              className="w-[250px] bg-slate-100 overflow-hidden"
            >
              <CardHeader className="p-0">
                {card.image && (
                  <div className="relative w-full h-[150px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="250px"
                    />
                  </div>
                )}
                <div className="p-4">
                  <CardTitle className="text-center font-bold text-2xl mb-2">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-center min-h-[40px]">
                    {card.description}
                  </CardDescription>

                  <Link
                    href={`/dashboard/${card.id}`}
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition shadow-sm mt-4"
                  >
                    Start Learning!
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
