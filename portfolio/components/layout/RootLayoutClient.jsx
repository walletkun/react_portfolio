"use client";

import { Header } from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { Footer } from "./Footer";

const ANIMATION_DURATION = 2.5; // balanced duration

const PageLoader = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
    });

    tl.to(".shape", {
      duration: 0.3, // quick initial appearance
      scale: 1,
      opacity: 1,
      stagger: {
        amount: 0.15,
        from: "random",
      },
    })
      .to(".shape", {
        duration: 0.35,
        x: "random(-120, 120)",
        y: "random(-120, 120)",
        rotate: "random(-180, 180)",
        ease: "power1.out",
        stagger: {
          amount: 0.1,
          from: "random",
        },
      })
      .to(".shape", {
        duration: 0.7,
        x: 0,
        y: 0,
        rotate: 0,
        ease: "power2.inOut",
        stagger: {
          amount: 0.3,
          from: "edges",
        },
      })
      .to(
        ".loader-container",
        {
          duration: 0.3,
          scale: 0,
          opacity: 0,
          ease: "power2.inOut",
        },
        "+=0.2"
      );

    return () => tl.kill();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-white flex justify-center items-center z-50"
    >
      <div className="loader-container relative w-32 h-32">
        <div className="shape absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-0 scale-0">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M32 4L60 32L32 60L4 32L32 4Z"
              fill="black"
              fillOpacity="0.9"
              filter="url(#glow)"
              className="glow-shape"
            />
          </svg>
        </div>

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="shape absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-0 scale-0"
          >
            <svg width="64" height="64" viewBox="0 0 64 64">
              <defs>
                <filter id={`glow-${i}`}>
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d={`M32 4L60 32L32 60L4 32L32 4Z`}
                fill="black"
                fillOpacity={0.8 - i * 0.05}
                filter={`url(#glow-${i})`}
                className="glow-shape"
              />
            </svg>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [navigationKey, setNavigationKey] = useState(0);
  const [showContent, setShowContent] = useState(false);

  // Handle initial load
  useEffect(() => {
    setShowContent(false);
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 100);
      return () => clearTimeout(contentTimer);
    }, ANIMATION_DURATION * 1000);
    return () => clearTimeout(loadingTimer);
  }, [navigationKey]);

  const handleNavigation = useCallback(() => {
    setShowContent(false);
    setIsLoading(true);
    setNavigationKey((prev) => prev + 1);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header handleNavigation={handleNavigation} />

      {/* Loader */}
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader key={navigationKey} />}
      </AnimatePresence>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className="flex-grow"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
