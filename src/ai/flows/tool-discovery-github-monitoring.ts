'use server';
/**
 * @fileOverview This flow monitors GitHub repositories to discover trending cloud engineering and DevOps tools,
 * and automatically categorize them by type and use case using web scraping and AI-driven analysis of documentation and website content.
 *
 * - discoverTrendingTools - A function that initiates the discovery process.
 * - DiscoverTrendingToolsInput - The input type for the discoverTrendingTools function.
 * - DiscoverTrendingToolsOutput - The return type for the discoverTrendingTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscoverTrendingToolsInputSchema = z.object({
  githubApiUrl: z.string().describe('The GitHub API URL to monitor for trending repositories.'),
});
export type DiscoverTrendingToolsInput = z.infer<typeof DiscoverTrendingToolsInputSchema>;

const ToolCategorySchema = z.enum([
  'CI/CD', 'Monitoring', 'Security', 'Networking', 'Database', 'DevOps', 'Cloud Engineering', 'Testing', 'Other'
]).describe('The category of the discovered tool.');

const DiscoverTrendingToolsOutputSchema = z.object({
  toolName: z.string().describe('The name of the discovered tool.'),
  toolDescription: z.string().describe('A brief description of the tool.'),
  toolCategory: ToolCategorySchema,
  githubUrl: z.string().describe('The GitHub URL of the tool.'),
  websiteUrl: z.string().optional().describe('The website URL of the tool, if available.'),
});
export type DiscoverTrendingToolsOutput = z.infer<typeof DiscoverTrendingToolsOutputSchema>;

export async function discoverTrendingTools(input: DiscoverTrendingToolsInput): Promise<DiscoverTrendingToolsOutput> {
  return discoverTrendingToolsFlow(input);
}

const discoverTrendingToolsPrompt = ai.definePrompt({
  name: 'discoverTrendingToolsPrompt',
  input: {schema: DiscoverTrendingToolsInputSchema},
  output: {schema: DiscoverTrendingToolsOutputSchema},
  prompt: `You are an AI assistant specialized in discovering and categorizing cloud engineering and DevOps tools.

  Analyze the provided information from the GitHub API to identify trending tools and their relevant details.
  Based on the tool's description, website content, and GitHub repository information, determine its category and provide a concise description.

  GitHub API URL: {{{githubApiUrl}}}

  Provide the following information about the discovered tool:
  - Tool Name:
  - Tool Description:
  - Tool Category (CI/CD, Monitoring, Security, Networking, Database, DevOps, Cloud Engineering, Testing, Other):
  - GitHub URL:
  - Website URL (if available):
`,
});

const discoverTrendingToolsFlow = ai.defineFlow(
  {
    name: 'discoverTrendingToolsFlow',
    inputSchema: DiscoverTrendingToolsInputSchema,
    outputSchema: DiscoverTrendingToolsOutputSchema,
  },
  async input => {
    const {output} = await discoverTrendingToolsPrompt(input);
    return output!;
  }
);
