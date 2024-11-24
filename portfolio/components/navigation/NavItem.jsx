"use client";

import Link from "next/link";

export function NavItem({ href, children, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`
        px-4 py-2 
        rounded-lg 
        transition-all 
        duration-200 
        font-accent
        text-sm
        font-medium
        tracking-wide
        ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "hover:bg-accent hover:text-accent-foreground"
        }
      `}
    >
      {children}
    </Link>
  );
}
