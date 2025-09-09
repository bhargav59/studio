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
import {getTrendingRepositories} from '@/services/github';
import {z} from 'genkit';

const DiscoverTrendingToolsInputSchema = z.object({
  githubApiUrl: z
    .string()
    .describe('The GitHub API URL to monitor for trending repositories.'),
});
export type DiscoverTrendingToolsInput = z.infer<
  typeof DiscoverTrendingToolsInputSchema
>;

const ToolCategorySchema = z
  .enum([
    'CI/CD',
    'Monitoring',
    'Security',
    'Networking',
    'Database',
    'DevOps',
    'Cloud Engineering',
    'Testing',
    'Other',
  ])
  .describe('The category of the discovered tool.');

const DiscoverTrendingToolsOutputSchema = z.object({
  toolName: z.string().describe('The name of the discovered tool.'),
  toolDescription: z.string().describe('A brief description of the tool.'),
  toolCategory: ToolCategorySchema,
  githubUrl: z.string().describe('The GitHub URL of the tool.'),
  websiteUrl: z
    .string()
    .optional()
    .describe('The website URL of the tool, if available.'),
});
export type DiscoverTrendingToolsOutput = z.infer<
  typeof DiscoverTrendingToolsOutputSchema
>;

export async function discoverTrendingTools(
  input: DiscoverTrendingToolsInput
): Promise<DiscoverTrendingToolsOutput> {
  return discoverTrendingToolsFlow(input);
}

const discoverTrendingToolsPrompt = ai.definePrompt({
  name: 'discoverTrendingToolsPrompt',
  input: {
    schema: z.object({repositories: z.array(z.any())}),
  },
  output: {schema: DiscoverTrendingToolsOutputSchema},
  prompt: `You are an AI assistant specialized in discovering and categorizing cloud engineering and DevOps tools.

  Analyze the provided repository data from the GitHub API to identify ONE interesting, novel, or fast-growing tool.
  Based on the tool's description, website content, and GitHub repository information, determine its category and provide a concise description.

  Prioritize tools that are not yet mainstream and would be an interesting discovery for the user. Pick one from the following list.

  Repository Data:
  {{json repositories}}

  Provide the following information about the discovered tool you have chosen:
  - Tool Name:
  - Tool Description:
  - Tool Category (CI/CD, Monitoring, Security, Networking, Database, DevOps, Cloud Engineering, Testing, Other):
  - GitHub URL:
  - Website URL (if available from the repository data):
`,
});

const discoverTrendingToolsFlow = ai.defineFlow(
  {
    name: 'discoverTrendingToolsFlow',
    inputSchema: DiscoverTrendingToolsInputSchema,
    outputSchema: DiscoverTrendingToolsOutputSchema,
  },
  async input => {
    // Fetch the trending repositories from the GitHub API
    const repositories = await getTrendingRepositories(input.githubApiUrl);

    // Filter out some common repositories that are not tools
    const filteredRepositories = repositories.filter(
      repo =>
        !repo.name.toLowerCase().includes('awesome') &&
        !repo.name.toLowerCase().includes('book') &&
        !repo.name.toLowerCase().includes('course')
    );

    // Pass the repository data to the prompt
    const {output} = await discoverTrendingToolsPrompt({
      repositories: filteredRepositories.slice(0, 20), // Pass the top 20 repos
    });

    return output!;
  }
);
