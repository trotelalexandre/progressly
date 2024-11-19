"use server";
import "server-only";

import { supabaseServer } from "@/lib/supabase";

const redirectTo =
  process.env.NODE_ENV === "production"
    ? "https://progressly-prod.vercel.app/app"
    : "http://localhost:3000/app";

export const signInWithGoogle = async () => {
  const { error } = await supabaseServer.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to sign in with Google");
  }
};
