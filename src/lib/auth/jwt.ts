import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

const encoder = new TextEncoder();
const secretKey = encoder.encode(JWT_SECRET);

export async function signJwtToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyJwtToken<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as T;
  } catch (err) {
    return null;
  }
}
