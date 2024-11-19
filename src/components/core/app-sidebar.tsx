import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bike, Book, Cog, HandCoins, Home, PiggyBank } from "lucide-react";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { DarkModeToggle } from "./dark-mode-toggle";

const items = [
  {
    title: "My dashboard",
    url: "/app",
    icon: Home,
  },
  {
    title: "Habits",
    url: "/app/habits",
    icon: Bike,
  },
  {
    title: "Budgets",
    url: "/app/budgets",
    icon: PiggyBank,
  },
  {
    title: "Investments",
    url: "/app/investments",
    icon: HandCoins,
    disabled: true,
  },
  {
    title: "Reading",
    url: "/app/readings",
    icon: Book,
    disabled: true,
  },
];

const footer = [
  {
    title: "Settings",
    url: "/app/settings",
    icon: Cog,
    disabled: true,
  },
];

const user = {
  name: "Alexandre",
  email: "trotelalexandre@proton.me",
  avatar: "",
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => {
              if (item.disabled) {
                return null;
              }

              return (
                <SidebarMenuItem key={item.url} className="list-none">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <DarkModeToggle />
            {footer.map((item) => {
              return (
                <SidebarMenuItem key={item.url} className="list-none">
                  <SidebarMenuButton disabled={item.disabled} asChild>
                    <Link href="/app/settings">
                      <item.icon />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
