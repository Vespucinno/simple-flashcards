import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ output: "export", // Mengaktifkan static exports (menghasilkan folder 'out')
  images: {
    unoptimized: true, // GitHub Pages tidak mendukung fitur optimasi gambar bawaan Next.js
  },
  // HANYA JIKA url GitHub Pages Anda berbentuk: username.github.io/nama-repositori
  basePath: "/simple-flashcards",
};

export default nextConfig;
