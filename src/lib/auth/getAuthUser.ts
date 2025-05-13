import { cookies } from "next/headers";
import { verifyJwtToken } from "./jwt";
import { NextRequest } from "next/server";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  role: "user" | "admin";
};

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const user = await verifyJwtToken<AuthUser>(token);
  return user || null;
}

export async function getAuthUserFromRequest(
  req: NextRequest
): Promise<AuthUser | null> {
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value;

  if (!token) return null;

  const user = await verifyJwtToken<AuthUser>(token);
  return user || null;
}
