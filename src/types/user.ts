export interface UserInput {
  username: string;
  email: string;
  password: string;
  emailVerifyToken?: string | null;
  emailTokenExpiresAt?: Date | null;
  isVerified?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  isVerified: boolean;
  emailVerifyToken: string | null;
  emailTokenExpiresAt: Date | null;
}

export interface PublicUser {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}
