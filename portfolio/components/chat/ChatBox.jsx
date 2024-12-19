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
  "Which projects use Python?",
  "Tell me about Fei",
  "Who are you?",
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

      if (content.type === "social_links") {
        return (
          <div className="space-y-4">
            {content.content.message && (
              <p className="text-muted-foreground">{content.content.message}</p>
            )}
            {content.content.links && (
              <div className="flex flex-wrap gap-4">
                {content.content.links.github && (
                  <a
                    href={content.content.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {content.content.links.linkedin && (
                  <a
                    href={content.content.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {content.content.links.devpost && (
                  <a
                    href={content.content.links.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-medium"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 16.526L3.462 12.004l4.133-6.132h8.81l4.133 6.132l-4.133 6.132H7.595z" />
                    </svg>
                    Devpost
                  </a>
                )}
              </div>
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

      if (content.type === "projects") {
        console.log("Projects from API: ", content.content.projects);
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
                    project={{
                      ...project,
                      project_name: project.project_name || "Untitled Project",
                      project_description:
                        project.project_description ||
                        "No description available",
                      project_stack:
                        project.project_stack ||
                        "Technology stack not specified",
                      project_time_frame:
                        project.project_time_frame || "Timeline not specified",
                      github_url: project.github_url || "",
                    }}
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

      if (data.type === "projects" && data.content.projects) {
        data.content.projects = data.content.projects.map((project) => ({
          ...project,
          project_name: project.project_name || "Untitled Project",
          project_description:
            project.project_description || "No description available",
          project_stack:
            project.project_stack || "Technology stack not specified",
          project_time_frame:
            project.project_time_frame || "Timeline not specified",
          github_url: project.github_url || "",
        }));
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
      className="relative bg-white rounded-2xl"
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

        <div className="space-y-6">
          {messages.length === 0 ? (
            <>
              {/* Integrated Social Links Header */}
              <div className="mb-8 space-y-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground font-accent text-md text-center">
                    Welcome! Connect with me:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a
                      href="https://github.com/walletkun"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex hover:bg-slate-600 hover:text-slate-200 items-center gap-2 px-3 py-1.5 rounded-md bg-card hover:bg-muted transition-colors text-sm font-medium border border-border/50"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/fei-lincs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center hover:bg-slate-600 hover:text-slate-200 gap-2 px-3 py-1.5 rounded-md bg-card hover:bg-muted transition-colors text-sm font-medium border border-border/50"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://devpost.com/walletkun"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center hover:bg-slate-600 hover:text-slate-200 gap-2 px-3 py-1.5 rounded-md bg-card hover:bg-muted transition-colors text-sm font-medium border border-border/50"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 16.526L3.462 12.004l4.133-6.132h8.81l4.133 6.132l-4.133 6.132H7.595z" />
                      </svg>
                      Devpost
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-muted-foreground font-accent text-md text-center">
                    Here are some things you can ask me about:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans">
                    {INITIAL_SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-4 text-left font-sans hover:bg-slate-600 hover:text-slate-200 text-md rounded-lg hover:bg-primary/10 transition-colors border border-border/50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
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
