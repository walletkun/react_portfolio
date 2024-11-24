"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ProjectPreview = dynamic(
  () =>
    import("@/components/projects/ProjectPreview").then(
      (mod) => mod.ProjectPreview
    ),
  {
    loading: () => (
      <div className="w-full h-64 animate-pulse bg-primary/10 rounded-lg" />
    ),
  }
);

const Image = dynamic(() => import("next/image"), {
  loading: () => (
    <div className="w-12 h-12 rounded-full bg-primary/10 animate-pulse" />
  ),
});

const INITIAL_SUGGESTIONS = [
  "Show me projects with NextJs",
  "Who are you?",
  "Tell me about Fei",
  "Which projects use Python?",
];

export function ChatBox() {
  const pathname = usePathname();
  const [key, setKey] = useState(0);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setKey((prev) => prev + 1);
    return () => setMounted(false);
  }, [pathname]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      requestAnimationFrame(() => {
        scrollAreaRef.current.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messages]);

  const renderMessage = (message) => {
    if (message.role === "assistant") {
      const content = message.content;

      if (content.type === "text_with_link") {
        return (
          <div className="space-y-3">
            <p className="text-foreground">{content.content.message}</p>
            {content.content.link && (
              <a
                href={content.content.link.url}
                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 text-sm font-medium mt-2"
              >
                {content.content.link.text}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        );
      }

      if (content.type === "projects") {
        return (
          <div className="space-y-4">
            {content.content.message && (
              <p className="text-muted-foreground">{content.content.message}</p>
            )}
            {content.content.projects && content.content.projects.length > 0 ? (
              <div className="space-y-3">
                {content.content.projects.map((project, index) => (
                  <ProjectLink
                    key={`${project.project_name}-${index}`}
                    project={project}
                    onClick={(project) => setSelectedProject(project)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">
                No matching projects found. Try a different search term.
              </p>
            )}
            {content.content.link && (
              <a
                href={content.content.link.url}
                className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 text-sm font-medium mt-2"
              >
                {content.content.link.text}
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        );
      }

      return <p>{typeof content === "string" ? content : content.content}</p>;
    }
    return <p>{message.content}</p>;
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };

    try {
      setIsLoading(true);
      setError(null);
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    } catch (error) {
      console.error("Chat error:", error);
      setError(error.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: {
            type: "text",
            content:
              "I apologize, but I encountered an error processing your request.",
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div
        className="rounded-xl border border-border p-8 space-y-6 bg-card/50 shadow-lg"
        style={{
          overflow: "hidden",
          isolation: "isolate",
        }}
      >
        {/* Header section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Image
              src="/ceo.png"
              alt="ceo-no-bg"
              width={48}
              height={48}
              className="object-contain scale-[1.2] pt-1 transition-transform duration-200 group-hover:scale-[1.3]"
              quality={100}
              sizes="(max-width: 48px) 100vw, 48px"
              style={{
                objectFit: "cover",
                transform: "translateZ(0)",
              }}
              priority
            />
          </div>
          <div>
            <h2 className="text-xl font-display font-medium">
              Interactive Portfolio Guide
            </h2>
            <p className="text-muted-foreground font-sans text-sm">
              Let&apos;s explore my work together
            </p>
          </div>
        </div>

        {/* Rest of your component... */}
        <div className="space-y-6">
          {messages.length === 0 ? (
            <>
              <p className="text-muted-foreground font-accent text-md">
                Here are some things you can ask me about:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                {INITIAL_SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-4 text-left font-sans text-md rounded-lg hover:bg-primary/10 transition-colors border border-border/50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div
              className="min-h-[200px] max-h-[400px] overflow-y-auto space-y-4 scroll-smooth"
              ref={scrollAreaRef}
            >
              {messages.map((message, index) => (
                <ChatMessages
                  key={index}
                  message={message}
                  renderMessage={renderMessage}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-secondary">
                      <Image
                        src="/ceo.png"
                        alt="ceo-no-bg"
                        width={48}
                        height={48}
                        className="object-contain scale-[1.2] pt-1 transition-transform duration-200 group-hover:scale-[1.3]"
                        quality={100}
                        sizes="(max-width: 48px) 100vw, 48px"
                        style={{
                          objectFit: "cover",
                          transform: "translateZ(0)",
                        }}
                        priority
                      />
                    </div>
                    <div className="rounded-lg p-3 bg-secondary/50">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about specific projects, technologies, or timeframes..."
              className="flex-grow px-4 py-3 rounded-lg font-sans bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="font-accent sm:mx-5"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? "Sending..." : "Ask"}
            </Button>
          </div>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>
      </div>

      {selectedProject && (
        <Suspense
          fallback={
            <div className="w-full h-64 animate-pulse bg-primary/10 rounded-lg" />
          }
        >
          <ProjectPreview
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </motion.div>
  );
}
