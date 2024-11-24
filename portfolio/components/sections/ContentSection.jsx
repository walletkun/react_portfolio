import React from "react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

export function ContentSection({ title, children }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, type: "tween", ease: "easeOut" }}
      className="space-y-4"
      style={{
        willChange: "transform, opacity",
        isolation: "isolate",
        overscrollBehavior: "contain",
      }}
    >
      {title && (
        <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      <div className="relative font-accent">{children}</div>
    </MotionDiv>
  );
}
