"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function AboutMePage() {
  const skills = {
    Languages: ["Python", "JavaScript", "Java", "C++", "SQL"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Spring Boot"],
    Backend: ["Node.js", "Express", "Django", "Flask"],
    Databases: ["MongoDB", "PostgreSQL", "SQLite"],
    Tools: [
      "Git",
      "Docker",
      "VS Code",
      "Jupyter Notebook",
      "Postman",
      "Heroku",
      "Netlify",
    ],
    "Data Science": ["Pandas", "NumPy", "Matplotlib"],
    "Machine Learning": ["Scikit-learn", "TensorFlow", "Keras"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between gap-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full blur-3xl opacity-0" />
              <Image
                src="/pfp_anime.webp"
                alt="Fei Lin"
                width={320}
                height={320}
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white">
              Hi! I&apos;m Fei
            </h1>
            <p className="text-xl font-sans text-gray-600 dark:text-gray-300 leading-relaxed">
              A passionate software engineer with a strong interest in the field
              of data science and a primary focus on full-stack development.
              With a keen eye for design and a drive for creating impactful,
              user-centric applications, I strive to blend technical expertise
              with creative problem-solving to deliver innovative solutions.
            </p>
          </div>
        </div>

        <section className="mt-20 space-y-10">
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white text-center md:text-left">
            About Me
          </h2>
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <p className="text-lg font-sans text-gray-600 dark:text-gray-300 leading-relaxed">
                I am a senior at Brooklyn College pursuing a bachelor&apos;s degree
                in Computer Science with a minor in Data Science. Currently, I
                am enrolled in the CUNY Tech Prep (CTP) fellowship, a program
                dedicated to guiding CUNY students in developing technical and
                professional skills. In the data science track, I am actively
                building projects that explore the intersection of data analysis
                and application development. Simultaneously, with my primary
                focus on full-stack development, I am creating projects that
                reflect my passion for designing and implementing impactful,
                user-centric solutions. This journey allows me to refine my
                skills while bridging my interests in both software engineering
                and data science.
              </p>
            </CardContent>
          </Card>
        </section>

        <section id="skills" className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white text-center md:text-left">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category} className="bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-display text-gray-800 dark:text-gray-200 mb-4">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 text-sm font-sans bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <Button size="lg" asChild className="font-sans">
            <a href="/Dec_2_24.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4"/>View Resume
            </a>
          </Button>
        </section>
      </main>
    </div>
  );
}
