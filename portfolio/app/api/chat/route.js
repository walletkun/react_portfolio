import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getAllContent() {
  const { data: projects } = await supabase
    .from("portfolio_embeddings")
    .select("content, metadata")
    .eq("metadata->>type", "project");

  const { data: info } = await supabase
    .from("portfolio_embeddings")
    .select("content, metadata")
    .neq("metadata->>type", "project");

  return {
    projects: projects || [],
    generalInfo: info || [],
  };
}

function parseProjectContent(content) {
  const lines = content.split("\n").map((line) => line.trim());
  let project = {
    project_name: "",
    project_description: "",
    project_stack: "",
    project_time_frame: "",
    github_url: "",
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("Project:")) {
      project.project_name = line.replace("Project:", "").trim();
    } else if (line.startsWith("Description:")) {
      let description = [];
      i++;
      while (
        i < lines.length &&
        !lines[i].startsWith("Tech Stack:") &&
        !lines[i].startsWith("Time Frame:") &&
        !lines[i].startsWith("GitHub:")
      ) {
        if (lines[i]) description.push(lines[i]);
        i++;
      }
      i--;
      project.project_description = description.join(" ");
    } else if (line.startsWith("Tech Stack:")) {
      project.project_stack = line.replace("Tech Stack:", "").trim();
    } else if (line.startsWith("Time Frame:")) {
      project.project_time_frame = line.replace("Time Frame:", "").trim();
    } else if(line.startsWith('GitHub:')) {
      project.github_url = line.replace('GitHub:', '').trim();
    }
  }

  return {
    ...project,
    project_name: project.project_name || "Untitled Project",
    project_description:
      project.project_description || "No description available",
    project_stack: project.project_stack || "Technology stack not specified",
    project_time_frame: project.project_time_frame || "Timeline not specified",
    project_github_url: project.github_url || "",
  };
}

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages?.length) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;

    const { projects, generalInfo } = await getAllContent();
    const parsedProjects = projects
      .filter((item) => item.content && item.content.includes("Project:"))
      .map((item) => parseProjectContent(item.content));

    const chatModel = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-4o-mini",
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = ChatPromptTemplate.fromTemplate(`
      You are Fei's friendly and knowledgeable portfolio assistant. Your goal is to engage in natural conversation while sharing information about Fei's work and achievements. Remember to never share sensitive personal information like location, contact details, or private matters.

      Available Information:
      Projects: {projects}
      General Info: {generalInfo}

      User Query: {query}

      Response Guidelines:

      1. For Identity Questions:
         - If asked "who are you?": Respond warmly about being Fei's AI portfolio assistant, created to share Fei's professional journey and projects. Be conversational and invite questions.
         - If asked "who is Fei?": Share a friendly, professional overview focusing on Fei's role as a developer and their key interests in technology. Don't give an introduction about yourself.
         - If asked "What is Fei up to?" : Share that Fei is currently on his way to master TypeScript and building ML projects in CTP. And will use that in his future projects.
        
      2. For Project Queries:
         - Respond in this format:
         {{"type": "projects", "content": {{
           "message": "<write a friendly, conversational intro about the relevant projects>",
           "projects": [<Select up to 3 most relevant projects>],
           "tech_stack": "[<mention the tech stack used>]",
           "link": {{"url": "/pages/projects", "text": "View all projects"}}
         }}}}

      3. For Education/Background:
         - Be conversational and engaging
         - Focus on achievements and learning experiences
         - Share relevant academic highlights and learning journey
         - Format as:
         {{"type": "text_with_link", "content": {{
           "message": "<your conversational response>",
           "link": {{"url": "/pages/about", "text": "Learn more about Fei"}}
         }}}}

      4. For Current Status/Activities:
         - Share professional goals and current focus
         - Mention relevant ongoing projects or learning
         - Be engaging but maintain privacy
         - Use the same text_with_link format

      5. For Technical Questions:
         - Reference specific projects showing technical expertise
         - Explain technologies in a friendly, accessible way
         - Use projects format if showing specific examples

      6. For Hobbies or interests:
        - Share Fei's interests in technology, coding, and learning
        - Share that Fei Loves snowboarding

      Privacy Rules:
      - Never share personal contact information
      - Don't reveal specific location details
      - Keep personal life details private
      - Focus on professional and academic achievements
      - If asked about sensitive information, politely decline and redirect to professional topics

      Maintain a friendly, conversational tone while being informative and professional.
      Always structure responses in the specified JSON formats.
    `);

    const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());

    const response = await chain.invoke({
      query: query,
      projects: JSON.stringify(parsedProjects),
      generalInfo: generalInfo.map((item) => item.content).join("\n\n"),
    });

    // Parse the response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);

      // Validate project response format
      if (
        parsedResponse.type === "projects" &&
        parsedResponse.content.projects
      ) {
        parsedResponse.content.projects = parsedResponse.content.projects.map(
          (project) => ({
            project_name: project.project_name || "Untitled Project",
            project_description:
              project.project_description || "No description available",
            project_stack:
              project.project_stack || "Technology stack not specified",
            project_time_frame:
              project.project_time_frame || "Timeline not specified",
          })
        );
      }
    } catch (e) {
      parsedResponse = {
        type: "text_with_link",
        content: {
          message: response,
          link: { url: "/pages/about", text: "Learn more about Fei" },
        },
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      type: "text_with_link",
      content: {
        message:
          "I apologize, but I encountered an error processing your request. Could you please try asking your question differently?",
        link: { url: "/pages/about", text: "Learn more about Fei" },
      },
    });
  }
}