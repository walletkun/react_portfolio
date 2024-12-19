"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedExperience, setExpandedExperience] = useState(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { data, error } = await supabase
          .from("portfolio_embeddings")
          .select("*")
          .eq("metadata->>type", "experience");

        if (error) throw error;

        if (!data || data.length === 0) {
          console.log("No experience data found");
          return;
        }

        const transformedData = data.map((item) => {
          const lines = item.content.split("\n").map((line) => line.trim());
          let company = "",
            position = "",
            description = "",
            skills = [];

          lines.forEach((line) => {
            if (line.startsWith("Company:"))
              company = line.replace("Company:", "").trim();
            else if (line.startsWith("Position:"))
              position = line.replace("Position:", "").trim();
            else if (line.startsWith("Description:"))
              description = line.replace("Description:", "").trim();
            else if (line.startsWith("Skills:")) {
              skills = line
                .replace("Skills:", "")
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0);
            } else if (line.length > 0 && description)
              description += "\n" + line;
          });

          return { title: position, company, description, skills };
        });

        setExperiences(transformedData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  const renderSkills = (skills) => {
    if (!skills || skills.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Badge
              variant="secondary"
              className="px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    );
  };

  const toggleExpand = (index) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  return (
    <div className="min-h-screen font-sans from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white mb-4">
            My Experience
          </h1>
          <p className="text-xl font-sans text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my professional journey through an interactive timeline.
            Each role has shaped my growth as a software engineer, data
            scientist, and full-stack developer.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-600"></div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`mb-8 flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <Card className="w-full md:w-5/6 lg:w-2/3 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 relative">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-display text-gray-900 dark:text-white flex items-center">
                    <Briefcase className="mr-2 h-5 w-5 text-primary" />
                    {exp.title}
                  </CardTitle>
                  <div className="text-lg font-sans text-gray-600 dark:text-gray-300">
                    {exp.company}
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {expandedExperience === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.2,
                          opacity: { duration: 0.2 },
                          height: { duration: 0.2 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mb-4 text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {exp.description}
                        </p>
                        {renderSkills(exp.skills)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpand(index)}
                    className="mt-2 w-full justify-center"
                  >
                    {expandedExperience === index ? (
                      <>
                        <ChevronUp className="mr-2 h-4 w-4" /> Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="mr-2 h-4 w-4" /> Show More
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
