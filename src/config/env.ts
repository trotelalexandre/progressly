import dotenv from "dotenv";

dotenv.config();

const VERCEL_ENV = process.env.VERCEL_ENV;

export const ENVS = {
  VERCEL_ENV,
};
