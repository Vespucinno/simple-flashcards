"use client";
import { useState, useEffect } from "react";

interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  cardId: string;
}

interface Card {
  id: string;
  title: string;
  description: string;
  image: string | null;
  createdAt: string;
  questions: QuestionAnswer[];
}

export default function Box() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [flippedQuestions, setFlippedQuestions] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getCards");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: Card[] = await response.json();
        setCards(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleFlip = (questionId: string) => {
    setFlippedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  if (loading) return <div className="text-center p-6">Loading cards...</div>;
  if (error)
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;

  return <div></div>;
}
