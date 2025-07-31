import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession, getSession } = createAuthClient({
  baseURL: "http://localhost:3000",
});
