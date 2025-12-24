
'use server';

import { skillPairingSuggestions } from '@/ai/flows/ai-skill-pairing-suggestions';
import { users } from '@/lib/data';
import type { User } from '@/lib/data';

export async function getAiSuggestions(currentUserId: string) {
  try {
    const currentUser = users.find(u => u.id === currentUserId);
    const otherUsers = users.filter(u => u.id !== currentUserId);

    if (!currentUser) {
      throw new Error('Current user not found');
    }

    const suggestions = await skillPairingSuggestions({
      haveSkills: currentUser.haveSkills,
      wantSkills: currentUser.wantSkills,
      userProfiles: otherUsers.map(u => ({
        userId: u.id,
        haveSkills: u.haveSkills,
        wantSkills: u.wantSkills,
      })),
    });

    const enrichedSuggestions = suggestions
      .map(suggestion => {
        const user = users.find(u => u.id === suggestion.userId);
        if (!user) return null;
        return {
          ...suggestion,
          user,
        };
      })
      .filter(Boolean) as ({ reason: string; userId: string; user: User })[];

    return enrichedSuggestions;
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    // In a real app, you might want to return a more specific error message.
    return [];
  }
}
