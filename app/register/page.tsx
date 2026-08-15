"use client";
import Link from "next/link";
import { RegisterForm } from "@/components/ui/register-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-800 bg-clip-text text-transparent"
          >
            ⚡ FlashCards
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/assets/student-studying.jpg"
          width={800}
          height={600}
          loading="eager"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
