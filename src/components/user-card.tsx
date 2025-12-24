
import Link from 'next/link';
import type { User } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileAvatar } from './user-profile-avatar';
import { SkillTags } from './skill-tags';
import { ArrowRight, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserCard({ user }: { user: User }) {
    const { toast } = useToast();

    const handleConnect = () => {
        toast({
            title: "Connection Request Sent!",
            description: `Your request to connect with ${user.name} has been sent.`,
        });
    }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <UserProfileAvatar src={user.avatar} name={user.name} className="w-12 h-12" />
        <div className="flex-1">
          <CardTitle className="text-lg">{user.name}</CardTitle>
          <CardDescription>{user.id}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Has Skills</h4>
          <SkillTags skills={user.haveSkills} limit={3} variant="secondary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Wants Skills</h4>
          <SkillTags skills={user.wantSkills} limit={3} variant="outline" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleConnect} className="flex-1">
            <UserPlus className="mr-2 h-4 w-4" />
            Connect
        </Button>
        <Button asChild variant="ghost" className="flex-1">
          <Link href={`/users/${user.id}`}>
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
