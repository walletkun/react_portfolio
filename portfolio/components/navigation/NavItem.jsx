"use client";

import Link from "next/link";

export function NavItem({ href, children, isActive, onClick, disabled }) {
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
            : "hover:bg-slate-700 hover:text-slate-50"
        }
        ${disabled ? "pointer-events-none opacity-50" : ""}
      `}
    >
      {children}
    </Link>
  );
}
