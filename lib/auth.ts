import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import type { AuthUser } from "@/lib/auth-types";

export type { AuthUser };

export async function getAuthUser(): Promise<AuthUser | null> {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, secret);
    if (typeof decoded === "string") return null;

    const { id, email, username } = decoded as jwt.JwtPayload & {
      id?: unknown;
      email?: unknown;
      username?: unknown;
    };

    if (id == null) return null;

    return {
      id: String(id),
      email: typeof email === "string" ? email : "",
      username: typeof username === "string" ? username : "",
    };
  } catch {
    return null;
  }
}
