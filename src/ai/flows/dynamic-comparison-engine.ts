'use server';

/**
 * @fileOverview Generates a dynamic comparison table for cloud engineering and DevOps tools.
 *
 * - generateComparisonTable - A function that generates the comparison table.
 * - GenerateComparisonTableInput - The input type for the generateComparisonTable function.
 * - GenerateComparisonTableOutput - The return type for the generateComparisonTable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateComparisonTableInputSchema = z.object({
  tools: z
    .array(z.string())
    .describe('A list of tool names to compare.'),
  features: z
    .array(z.string())
    .describe('A list of features to compare the tools on.'),
});
export type GenerateComparisonTableInput = z.infer<
  typeof GenerateComparisonTableInputSchema
>;

const GenerateComparisonTableOutputSchema = z.object({
  comparisonTable: z.string().describe('A markdown table comparing the tools.'),
  summary: z.string().describe('A summary of the comparison.'),
  winner: z.string().describe('The winning tool.'),
});
export type GenerateComparisonTableOutput = z.infer<
  typeof GenerateComparisonTableOutputSchema
>;

export async function generateComparisonTable(
  input: GenerateComparisonTableInput
): Promise<GenerateComparisonTableOutput> {
  return generateComparisonTableFlow(input);
}

const comparisonPrompt = ai.definePrompt({
  name: 'comparisonPrompt',
  input: {schema: GenerateComparisonTableInputSchema},
  output: {schema: GenerateComparisonTableOutputSchema},
  prompt: `You are an expert cloud engineering and DevOps consultant.

You will generate a comparison table for the following tools:

Tools: {{tools}}

Features: {{features}}

Generate a markdown table comparing the tools on the features. Provide a score from 1-5 for each tool on each feature. Provide a summary of the comparison, and identify the winning tool.

Comparison Table:

Summary:

Winner:
`,
});

const generateComparisonTableFlow = ai.defineFlow(
  {
    name: 'generateComparisonTableFlow',
    inputSchema: GenerateComparisonTableInputSchema,
    outputSchema: GenerateComparisonTableOutputSchema,
  },
  async input => {
    const {output} = await comparisonPrompt(input);
    return output!;
  }
);
