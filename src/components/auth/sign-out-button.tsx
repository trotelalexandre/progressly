"use client";
import "client-only";

import { signOut } from "next-auth/react";

export default function SignOutButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
