"use server";
import "server-only";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const redirectTo =
  process.env.NODE_ENV === "production"
    ? "https://progressly-prod.vercel.app/app"
    : "http://localhost:3000/app";

export const signInWithGoogle = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to sign in with Google");
  }

  revalidatePath("/", "layout");
};
