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
  review: z.string().describe('A comprehensive, well-structured technical review of the tool in Markdown format.'),
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
  prompt: `You are an expert technical writer and analyst specializing in cloud engineering and DevOps tools. Your task is to write a comprehensive, in-depth technical article reviewing the following tool.

Tool Name: {{{name}}}
Description: {{{description}}}
Website URL: {{{website_url}}}
GitHub URL: {{{github_url}}}

The article must be well-structured, written in Markdown, and provide deep insights for a technical audience (Cloud Engineers, DevOps Specialists, Solutions Architects).

Please structure the article with the following sections, using Markdown headings:

# What is {{{name}}}?
- Provide a clear, concise definition of the tool.
- Explain its primary purpose and the problem it solves.
- Mention its creator or key maintainers if relevant (e.g., HashiCorp for Terraform).

# How does {{{name}}} work?
- Describe the core workflow or operational process of the tool.
- Explain its underlying principles (e.g., declarative vs. procedural, agent vs. agentless).
- Use a simple example to illustrate the process.

# Key Components of {{{name}}}
- Detail the main architectural components, features, or concepts of the tool.
- For example, for Terraform, this would include configuration files, state files, providers, and modules. For a CI/CD tool, it might be pipelines, jobs, runners, and artifacts.

# How do organizations use {{{name}}}?
- Describe common, real-world use cases.
- Examples: managing multi-cloud environments, application infrastructure management, self-service infrastructure, policy and compliance.

# {{{name}}} vs. [A Major Competitor/Alternative]
- Choose ONE major competitor or alternative tool (e.g., Terraform vs. Pulumi, Jenkins vs. GitHub Actions, Prometheus vs. Datadog).
- Provide a balanced comparison, highlighting the key differences in philosophy, features, and use cases.

# Conclusion
- Summarize the key strengths and weaknesses of {{{name}}}.
- Provide a final verdict on who the tool is best for and why it's a valuable addition to a tech stack.

The entire output must be a single Markdown string.`,
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
