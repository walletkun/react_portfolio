'use client';

import { createContext, useContext } from "react";

export const portfolioData = {
  projects: [
    {
      project_name: "CICERO - Your Personal AI Tutor",
      project_description: `Collaborated with a team of 3 to design a web application—an AI-based tutor capable of parsing files and utilizing vector database Pinecone to implement RAG to generate accurate answers.
            Utilized OpenAI and LLama models, along with JSON PDF parsing, to process user files and extract the necessary components requested by students.
            Implemented Firebase for real-time database functionality and user authentication, along with Next.js and React for the frontend, using Shadcn UI for the UI components.`,
      project_stack: `React, Next.js, Firebase, Pinecone, OpenAI, LLama, JSON, Shadcn UI`,
      project_time_frame: `September 2024 - October 2024`,
      github_url: "https://github.com/walletkun/CICERO",
    },
    {
      project_name:
        "Emotionfy - A Sentiment Analysis Tool with Spotify Integration",
      project_description: `Developed a real-time emotion detection system using Convolutional Neural Networks (CNN) and integrated with
            Spotify's API to create dynamic playlist recommendations based on facial expressions, Engineered a full-stack application using React for the frontend interface and Flask backend to process facial recognition data and handle API communications,
            Implemented deep learning models trained on 35,000+ facial images to classify seven distinct emotions, achieving 92% accuracy in real-time emotion detection, Integrated Spotify Web API and OAuth 2.0 authentication to enable seamless playlist generation and playback based on detected emotional states.`,
      project_stack: `React, Flask, Spotify API, OAuth 2.0, CNN, TensorFlow, Keras, OpenCV, NumPy, Pandas`,
      project_time_frame: `July 2024 - December 2024`,
      github_url: "https://github.com/walletkun/emotionfy",
    },
    {
      project_name: `Job App Tracker - A Job Application Tool`,
      project_description: `Developed a full-stack web application to track job applications, interviews, and offers using React for Frontend Development, Flask for Backend Development, Shadcn UI for UI components, currently still in development.`,
      project_stack: `React, Flask, Shadcn UI`,
      project_time_frame: `October 2024 - Present`,
      github_url: "https://github.com/walletkun/jobapp_tracker",
    },
    {
      project_name: `Churn rate - A Machine Learning Model to Predict Customer Churn Rate`,
      project_description: `Conducted a comprehensive analysis of customer churn for a subscription service using a Kaggle dataset,
        incorporating data cleaning, preprocessing, and feature engineering. Built and optimized machine learning models using Python libraries such as Pandas and NumPy.
        Streamlined user experience by integrating AI-driven responses, making professor selection more intuitive and
        efficient.`,
      project_stack: `Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Tableau`,
      project_time_frame: `September 2024 - Present`,
      github_url: "https://github.com/walletkun/churn_rate",
    },
    {
      project_name: `AI Hotdog Detector 2.0 - A Humor-Driven App to Detect Hotdogs`,
      project_description: `Developed a humor-driven app that uses the Google Vision API to detect hotdogs and integrates OpenAI to generate creative narratives. 
    Incorporated Supabase for user authentication (OAuth) and securely stored personalized AI-generated hotdog backstories. Designed an accessible and responsive UI 
    using ShadCN, running and testing the app locally to ensure seamless functionality.`,
      project_stack: `Next.js, React, Google Vision API, OpenAI, Supabase, ShadCN UI, OAuth, Tailwind CSS, SQL`,
      project_time_frame: `November 2024 - December 2024`,
      github_url: "https://github.com/walletkun/hotdog_detector",
    },
    {
      project_name: `React Portfolio - Personal Portfolio with OpenAI Integration`,
      project_description: `Developed a personal portfolio website using React and Next.js, integrating OpenAI to enhance content generation. The project showcases professional experiences and projects, providing an interactive platform for visitors.`,
      project_stack: `React, Next.js, OpenAI, Tailwind CSS, ShadCN UI, Supabase, SQL`,
      project_time_frame: `November 2024 - December 2024`,
      github_url: "https://github.com/walletkun/react_portfolio",
    },
  ],

  experience: [
    {
      company: "CUNY TECH PREP",
      position: "Data Science Fellow",
      description: `Selected for a competitive data science fellowship with students from across the 11 CUNY senior colleges where Fellows create technical projects
        Leveraging Python, Pandas and NumPy for data analysis, cleaning, and visualization, while using Tableau to create interactive dashboards and visual reports`,
    },
    {
      company: "Headstarter AI",
      position: "Software Engineer Fellow",
      description: `Built 5 AI projects in 5 weeks using React JS, Next.js, Firebase, Clerk, and Vercel, following agile methodologies with weekly sprints and incorporated CI/CD practices for iterative deployment
        Worked in a team of 3 to develop an interactive customer support agent using Next.js, integrated a custom RAG pipeline using OpenAI and Pinecone that responds based on a company's knowledge base
        Collaborated with 3 Fellows to build and deploy a SaaS product that generates dynamic flashcards based on any topic using the OpenAI LLM, integrated a paywall and custom pricing plans using the Stripe API`,
    },
  ],

  education: [
    {
      institution: `Brooklyn College - City University of New York`,
      degree: `Bachelor of Science in Computer Science and minor in Data Science`,
      graduation_year: `Fall 2025`,
      courses_taken: [
        `Data Structures`,
        `Algorithms`,
        `Intro to Software Engineering`,
        `Calculus 1 - 2`,
        `Linear Algebra`,
        `Probability and Statistics`,
        `Machine Learning`,
        `Computer Graphics`,
        `Operating Systems`,
        `Database Management Systems`,
        `Artificial Intelligence`,
      ],
    },
  ],

  technical_skills: {
    languages: [`Python`, `JavaScript`, `Java`, `SQL`, `HTML`, `CSS`],
    frameworks: [`React`, `Next.js`, `Flask`, `Springboot`, `Bootstrap`],
    libraries: [
      `Tailwind CSS`,
      `Pandas`,
      `NumPy`,
      `Matplotlib`,
      `Seaborn`,
      `Scikit-learn`,
      `TensorFlow`,
      `Keras`,
      `OpenCV`,
      `Firebase`,
      `Stripe`,
      `Pinecone`,
      `OpenAI`,
      `LLama`,
      `Tableau`,
    ],
    developer_tools: [
      `Git`,
      `GitHub`,
      `VS Code`,
      `Jupyter Notebook`,
      `Postman`,
    ],
  },
};


export const PortfolioContext = createContext(portfolioData);


export function PortfolioProvider({ children }) {
  return (
    <PortfolioContext.Provider value={portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
}


export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (context === undefined) {
        throw new Error("usePortfolio must be used within a PortfolioProvider");
    }

    return context;
}