import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { users, type User } from "@/lib/data";
import { DashboardClient } from '@/components/dashboard-client';

export default function DashboardPage() {
  const currentUser = users[0];
  const otherUsers = users.slice(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name}!</h1>
        <p className="text-muted-foreground">Here's your skill-swapping dashboard.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Skills</CardTitle>
            <CardDescription>The skills you have and the skills you want.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">You Have:</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.haveSkills.map(skill => (
                  <div key={skill} className="bg-primary/20 text-primary-foreground-dark py-1 px-3 rounded-full text-sm font-medium">{skill}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">You Want:</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.wantSkills.map(skill => (
                  <div key={skill} className="bg-accent/30 text-accent-foreground-dark py-1 px-3 rounded-full text-sm font-medium">{skill}</div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DashboardClient currentUser={currentUser} otherUsers={otherUsers} />
    </div>
  );
}
