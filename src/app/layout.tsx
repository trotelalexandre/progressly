import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Progressly",
  description: "A progress tracker for your goals",
  applicationName: "Progressly",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Progressly",
  },
  keywords: ["progress", "tracker", "goals"],
  authors: [{ name: "Alexandre Trotel" }],
  creator: "Alexandre Trotel",
  publisher: "Alexandre Trotel",
  manifest: "/manifest.json",
  twitter: {
    card: "summary",
    title: "Progressly",
    description: "A progress tracker for your goals",
    creator: "@trotelalexandre",
  },
  openGraph: {
    type: "website",
    title: "Progressly",
    description: "A progress tracker for your goals",
    siteName: "Progressly",
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="221.2 83.2% 53.3%" />
          {children}

          <Toaster />
          <Sonner />
        </ThemeProvider>
      </body>
    </html>
  );
}
