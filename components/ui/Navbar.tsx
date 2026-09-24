import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { getAuthUser } from "@/lib/auth";
import { LogoutButton } from "./LogoutButton";
import { Sidebar } from "./Sidebar";

export default async function Navbar() {
  const user = await getAuthUser();
  const isLoggedIn = user !== null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-green-700 bg-clip-text text-transparent transition-opacity hover:opacity-90"
        >
          <span>⚡</span> FlashCards
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/create"
            className="text-sm font-medium text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-xl transition-colors"
          >
            + Add Flashcards
          </Link>

          {isLoggedIn ? (
            <>
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 px-3 py-2">
                <FiUser className="w-4 h-4 text-emerald-600" />
                {user.username || "Profile"}
              </span>
              <LogoutButton className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 px-4 py-2 rounded-xl transition-colors" />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sidebar isLoggedIn={isLoggedIn} user={user} />
        </div>
      </div>
    </nav>
  );
}
