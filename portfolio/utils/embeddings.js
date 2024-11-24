//This will be the embedding for the portfolio page
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

//Importing necessary imports so .env can work
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

//Get the director path of the current module we're in
const __dirname = dirname(fileURLToPath(import.meta.url));

//Configure dotenv with the explicit path
dotenv.config({ path: resolve(__dirname, "../.env") });

// Debug logs
console.log("Current directory:", __dirname);
console.log("Supabase URL exists:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  "Supabase Key exists:",
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Create a new instance of the OpenAIEmbeddings class and supabase
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export async function createEmbeddings(portfolioData) {
  const documents = [
    //Projects - create separate embeddings for each projects
    ...portfolioData.projects.map((project) => ({
      pageContent: `
                Project: ${project.project_name}
                Description: ${project.project_description}
                Tech Stack: ${project.project_stack}
                Time Frame: ${project.project_time_frame}`,
      metadata: {
        type: "project",
        name: project.project_name,
        stack: project.project_stack,
      },
    })),

    //Experience - create separate embeddings for each experience
    ...portfolioData.experience.map((experience) => ({
      pageContent: `
                Company: ${experience.company}
                Position: ${experience.position}
                Description: ${experience.description}`,
      metadata: {
        type: "experience",
        company: experience.company,
        position: experience.position,
      },
    })),

    //Education - create separate embeddings for each education
    ...portfolioData.education.map((education) => ({
      pageContent: `
                Institution: ${education.institution}
                Degree: ${education.degree}
                Graduation Year: ${education.graduation_year}
                Courses Taken: ${education.courses_taken.join(", ")}`,
      metadata: {
        type: "education",
        institution: education.institution,
        degree: education.degree,
      },
    })),

    //Technical Skills - create a single embedding for all technical skills
    {
      pageContent: `
                Languages: ${portfolioData.technical_skills.languages.join(
                  ", "
                )}
                Frameworks: ${portfolioData.technical_skills.frameworks.join(
                  ", "
                )}
                Libraries: ${portfolioData.technical_skills.libraries.join(
                  ", "
                )}`,
      metadata: {
        type: "technical_skills",
      },
    },
  ];

  //Storing the documents into the vector database
  await SupabaseVectorStore.fromDocuments(documents, embeddings, {
    client: supabase,
    tableName: "portfolio_embeddings",
    queryName: "match_documents",
    //Add meta data columns for better querying
    metadataColumns: [
      "type",
      "name",
      "stack",
      "company",
      "position",
      "institution",
      "degree",
    ],
  });
}

async function createMatchFunction(supabase) {
  const functionSQL = `
    create or replace function match_documents (
      query_embedding vector(1536),
      match_count int DEFAULT null,
      filter jsonb DEFAULT '{}'
    ) returns table (
      portfolio_id bigint,
      content text,
      metadata jsonb,
      embedding vector(1536),
      similarity float
    )
    language plpgsql
    as $$
    begin
      return query
      select
        pe.id as portfolio_id,
        pe.content,
        pe.metadata,
        pe.embedding,
        1 - (pe.embedding <=> query_embedding) as similarity
      from portfolio_embeddings pe
      where pe.metadata @> filter
      order by pe.embedding <=> query_embedding
      limit match_count;
    end;
    $$;
  `;

  await supabase.sql(functionSQL);
}

export async function searchEmbeddings(query) {
  try {
    const queryLower = query.toLowerCase();
    let filterType = null;

    if (queryLower.includes("project") || queryLower.includes("built")) {
      filterType = "project";
    } else if (
      queryLower.includes("work") ||
      queryLower.includes("experience")
    ) {
      filterType = "experience";
    } else if (
      queryLower.includes("education") ||
      queryLower.includes("study")
    ) {
      filterType = "education";
    } else if (queryLower.includes("skill") || queryLower.includes("tech")) {
      filterType = "technical_skills";
    }

    // Direct database query when filter type is known
    if (filterType) {
      const { data, error } = await supabase
        .from("portfolio_embeddings")
        .select("content, metadata")
        .eq("metadata->>type", filterType)
        .limit(10);

      if (error) throw error;

      return data.map((item) => ({
        pageContent: item.content,
        metadata: item.metadata,
      }));
    }

    // Fall back to vector similarity search for other queries
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "portfolio_embeddings",
      queryName: "match_documents",
    });

    return await vectorStore.similaritySearch(query, 4);
  } catch (error) {
    console.error("Error in searchEmbeddings:", error);
    throw error;
  }
}