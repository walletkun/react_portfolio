"use client";

import { Header } from "@/components/layout/Header";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { Footer } from "./Footer";
import NeuralBackground from "./NeuralBackground";

const ANIMATION_DURATION = 1.9;
const FADE_DURATION = 0.3;

const PageLoader = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
    });

    tl.to(".shape", {
      duration: 0.3,
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
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="shape absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-0 scale-0"
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              style={{
                filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.3))",
              }}
            >
              <path
                d="M32 4L60 32L32 60L4 32L32 4Z"
                fill="black"
                fillOpacity={0.95 - i * 0.05}
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

  useEffect(() => {
    setShowContent(false);
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);

      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, FADE_DURATION * 1000);
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
      <NeuralBackground className="z-10" />
      <Header handleNavigation={handleNavigation} className="z-50" />
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
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              duration: FADE_DURATION,
              delay: 0.1,
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
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{
              duration: FADE_DURATION,
              delay: 0.2,
            }}
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
