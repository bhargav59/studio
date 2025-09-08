'use server';

/**
 * @fileOverview This file defines a Genkit flow for automated tool review generation.
 *
 * The flow takes tool data (name, description, website_url, github_url) as input and generates a comprehensive review using AI.
 * The review includes an overview of the tool's capabilities and features.
 *
 * @exports {generateToolReview} - The main function to trigger the tool review generation flow.
 * @exports {GenerateToolReviewInput} - The input type for the generateToolReview function.
 * @exports {GenerateToolReviewOutput} - The output type for the generateToolReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the tool review generation flow
const GenerateToolReviewInputSchema = z.object({
  name: z.string().describe('The name of the tool.'),
  description: z.string().describe('A brief description of the tool.'),
  website_url: z.string().url().describe('The URL of the tool\u2019s website.'),
  github_url: z.string().url().describe('The URL of the tool\u2019s GitHub repository.'),
});

export type GenerateToolReviewInput = z.infer<typeof GenerateToolReviewInputSchema>;

// Output schema for the tool review generation flow
const GenerateToolReviewOutputSchema = z.object({
  review: z.string().describe('A comprehensive review of the tool.'),
});

export type GenerateToolReviewOutput = z.infer<typeof GenerateToolReviewOutputSchema>;

/**
 * Main function to trigger the tool review generation flow.
 * @param input - The input data for the tool review generation.
 * @returns A promise that resolves to the generated tool review.
 */
export async function generateToolReview(input: GenerateToolReviewInput): Promise<GenerateToolReviewOutput> {
  return automatedToolReviewGenerationFlow(input);
}

// Prompt definition for generating the tool review
const automatedToolReviewPrompt = ai.definePrompt({
  name: 'automatedToolReviewPrompt',
  input: {schema: GenerateToolReviewInputSchema},
  output: {schema: GenerateToolReviewOutputSchema},
  prompt: `You are an expert cloud engineering and DevOps tool reviewer. Generate a comprehensive review for the following tool, based on the provided information. The review should cover the tool's capabilities, features, use cases, and potential benefits. Focus on providing value to cloud engineers, DevOps professionals, and technical decision-makers.

Tool Name: {{{name}}}
Description: {{{description}}}
Website URL: {{{website_url}}}
GitHub URL: {{{github_url}}}

Review:`,
});

// Flow definition for automated tool review generation
const automatedToolReviewGenerationFlow = ai.defineFlow(
  {
    name: 'automatedToolReviewGenerationFlow',
    inputSchema: GenerateToolReviewInputSchema,
    outputSchema: GenerateToolReviewOutputSchema,
  },
  async input => {
    const {output} = await automatedToolReviewPrompt(input);
    return output!;
  }
);
