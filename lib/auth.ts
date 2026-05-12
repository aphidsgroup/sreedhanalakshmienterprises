// Re-export authOptions for use in server components and API routes
// Uses next-auth v4 getServerSession pattern
export { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth/next";
import { authOptions as opts } from "@/app/api/auth/[...nextauth]/route";

export async function auth() {
  return getServerSession(opts);
}
