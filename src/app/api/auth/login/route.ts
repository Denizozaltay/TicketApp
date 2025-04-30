import { getUserByEmail } from "@/src/lib/db/models/user";
import { LoginInput, PublicUser } from "@/src/types/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJwtToken } from "@/src/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password }: LoginInput = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const publicUser: PublicUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as "user" | "admin",
      createdAt: user.createdAt,
    };

    const token = signJwtToken({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      {
        message: "Login successful.",
        user: publicUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
