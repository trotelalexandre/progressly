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
import { signIn } from "@/auth";

export default async function AuthForm({ signup }: { signup?: boolean }) {
  return (
    <Card className="mx-auto max-w-sm min-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {signup ? "Sign up" : "Login"}
        </CardTitle>
        <CardDescription>
          {signup
            ? "Create an account to get started and start measuring your progress"
            : "Enter your email and password to login to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="grid gap-4"
          >
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/reset-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="******"
              />
            </div>
            <Button type="submit" className="w-full">
              {signup ? "Sign up" : "Login"}
            </Button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("github", {
                callbackUrl: "/app",
              });
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              {signup ? "Sign up" : "Login"} with Github{" "}
              <GitHubLogoIcon className="w-6 h-6" />
            </Button>
          </form>
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={signup ? "/auth/signin" : "/auth/signup"}
            className="underline"
          >
            {signup ? "Login" : "Sign up"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
