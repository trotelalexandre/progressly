"use server";
import "server-only";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const signInWithGoogle = async () => {
  const supabase = await createClient();

  const PROGRESSLY_ENV = process.env.PROGRESSLY_ENV;

  const redirectTo =
    PROGRESSLY_ENV === "PRODUCTION"
      ? "https://progressly-prod.vercel.app/auth/callback"
      : PROGRESSLY_ENV === "PREVIEW"
        ? "https://progressly-staging.vercel.app/auth/callback"
        : "http://localhost:3000/auth/callback";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to sign in with Google");
  }

  if (data.url) {
    redirect(data.url);
  }
};

export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error("Failed to sign out");
  }

  redirect("/");
};
