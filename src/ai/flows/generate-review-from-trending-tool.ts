'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a tool review from a trending tool.
 *
 * This flow discovers a trending tool from GitHub and then uses its details to generate a comprehensive review.
 *
 * @exports {generateReviewFromTrendingTool} - The main function to trigger the review generation flow.
 * @exports {GenerateReviewFromTrendingToolInput} - The input type for the generateReviewFromTrendingTool function.
 * @exports {GenerateReviewFromTrendingToolOutput} - The output type for the generateReviewFromTrendingTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {discoverTrendingTools, type DiscoverTrendingToolsOutput} from './tool-discovery-github-monitoring';
import {generateToolReview, type GenerateToolReviewOutput} from './automated-tool-review-generation';

// Input schema for the review generation flow
const GenerateReviewFromTrendingToolInputSchema = z.object({
  githubApiUrl: z.string().url().describe('The GitHub API URL to search for trending repositories.'),
});

export type GenerateReviewFromTrendingToolInput = z.infer<typeof GenerateReviewFromTrendingToolInputSchema>;

// Output schema for the review generation flow
const GenerateReviewFromTrendingToolOutputSchema = z.object({
  tool: z.object({
    toolName: z.string(),
    toolDescription: z.string(),
    toolCategory: z.string(),
    githubUrl: z.string(),
    websiteUrl: z.string().optional(),
  }),
  review: z.object({
    review: z.string(),
  }),
});

export type GenerateReviewFromTrendingToolOutput = z.infer<typeof GenerateReviewFromTrendingToolOutputSchema>;

/**
 * Main function to trigger the review generation flow.
 * @param input - The input data for the review generation.
 * @returns A promise that resolves to the discovered tool and its generated review.
 */
export async function generateReviewFromTrendingTool(
  input: GenerateReviewFromTrendingToolInput
): Promise<GenerateReviewFromTrendingToolOutput> {
  return generateReviewFromTrendingToolFlow(input);
}

// Flow definition for generating a review from a trending tool
const generateReviewFromTrendingToolFlow = ai.defineFlow(
  {
    name: 'generateReviewFromTrendingToolFlow',
    inputSchema: GenerateReviewFromTrendingToolInputSchema,
    outputSchema: GenerateReviewFromTrendingToolOutputSchema,
  },
  async input => {
    // Step 1: Discover a trending tool
    const trendingTool: DiscoverTrendingToolsOutput = await discoverTrendingTools({ githubApiUrl: input.githubApiUrl });

    // Step 2: Generate a review for the discovered tool
    const review: GenerateToolReviewOutput = await generateToolReview({
        name: trendingTool.toolName,
        description: trendingTool.toolDescription,
        website_url: trendingTool.websiteUrl || 'https://github.com', // Provide a fallback URL
        github_url: trendingTool.githubUrl,
    });

    return {
        tool: trendingTool,
        review: review,
    };
  }
);
