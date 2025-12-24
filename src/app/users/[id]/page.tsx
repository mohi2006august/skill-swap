
import { users } from '@/lib/data';
import { notFound } from 'next/navigation';
import { UserProfileAvatar } from '@/components/user-profile-avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, MessageSquare } from 'lucide-react';
import { SkillTags } from '@/components/skill-tags';
import Link from 'next/link';

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: UserProfilePageProps) {
    const user = users.find(u => u.id === params.id);
    if (!user) {
        return { title: 'User Not Found | SkillSwap' };
    }
    return { title: `${user.name} | SkillSwap` };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  // The user ID is URL encoded, so we need to decode it.
  const userId = decodeURIComponent(params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <UserProfileAvatar src={user.avatar} name={user.name} className="w-24 h-24 text-3xl" />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.id}</p>
          <div className="mt-4 flex gap-2 justify-center sm:justify-start">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Send Connection Request
            </Button>
            <Button variant="secondary" asChild>
                <Link href="/messages">
                    <><MessageSquare className="mr-2 h-4 w-4" />
                    Message</>
                </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Has Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillTags skills={user.haveSkills} variant="secondary" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wants to Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillTags skills={user.wantSkills} variant="outline" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
