// web/frontend/components/navbar.tsx

"use client";

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

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
            : "text-[#888] hover:text-white hover:bg-white/5"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="border-b border-[#1a1a1a] bg-[#0a0a0a] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — dashboard if logged in, landing if not */}
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--accent-primary)" }}>
            <span className="text-black font-black text-sm">O</span>
          </div>
          <span className="font-black text-lg tracking-tight">OrbStack</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLink("/modules", "Modules")}
          {navLink("/leaderboard", "Leaderboard")}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#1a1a1a] hover:bg-[#222] transition-colors border border-[#2a2a2a]">
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
              <DropdownMenuContent align="end" className="w-48 bg-[#111] border-[#2a2a2a]">
                <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#2a2a2a]" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="text-[#888] hover:text-white hover:bg-white/5">
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