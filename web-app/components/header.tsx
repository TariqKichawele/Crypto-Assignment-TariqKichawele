"use client";

import { Bitcoin, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Bitcoin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">CryptoTrack</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}