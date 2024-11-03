"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";

interface ClientSessionProviderProps {
  children: React.ReactNode;
}

const ClientSessionProvider: React.FC<ClientSessionProviderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientSessionProvider;
