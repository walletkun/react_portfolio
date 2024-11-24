"use client";

import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer({}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-4">
        {" "}
        <div className="flex flex-col items-center space-y-3">
          {" "}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex space-x-4">
              {" "}
              <Link
                href="https://github.com/walletkun"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/fei-lincs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:feilinpersonal@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
          {/* Copyright */}
          <div className="text-xs text-muted-foreground font-sans text-center">
            <p>© {currentYear} Fei. All rights reserved.</p>
            <p className="text-[10px]">
              Profile picture inspiration from{" "}
              <a
                href="https://arunike.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                Richie Zhou
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
