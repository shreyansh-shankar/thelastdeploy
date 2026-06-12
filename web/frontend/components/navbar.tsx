// web/frontend/components/navbar.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tld:theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tld:theme", "light");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navLink = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
          active
            ? "text-[var(--accent-primary)] bg-[rgba(var(--accent-primary-rgb),0.1)]"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — dashboard if logged in, landing if not */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--accent-primary)]">
            <span className="text-black dark:text-black font-black text-sm">O</span>
          </div>
          <span className="font-black text-lg tracking-tight text-foreground">The Last Deploy</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLink("/modules", "Modules")}
        </div>

        {/* Auth & Theme Toggler */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {loading ? (
            <div className="h-9 w-28 bg-muted/50 animate-pulse rounded-xl border border-border/50" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-card hover:bg-muted transition-colors border border-border text-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-[10px] font-bold" style={{ backgroundColor: "var(--accent-primary)", color: "#000" }}>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden md:block">{user.username}</span>
                  <span className="text-xs font-mono font-bold hidden md:block" style={{ color: "var(--accent-primary)" }}>
                    {user.xp} XP
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer text-foreground hover:bg-muted">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer text-foreground hover:bg-muted">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:bg-muted">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground hover:bg-muted">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="font-bold text-black rounded-xl" style={{ backgroundColor: "var(--accent-primary)" }}>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}