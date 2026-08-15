"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = false; // TEMPORARY FOR TESTING NAVBAR AUTH[cite: 2]

  const toggleButton = () => {
    setOpen(!open);
  };

  // Mengunci scroll layar utama ketika menu mobile sedang terbuka
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const links = [
    {
      id: 1,
      title: "+ Add Flashcards",
      href: "/",
    },
  ];

  return (
    <div className="flex md:hidden">
      {/* TOMBOL HAMBURGER / X */}
      <button
        onClick={toggleButton}
        className="relative z-50 p-2 text-slate-700 hover:text-slate-900 transition-colors focus:outline-none"
        aria-label="Toggle Menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* MENU NAVIGASI OVERLAY (Full Screen Mobile) */}
      <div
        className={`fixed inset-0 top-16 z-40 w-full bg-white/95 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 p-6 border-t border-slate-100 bg-white">
          {/* Navigasi Links */}
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-slate-600 hover:text-emerald-600 py-2 rounded-xl transition-colors"
            >
              {link.title}
            </Link>
          ))}

          {/* Garis Pembatas internal untuk memisahkan menu biasa & Auth */}
          {!isLoggedIn && <div className="h-px bg-slate-100 my-1" />}

          {/* Menu Autentikasi */}
          {!isLoggedIn && (
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/login"
                className="text-base font-medium text-center text-slate-600 hover:text-slate-900 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-base font-medium text-center bg-slate-900 text-white hover:bg-slate-800 py-3 rounded-xl shadow-sm transition-all active:scale-98"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
