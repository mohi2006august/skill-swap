// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview AI-powered skill pairing suggestions flow.
 *
 * - skillPairingSuggestions - A function that provides AI-driven suggestions for potential study partners based on 'Have' and 'Want' skills.
 * - SkillPairingSuggestionsInput - The input type for the skillPairingSuggestions function.
 * - SkillPairingSuggestionsOutput - The return type for the skillPairingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillPairingSuggestionsInputSchema = z.object({
  haveSkills: z.array(z.string()).describe('List of skills the user possesses.'),
  wantSkills: z.array(z.string()).describe('List of skills the user wants to learn.'),
  userProfiles: z.array(z.object({
    userId: z.string().describe('Unique identifier for the user.'),
    haveSkills: z.array(z.string()).describe('List of skills the user possesses.'),
    wantSkills: z.array(z.string()).describe('List of skills the user wants to learn.'),
  })).describe('List of user profiles to find pair suggestions from.'),
});
export type SkillPairingSuggestionsInput = z.infer<typeof SkillPairingSuggestionsInputSchema>;

const SkillPairingSuggestionsOutputSchema = z.array(z.object({
  userId: z.string().describe('The user ID of the suggested study partner.'),
  reason: z.string().describe('Explanation of why this user is a good match.'),
}));
export type SkillPairingSuggestionsOutput = z.infer<typeof SkillPairingSuggestionsOutputSchema>;

export async function skillPairingSuggestions(input: SkillPairingSuggestionsInput): Promise<SkillPairingSuggestionsOutput> {
  return skillPairingSuggestionsFlow(input);
}

const skillPairingPrompt = ai.definePrompt({
  name: 'skillPairingPrompt',
  input: {schema: SkillPairingSuggestionsInputSchema},
  output: {schema: SkillPairingSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to suggest potential study partners based on their skills.

Given a user's "Have" skills and "Want" skills, analyze a list of other user profiles and suggest the best matches for study partners.

Consider these factors when making suggestions:

*   A good match is someone who possesses skills that the user wants to learn (i.e., their "Have" skills align with the user's "Want" skills).
*   A good match is also someone who wants to learn skills that the user possesses (i.e., their "Want" skills align with the user's "Have" skills).
*   Prioritize matches where there is a mutual exchange of skills possible.

User's Have Skills: {{haveSkills}}
User's Want Skills: {{wantSkills}}

User Profiles: {{userProfiles}}

For each suggested user, provide a brief explanation of why they would be a good match.

Output the suggestions as a JSON array of objects, each containing the userId and reason.
`, 
});

const skillPairingSuggestionsFlow = ai.defineFlow(
  {
    name: 'skillPairingSuggestionsFlow',
    inputSchema: SkillPairingSuggestionsInputSchema,
    outputSchema: SkillPairingSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await skillPairingPrompt(input);
    return output!;
  }
);
