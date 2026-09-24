"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loadError, setLoadError] = useState(false);

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
        setLoadError(!selectedCard);
      } catch (error) {
        console.error("Error fetching flashcard data:", error);
        setCard(null);
        setLoadError(true);
      }
    }

    if (flashcardsId) {
      fetchCard();
    }
  }, [flashcardsId]);

  const questions = card?.questions ?? [];
  const current = questions[index];
  const total = questions.length;

  const goTo = useCallback(
    (direction: -1 | 1) => {
      if (total === 0) return;
      setIndex((prev) => (prev + direction + total) % total);
      setFlipped(false);
    },
    [total],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
      } else if (event.key === " " || event.key === "Enter") {
        const tag = (event.target as HTMLElement | null)?.tagName;
        if (tag === "BUTTON" || tag === "A" || tag === "INPUT") return;
        event.preventDefault();
        setFlipped((prev) => !prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  if (!card && !loadError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-6">
          <p className="text-lg font-medium text-slate-600">
            Loading flashcards...
          </p>
        </div>
      </main>
    );
  }

  if (!card) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-medium text-slate-600">
            Flashcard deck not found.
          </p>
          <Link
            href="/flashcards"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            ← Back to decks
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 w-full max-w-3xl text-center sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 sm:text-sm">
            Flashcard deck
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {card.title}
          </h1>
          {card.description ? (
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-600 sm:text-lg">
              {card.description}
            </p>
          ) : null}
        </header>

        {total === 0 || !current ? (
          <p className="text-center text-slate-500">
            This deck does not have any cards yet.
          </p>
        ) : (
          <>
            <div className="flex w-full items-center justify-center gap-2 sm:gap-4 md:gap-8">
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Previous card"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 sm:h-12 sm:w-12 md:h-14 md:w-14"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>

              <button
                type="button"
                onClick={() => setFlipped((prev) => !prev)}
                className="group relative h-[260px] w-full max-w-xl cursor-pointer text-left sm:h-[320px] md:h-[400px] md:max-w-3xl"
                aria-label={`Flip flashcard. ${flipped ? "Answer" : "Question"}: ${flipped ? current.answer : current.question}`}
                style={{ perspective: "1400px" }}
              >
                <div
                  className="relative h-full w-full transition-transform duration-600"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute inset-0 flex flex-col rounded-[24px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-[0_18px_40px_-24px_rgba(6,78,59,0.7)] sm:rounded-[28px] sm:p-8"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                        Question
                      </span>
                      <span className="text-xs font-medium text-emerald-700">
                        Tap to flip
                      </span>
                    </div>
                    <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto">
                      <p className="text-center text-xl font-bold leading-relaxed text-slate-800 sm:text-2xl md:text-3xl">
                        {current.question}
                      </p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 flex flex-col rounded-[24px] border border-emerald-600 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-5 text-white shadow-[0_18px_40px_-20px_rgba(13,148,136,0.9)] sm:rounded-[28px] sm:p-8"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <div className="mb-4 flex items-center justify-between sm:mb-6">
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-50">
                        Answer
                      </span>
                      <span className="text-xs font-medium text-emerald-50">
                        Tap to flip
                      </span>
                    </div>
                    <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto">
                      <p className="text-center text-xl font-bold leading-relaxed text-white sm:text-2xl md:text-3xl">
                        {current.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="Next card"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 sm:h-12 sm:w-12 md:h-14 md:w-14"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>

            <p className="mt-6 text-sm font-medium tracking-wide text-slate-500 sm:text-base">
              {index + 1} / {total}
            </p>
          </>
        )}

        <Link
          href="/flashcards"
          className="mt-8 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          ← Back to decks
        </Link>
      </div>
    </main>
  );
}
