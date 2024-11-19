import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signInSchema } from "../schema/auth.schema";
import { ZodError } from "zod";
import Resend from "next-auth/providers/resend";
import { users } from "./db/schema/auth";
import { eq } from "drizzle-orm";

export const authOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    Resend,
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "John Doe" },
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { name, email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (user?.password_hash) {
            const isValid = await bcrypt.compare(password, user.password_hash);

            if (isValid) {
              return user;
            } else {
              throw new Error("Invalid credentials");
            }
          }

          // register the user if not found
          const result = await db
            .insert(users)
            .values({
              name,
              email,
              password_hash: await bcrypt.hash(password, 10),
            })
            .returning();

          // TODO: send email verification

          const newUser = result[0];
          return newUser;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error(error.errors[0].message);
          }
          console.error(error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
