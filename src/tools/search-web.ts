import { createTool } from "@anvia/core";
import z from "zod";
import { tavily } from "@tavily/core";
import "dotenv/config";

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const searchWeb = createTool({
  name: "searchWeb",
  description: 
    "Search the web for information about techniques for handling imbalanced data in machine learning. " +
    "Returns a JSON array of results, each with title, url, and content. " +
    "An empty array means nothing was found.",
  inputSchema: z.object({
    query: z.
        string()
        .describe("Search keywords, e.g. 'SMOTE oversampling imbalanced data'"),
  }),
  execute: async ({ query }) => {
    try {
      const res = await tavilyClient.search(query, { maxResults: 5 });
      const results = res.results.map((r) => ({
        title: r.title,
        url: r.url,
        content: r.content,
      }));
      return JSON.stringify(results);
    } catch (error) {
      return JSON.stringify({
        error: `Search failed: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  },
});