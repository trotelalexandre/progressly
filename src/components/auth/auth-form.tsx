"use client";
import "client-only";

import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signInWithGoogle } from "../../../actions/auth.action";
import { features } from "../../../data/features";
import GoogleButton from "./google-button";

export default function AuthForm({ signup }: { signup?: boolean }) {
  return (
    <Card className="mx-auto max-w-sm min-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {signup ? "Sign up" : "Login"}
        </CardTitle>
        <CardDescription>
          {signup
            ? "Create an account to get started and start measuring your progress"
            : features.canSignInWithMagicLink
              ? "Enter your email and password to login to your account"
              : "Log in with Google to access your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {features.canSignInWithMagicLink && (
            <form className="grid gap-4">
              {signup && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {signup ? "Sign up" : "Login"}
              </Button>
            </form>
          )}

          {features.canSignInWithGithub && (
            <form>
              <Button variant="outline" className="w-full" type="submit">
                {signup ? "Sign up" : "Login"} with Github{" "}
                <GitHubLogoIcon className="w-6 h-6" />
              </Button>
            </form>
          )}

          {features.canSignInWithGoogle && (
            <form action={signInWithGoogle}>
              <GoogleButton signup={signup} />
            </form>
          )}
        </div>

        {features.canSignInWithMagicLink && (
          <div className="mt-4 text-center text-sm">
            {signup ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              href={signup ? "/auth/signin" : "/auth/signup"}
              className="underline"
            >
              {signup ? "Login" : "Sign up"}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
