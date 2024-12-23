import React, { useState } from "react";
import { X, Maximize2, Minus, Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";

export function ProjectPreview({ project, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key="modal"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-sans"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{
            scale: isClosing ? 0.9 : 1,
            opacity: isClosing ? 0 : 1,
            y: isClosing ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="w-[800px] h-[600px] bg-white rounded-lg overflow-hidden flex flex-col"
        >
          <div className="flex items-center p-2 bg-muted border-b border-border">
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={handleClose}
                className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center group hover:bg-red-600"
              >
                <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-red-100" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center group hover:bg-yellow-600"
              >
                <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-yellow-100" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center group hover:bg-green-600"
              >
                <Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 text-green-100" />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex-1 p-6 overflow-y-auto"
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{project.project_name}</h2>
              <div className="flex gap-2">
                {project.github_url && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  </motion.div>
                )}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-2 opacity-50 cursor-not-allowed"
                    disabled
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </Button>
                </motion.div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">
                  {project.project_description}
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-card p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.project_stack.split(", ").map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="px-2 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-card p-4 rounded-lg"
              >
                <h3 className="font-semibold mb-2">Timeline</h3>
                <p className="text-muted-foreground">
                  {project.project_time_frame}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
export default ProjectPreview;
