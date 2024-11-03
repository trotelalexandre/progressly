"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSignIn = () => {
    signIn("github");
  };

  return (
    <button type="submit" onClick={handleSignIn}>
      Signin with GitHub
    </button>
  );
}
