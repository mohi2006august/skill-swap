
import { users } from '@/lib/data';
import { SKILLS } from '@/lib/skills';
import { PartnerFinderClient } from '@/components/partner-finder-client';

export const metadata = {
  title: 'Find a Partner | SkillSwap',
};

export default function FindAPartnerPage() {
  const allUsers = users.slice(1); // Exclude current user from search
  const allSkills = SKILLS;

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Find a Partner</h1>
        <p className="text-muted-foreground">Browse and filter students to find your perfect study partner.</p>
      </div>
      <PartnerFinderClient users={allUsers} skills={allSkills} />
    </div>
  );
}
