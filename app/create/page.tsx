"use client";

import InputFlashcards from "@/components/ui/input-flashcards";
export default function CreatePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white float-left ">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mt-10 text-center">
        Create
      </h1>
      <InputFlashcards />
    </div>
  );
}
