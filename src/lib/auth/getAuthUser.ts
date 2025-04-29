import { cookies } from "next/headers";
import { verifyJwtToken } from "./jwt";

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

  const user = verifyJwtToken<AuthUser>(token);
  return user || null;
}
