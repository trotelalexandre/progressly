import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { signInSchema } from "../schema/auth.schema";
import { ZodError } from "zod";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
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

          console.log("email", email);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user?.passwordHash) {
            const isValid = await bcrypt.compare(password, user.passwordHash);

            if (isValid) {
              return user;
            }
          }

          // register the user if not found
          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              passwordHash: await bcrypt.hash(password, 10),
            },
          });

          // TODO: send email verification

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
