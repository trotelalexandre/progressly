"use server";
import "server-only";

import { signIn } from "@/auth";

export const signInWithCredentials = async (formData: FormData) => {
  await signIn("credentials", formData, {
    redirectTo: "/app",
  });
};

export const signInWithGithub = async () => {
  await signIn("github", {
    redirectTo: "/app",
  });
};

export const signInWithGoogle = async () => {
  await signIn("google", {
    redirectTo: "/app",
  });
};

export const signInWithMagicLink = async (formData: FormData) => {
  await signIn("resend", formData, {
    redirectTo: "/app",
  });
};
