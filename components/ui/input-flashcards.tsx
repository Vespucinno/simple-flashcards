"use client";

import { Button } from "./button";
import { Textarea } from "./textarea";
import { useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function InputFlashcards() {
  const router = useRouter();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: 1, question: "", answer: "" },
  ]);
  const nextId = useRef(2);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async () => {
    const sanitizedCards = flashcards
      .map((card) => ({
        question: card.question.trim(),
        answer: card.answer.trim(),
      }))
      .filter((card) => card.question && card.answer);

    if (!title.trim() || !description.trim()) {
      window.alert("Please fill in title and description.");
      return;
    }

    if (sanitizedCards.length === 0) {
      window.alert("Please add at least one question and answer pair.");
      return;
    }

    try {
      const response = await fetch("/api/uploadCards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          cards: sanitizedCards,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create card");
      }

      console.log("Card created successfully:", result);

      setTitle("");
      setDescription("");
      setFlashcards([{ id: nextId.current++, question: "", answer: "" }]);
      router.push("/flashcards");
    } catch (error) {
      console.error("Error creating flashcard:", error);
      window.alert(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  const updateCard = (
    id: number,
    field: "question" | "answer",
    value: string,
  ) => {
    setFlashcards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, [field]: value } : card)),
    );
  };

  const duplicateCard = (id: number) => {
    setFlashcards((prev) => {
      const index = prev.findIndex((card) => card.id === id);
      if (index === -1) return prev;
      const copy = [...prev];
      copy.splice(index + 1, 0, {
        ...copy[index],
        id: nextId.current++,
      });
      return copy;
    });
  };

  const deleteCard = (id: number) => {
    setFlashcards((prev) => {
      if (prev.length === 1) {
        return [{ id: nextId.current++, question: "", answer: "" }];
      }
      return prev.filter((card) => card.id !== id);
    });
  };

  return (
    <div>
      <div className="mt-20">
        <Textarea
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title..."
          className="mt-5 ml-3 w-180 max-md:w-80 h-15 bg-emerald-100 border-emerald-200/60 text-emerald-950"
        />
        <Textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          className="mt-5 ml-3 w-180 max-md:w-80 h-50 bg-emerald-100 border-emerald-200/60 text-emerald-950"
        />
      </div>
      {flashcards.map((card, index) => (
        <div key={card.id}>
          <div className="flex flex-col mt-20">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mt-10 ml-3">
              # {index + 1}
            </h2>
            <Textarea
              required
              value={card.question}
              onChange={(e) => updateCard(card.id, "question", e.target.value)}
              placeholder="Write your question here"
              className="mt-5 ml-3 w-180 max-md:w-80 h-15 bg-emerald-100 border-emerald-200/60 text-emerald-950"
            />

            <Textarea
              required
              value={card.answer}
              onChange={(e) => updateCard(card.id, "answer", e.target.value)}
              placeholder="Write your answer here"
              className="mt-5 ml-3 w-180 max-md:w-80 h-40 bg-emerald-100 border-emerald-200/60 text-emerald-950"
            />
          </div>

          <div className="flex justify-start gap-2 md:gap-3 mt-5 w-180 max-md:w-80 ml-5">
            <Button
              variant="default"
              className="w-20 sm:w-24 md:w-28 h-8 sm:h-9 md:h-10 text-xs sm:text-sm bg-red-500 text-white hover:bg-red-600"
              onClick={() => deleteCard(card.id)}
            >
              Delete
            </Button>
            <Button
              variant="default"
              className="w-20 sm:w-24 md:w-28 h-8 sm:h-9 md:h-10 text-xs sm:text-sm bg-green-500 text-white hover:bg-green-600"
              onClick={() => duplicateCard(card.id)}
            >
              More
            </Button>

            <div className="mt-15"></div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onSubmit}
        className="sticky float-right mr-5 mb-5 flex items-center justify-center bg-green-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-green-600 transition"
        aria-label="Create flashcard"
      >
        <FiCheck className="text-3xl" />
      </button>
    </div>
  );
}
