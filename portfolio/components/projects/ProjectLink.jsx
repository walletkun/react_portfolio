import React from "react";
import { ExternalLink } from "lucide-react";

export function ProjectLink({ project, onClick }) {
  return (
    <div
      onClick={() => onClick(project)}
      className="p-4 my-2 bg-card hover:bg-sans rounded-lg cursor-pointer transition-all duration-200 border border-border hover:shadow-md"
    >
      <div className="flex items-center justify-between font-sans">
        <h3 className="font-semibold text-lg">{project.project_name}</h3>
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 font-sans">
        {project.project_description}
      </p>
      <div className="flex flex-wrap gap-2 mt-2 font-sans">
        {project.project_stack
          .split(", ")
          .slice(0, 3)
          .map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        {project.project_stack.split(", ").length > 3 && (
          <span className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium">
            +{project.project_stack.split(", ").length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}
