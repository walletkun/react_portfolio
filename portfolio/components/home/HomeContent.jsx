"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Welcome } from "@/components/sections/Welcome";
import { ChatBox } from "@/components/chat/ChatBox";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { usePathname } from "next/navigation";

export function HomeContent() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setIsVisible(false);

    const timer = setTimeout(() => {
      setIsVisible(true);
      setKey((prev) => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`home-content-${key}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12 py-8 font-accent">
                <motion.div variants={childVariants}>
                  <Welcome />
                </motion.div>
                <motion.div variants={childVariants}>
                  <ChatBox
                    key={`chatbox-${key}`}
                    onProjectSelect={setSelectedProject}
                    isVisible={isVisible}
                  />
                </motion.div>
              </div>
            </div>
          </main>

          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProjectPreview
                  project={selectedProject}
                  onClose={() => setSelectedProject(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
