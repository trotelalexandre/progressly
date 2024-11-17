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
import SignOutButton from "../auth/sign-out-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { DarkModeToggle } from "./dark-mode-toggle";

const links = [
  { href: "", label: "My dashboard" },
  { href: "/habits", label: "Habits" },
  { href: "/budget", label: "Budget" },
  { href: "/investments", label: "Investments", disabled: true },
  { href: "/reading", label: "Reading", disabled: true },
];

export default async function Header() {
  return (
    <header className="border-b">
      <NavigationMenu className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <NavigationMenuList>
          {links.map(({ href, label, disabled }) => {
            if (disabled) {
              return null;
            }

            return (
              <NavigationMenuItem key={href}>
                <Link href={`/app${href}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>

        <div className="flex items-center gap-4">
          <DarkModeToggle />

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
        </div>
      </NavigationMenu>
    </header>
  );
}
