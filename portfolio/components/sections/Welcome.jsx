import React from "react";
import TypewriterComponent from "typewriter-effect";


export function Welcome() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-gray-900 dark:text-white">
        Hi! I&apos;m Fei&apos;s personal assistant!
      </h1>
      <p className="text-xl font-sans text-gray-600 dark:text-gray-300 leading-relaxed">
        Ask me about Fei&apos;s experience and projects, etc.!
      </p>
    </div>
  );
}
