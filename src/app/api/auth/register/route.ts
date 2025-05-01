import { UserInput } from "@/src/types/user";
import { createUser, getUserByEmail } from "@/src/lib/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "@/src/lib/mail/sendVerificationEmail";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password }: UserInput = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please provide username, email, and password." },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const emailVerifyToken = crypto.randomBytes(32).toString("hex");
    const emailTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60);

    const newUser = await createUser({
      email,
      password: hashedPassword,
      username,
      emailVerifyToken,
      emailTokenExpiresAt,
    });

    await sendVerificationEmail(newUser, emailVerifyToken);

    return NextResponse.json(
      {
        message: "User created successfully. Please verify your email.",
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
