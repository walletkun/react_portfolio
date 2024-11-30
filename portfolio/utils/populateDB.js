import { createEmbeddings } from "./embeddings.js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

console.log("Environment check from populateDB:");
console.log("OpenAI API Key exists:", !!process.env.OPENAI_API_KEY);
console.log("OpenAI API Key length:", process.env.OPENAI_API_KEY?.length);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const portfolioData = {
  projects: [
    {
      project_name: "CICERO - Your Personal AI Tutor",
      project_description: `Collaborated with a team of 3 to design a web application—an AI-based tutor capable of parsing files and utilizing vector database Pinecone to implement RAG to generate accurate answers.
            Utilized OpenAI and LLama models, along with JSON PDF parsing, to process user files and extract the necessary components requested by students.
            Implemented Firebase for real-time database functionality and user authentication, along with Next.js and React for the frontend, using Shadcn UI for the UI components.`,
      project_stack: `React, Next.js, Firebase, Pinecone, OpenAI, LLama, JSON, Shadcn UI`,
      project_time_frame: `September 2024 - October 2024`,
    },
    {
      project_name:
        "Emotionfy - A Sentiment Analysis Tool with Spotify Integration",
      project_description: `Developed a real-time emotion detection system using Convolutional Neural Networks (CNN) and integrated with
            Spotify's API to create dynamic playlist recommendations based on facial expressions, Engineered a full-stack application using React for the frontend interface and Flask backend to process facial recognition data and handle API communications,
            Implemented deep learning models trained on 35,000+ facial images to classify seven distinct emotions, achieving 92% accuracy in real-time emotion detection, Integrated Spotify Web API and OAuth 2.0 authentication to enable seamless playlist generation and playback based on detected emotional states.`,
      project_stack: `React, Flask, Spotify API, OAuth 2.0, CNN, TensorFlow, Keras, OpenCV, NumPy, Pandas`,
      project_time_frame: `July 2024 - December 2024`,
    },
    {
      project_name: `Job App Tracker - A Job Application Tool`,
      project_description: `Developed a full-stack web application to track job applications, interviews, and offers using React for Frontend Development, Flask for Backend Development, Shadcn UI for UI components, currently still in development.`,
      project_stack: `React, Flask, Shadcn UI`,
      project_time_frame: `October 2024 - Present`,
    },
    {
      project_name: `Churn rate - A Machine Learning Model to Predict Customer Churn Rate`,
      project_description: `Conducted a comprehensive analysis of customer churn for a subscription service using a Kaggle dataset,
        incorporating data cleaning, preprocessing, and feature engineering. Built and optimized machine learning models using Python libraries such as Pandas and NumPy.
        Streamlined user experience by integrating AI-driven responses, making professor selection more intuitive and
        efficient.`,
      project_stack: `Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Tableau`,
      project_time_frame: `September 2024 - Present`,
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
  social_links: {
    github: "https://github.com/walletkun",
    linkedin: "https://linkedin.com/in/fei-lincs",
    portfolio: "https://walletkun.com",
    email: "feilinpersonal@gmail.com",
  },
};

async function checkExistingEntry(type, identifierField, identifierValue) {
  const { data, error } = await supabase
    .from("portfolio_embeddings")
    .select("id")
    .eq("type", type)
    .eq(identifierField, identifierValue)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(`Error checking for existing ${type}:`, error);
    return null;
  }

  return data?.id;
}

async function populateDataBase() {
  try {
    console.log("Creating embeddings...");
    console.log("Starting to populate database...");

    // Log the portfolio data structure
    console.log("Portfolio data structure:", {
      projectsCount: portfolioData.projects.length,
      experienceCount: portfolioData.experience.length,
      educationCount: portfolioData.education.length,
      hasSkills: !!portfolioData.technical_skills,
      hasSocialLinks: !!portfolioData.social_links,
    });

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key not found. Please check your .env file.");
    }

    // Check for existing social links
    const socialLinksExist = await checkExistingEntry(
      "social_links",
      "type",
      "social_links"
    );
    if (socialLinksExist) {
      console.log("Social links already exist in the database");
    }

    // Call createEmbeddings with portfolio data
    const result = await createEmbeddings(portfolioData);
    console.log("Embedding creation result:", result);

    console.log("Embeddings created successfully");

    const { data, error } = await supabase
      .from("portfolio_embeddings")
      .select(
        `id,
        content,
        metadata,
        type,
        name,
        stack,
        company,
        position,
        institution,
        degree`
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Error querying the database", error);
    } else {
      console.log("Database query result:", data);
    }

    console.log("Database populated successfully");
  } catch (error) {
    console.error("Error creating embeddings", error);
  }
}

populateDataBase();

export default populateDataBase;
