import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { CogIcon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SignOutButton from "../features/auth/sign-out-button";

const links = [
  { href: "/habits", label: "Habits" },
  { href: "/budget", label: "Budget" },
  { href: "/investments", label: "Investments" },
  { href: "/reading", label: "Reading" },
];

export default async function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/app" className="text-lg font-bold">
          <h1 className="text-xl font-bold">My dashboard</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={`/app${href}`}
                className="text-sm font-medium hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-8 h-8 border rounded-full flex items-center justify-center">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <Link
                  href="/settings"
                  className="text-sm text-left flex items-center"
                >
                  <CogIcon className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton className="text-sm text-left flex items-center">
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
