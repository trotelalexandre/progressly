import { ENVS } from "./env";

export const redirectTo =
  ENVS.VERCEL_ENV === "production"
    ? "https://progressly-prod.vercel.app/auth/callback"
    : ENVS.VERCEL_ENV === "preview"
      ? "https://progressly-staging.vercel.app/auth/callback"
      : "http://localhost:3000/auth/callback";
