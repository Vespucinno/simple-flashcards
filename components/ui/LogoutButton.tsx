"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

type LogoutButtonProps = {
  onLoggedOut?: () => void;
  className?: string;
};

export function LogoutButton({ onLoggedOut, className }: LogoutButtonProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      onLoggedOut?.();
      router.refresh();
      router.push("/");
    }
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      <FiLogOut className="w-5 h-5" />
      <span>Sign Out</span>
    </button>
  );
}
