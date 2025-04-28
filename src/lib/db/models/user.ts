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
