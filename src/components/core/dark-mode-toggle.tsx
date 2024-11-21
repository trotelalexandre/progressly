"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <SidebarMenuItem className="list-none">
      <SidebarMenuButton onClick={handleToggle}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span>{theme === "light" ? "Light" : "Dark"} mode</span>
        <span className="sr-only">Toggle theme</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
