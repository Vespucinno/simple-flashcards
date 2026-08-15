"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navigation from "@/components/ui/Navbar";

interface Question {
  id: string;
  question: string;
  answer: string;
}

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string | null;
  questions: Question[];
}

export default function FlashDetail() {
  const params = useParams<{ flashcardsId: string }>();
  const flashcardsId = params.flashcardsId;
  const [card, setCard] = useState<CardData | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchCard() {
      try {
        const response = await fetch("/api/getCards", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const cards: CardData[] = await response.json();
        const selectedCard =
          cards.find((item) => item.id === flashcardsId) ?? null;
        setCard(selectedCard);
      } catch (error) {
        console.error("Error fetching flashcard data:", error);
        setCard(null);
      }
    }

    if (flashcardsId) {
      fetchCard();
    }
  }, [flashcardsId]);

  const toggleFlip = (questionId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (!card) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navigation />
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6">
          <p className="text-lg font-medium text-slate-600">
            Loading flashcards...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-900">
      <Navigation />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Flashcard deck
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              {card.title}
            </h1>
          </div>

          <Link
            href="/flashcards"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            ← Back to decks
          </Link>
        </div>

        <p className="mb-8 max-w-2xl text-base text-slate-600">
          {card.description}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {card.questions.map((question) => {
            const isFlipped = Boolean(flippedCards[question.id]);

            return (
              <button
                key={question.id}
                type="button"
                onClick={() => toggleFlip(question.id)}
                className="group relative h-[220px] w-full cursor-pointer text-left"
                aria-label={`Flip flashcard for ${question.question}`}
              >
                <div
                  className="relative h-full w-full transition-transform duration-600"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6 shadow-[0_18px_40px_-24px_rgba(6,78,59,0.7)]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                        Question
                      </span>
                      <span className="text-xs font-medium text-emerald-700">
                        Tap to flip
                      </span>
                    </div>

                    <div className="flex h-[120px] items-center">
                      <p className="text-xl font-bold leading-relaxed text-slate-800">
                        {question.question}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-[28px] border border-emerald-600 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white shadow-[0_18px_40px_-20px_rgba(13,148,136,0.9)]"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-50">
                        Answer
                      </span>
                      <span className="text-xs font-medium text-emerald-50">
                        Tap to flip
                      </span>
                    </div>

                    <div className="flex h-[120px] items-center">
                      <p className="text-xl font-bold leading-relaxed text-white">
                        {question.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
