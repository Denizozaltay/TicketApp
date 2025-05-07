import { changeUserPassword } from "@/src/lib/db/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // salt and hash the new password 
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await changeUserPassword(token, hashedPassword);

  return NextResponse.json({ success: true });
}
