import type { NextAuthConfig } from "next-auth";

// Needed for module augmentation
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
    };
  }
}
