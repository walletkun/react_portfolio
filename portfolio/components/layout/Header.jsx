"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NavItem } from "@/components/navigation/NavItem";

const navigationItems = [
  { path: "/", label: "Home" },
  { path: "/pages/about", label: "About" },
  { path: "/pages/experiences", label: "Experiences" },
  { path: "/pages/projects", label: "Projects" },
  { path: "/pages/contact", label: "Contact" },
];

export function Header({ handleNavigation }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const navigateTo = (path) => {
    if (isNavigating || path === pathname) return;

    setIsNavigating(true);
    handleNavigation();

    setTimeout(() => {
      router.push(path);
      setIsNavigating(false);
    }, 200);

    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => navigateTo("/")}
          className="relative group"
          disabled={isNavigating}
        >
          <h1 className="text-4xl font-accent font-bold text-accent">Fei.</h1>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map(({ path, label }) => (
            <NavItem
              key={path}
              href={path}
              isActive={pathname === path}
              onClick={() => navigateTo(path)}
              disabled={isNavigating}
            >
              {label}
            </NavItem>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent transition-colors data-[state=open]:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                disabled={isNavigating}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {navigationItems.map(({ path, label }) => (
                <DropdownMenuItem
                  key={path}
                  onClick={() => navigateTo(path)}
                  className="cursor-pointer font-accent capitalize"
                  disabled={isNavigating}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
