import React, { useState, useEffect, useCallback } from "react";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { ExternalLink } from "lucide-react";

export function TypewriterText({ content, onProjectClick }) {
  const [currentText, setCurrentText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const extractMessage = useCallback(() => {
    try {
      if (typeof content === "string") {
        return content;
      }
      if (content?.type === "text_with_link" && content.content?.message) {
        return content.content.message;
      }
      if (content?.type === "projects" && content.content?.message) {
        return content.content.message;
      }
      if (content?.type === "social_links" && content.content?.message) {
        return content.content.message;
      }
      if (typeof content?.content === "string") {
        return content.content;
      }
      return "";
    } catch (error) {
      console.error("Error extracting message:", error);
      return "";
    }
  }, [content]);

  useEffect(() => {
    const message = extractMessage();
    let timeoutId = null;
    let currentPosition = 0;

    setCurrentText("");
    setIsComplete(false);

    const typeCharacter = () => {
      if (currentPosition < message.length) {
        setCurrentText(message.substring(0, currentPosition + 1));
        currentPosition++;
        timeoutId = setTimeout(typeCharacter, 15);
      } else {
        setIsComplete(true);
      }
    };

    if (message) {
      timeoutId = setTimeout(typeCharacter, 20);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [extractMessage]);

  return (
    <div className="space-y-4">
      <div className="whitespace-pre-wrap font-sans">
        {currentText}
        {!isComplete && (
          <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
        )}
      </div>

      {isComplete &&
        content?.type === "projects" &&
        content.content?.projects && (
          <div className="space-y-2">
            {content.content.projects.map((project, index) => (
              <ProjectLink
                key={`${project.project_name}-${index}`}
                project={project}
                onClick={onProjectClick}
              />
            ))}
          </div>
        )}

      {isComplete &&
        content?.type === "text_with_link" &&
        content.content?.link && (
          <a
            href={content.content.link.url}
            className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 text-sm font-medium mt-2"
          >
            {content.content.link.text}
            <ExternalLink className="h-4 w-4" />
          </a>
        )}

      {isComplete &&
        content?.type === "social_links" &&
        content.content?.links && (
          <div className="flex flex-wrap gap-4 mt-4">
            {Object.entries(content.content.links).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}
    </div>
  );
}
