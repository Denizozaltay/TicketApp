import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/src/lib/auth/getAuthUser";

export async function GET() {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized access." },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: "Profile fetched successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}
