"use client";
import Link from "next/link";
import { Menu } from "lucide-react"; // Siapa tahu nanti butuh untuk custom trigger
import { Sidebar } from "./Sidebar";

const Navigation = () => {
  return (
    // Menggunakan backdrop-blur agar menyatu secara seamless saat di-scroll
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent transition-opacity hover:opacity-90"
        >
          <span>⚡</span> FlashCards
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-3">
          {/* Tombol Aksi Sekunder - Lebih bersih tanpa border tebal */}
          <Link
            href="/create"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-xl transition-colors"
          >
            + Add Flashcards
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>

          {/* Tombol CTA Utama - Modern, solid, dengan transisi halus */}
          <Link
            href="/register"
            className="text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
