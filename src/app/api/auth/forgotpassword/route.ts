import { UserInput } from "@/src/types/user";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendForgotPassEmail } from "@/src/lib/mail/sendForgotPassEmail";
import { prisma } from "@/src/lib/db/prisma";
import { getUserByEmail } from "@/src/lib/db/models/user";

export async function POST(req: NextRequest) {
  try {
    const { email }: UserInput = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Please provide email." },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "No user found with this email." },
        { status: 404 }
      );
    }

    const passwordVerifyToken = crypto.randomBytes(32).toString("hex");
    const passwordVerifyTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60);

    // go to DB and add the tokens to email associated with user
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        passwordVerifyToken: passwordVerifyToken,
        passwordVerifyTokenExpiresAt: passwordVerifyTokenExpiresAt,
      },
    });

    // send the email to user with url and token
    await sendForgotPassEmail(email, passwordVerifyToken);

    return NextResponse.json(
      {
        message: "Email to reset password, respond to that",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[PASSRESET_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
