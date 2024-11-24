"use client";

import { useState } from "react";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { ProjectPreview } from "@/components/projects/ProjectPreview";
import { usePortfolio } from "@/components/providers/portfolioContext";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = usePortfolio();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-xl font-sans text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Here are some of the projects I've worked on. Click on a project to
          learn more about it!
        </p>
      </div>
      <div className="font-sans grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectLink
            key={index}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
      {selectedProject && (
        <ProjectPreview
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
