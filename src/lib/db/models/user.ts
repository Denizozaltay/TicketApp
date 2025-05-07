import { UserInput } from "@/src/types/user";
import { prisma } from "../prisma";

export async function createUser(input: UserInput) {
  return prisma.user.create({
    data: input,
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function verifyUserEmail(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      emailVerifyToken: token,
      emailTokenExpiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return null;
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      emailVerifyToken: null,
      emailTokenExpiresAt: null,
    },
  });

  return updatedUser;
}


export async function verifyUserEmailPassReset(token: string) {
  const user = await prisma.user.findFirst({
    where: {
      passwordVerifyToken: token,
      passwordVerifyTokenExpiresAt: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return null;
  }

  return user;
}


export async function changeUserPassword(token: string, pass: string) {
  // find the user with token
  const user = await verifyUserEmailPassReset(token);

  if (!user) {
    throw new Error("Invalid token or user not found");
  }

  // update the password then invalidate the tokens
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      password: pass,
      passwordVerifyToken: null,
      passwordVerifyTokenExpiresAt: null
    }
  });

  if (!user) {
    throw new Error("Invalid token or user not found");
  }
  
  return updatedUser;
}



