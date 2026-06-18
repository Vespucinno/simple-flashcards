import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
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
      <main className=" max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="bg text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
          Master any subject, <br />
          <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            twice as fast.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ditch the boring stacks. Learn seamlessly with fluid 3D flashcards and
          scientifically proven spaced repetition.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-green-500 rounded-xl hover:bg-green-600 transition transform hover:-translate-y-0.5 shadow-lg gap-2 group"
        >
          Start Studying Free
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </main>

      {/* 3. FEATURES GRID */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-2xl mb-4">✨</div>
            <h3 className="font-semibold text-lg mb-2">
              Fluid 3D Interactivity
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Beautifully smooth card animations that make studying feel like a
              game.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-2xl mb-4">🧠</div>
            <h3 className="font-semibold text-lg mb-2">
              Smart Spaced Repetition
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our algorithm tracks your memory decay and targets your weak spots
              automatically.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-2xl mb-4">⌨️</div>
            <h3 className="font-semibold text-lg mb-2">Power User Shortcuts</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Fly through decks using lightning-fast keyboard controls. No mouse
              required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
