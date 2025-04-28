export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
}

export interface PublicUser {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}
