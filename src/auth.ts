import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (credentials?.password && user?.passwordHash) {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.passwordHash
          );

          if (isValid) {
            return user;
          }
        }

        // register the user if not found
        const newUser = await prisma.user.create({
          data: {
            email: credentials?.email,
            passwordHash: await bcrypt.hash(credentials?.password, 10),
          },
        });

        return newUser;
      },
    }),
  ],
};

export default NextAuth(authOptions);
