
'use client';

import { useState, useEffect } from 'react';
import { getAiSuggestions } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileAvatar } from '@/components/user-profile-avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowRight, Lightbulb } from 'lucide-react';
import type { User } from '@/lib/data';
import Link from 'next/link';

type Suggestion = {
  userId: string;
  reason: string;
  user: User;
};

type DashboardClientProps = {
  currentUser: User;
  otherUsers: User[];
};

function SuggestionSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
}

export function DashboardClient({ currentUser }: DashboardClientProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setLoading(true);
        const result = await getAiSuggestions(currentUser.id);
        setSuggestions(result);
      } catch (e) {
        setError('Failed to fetch AI suggestions. Please try again later.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchSuggestions();
  }, [currentUser.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-primary" />
          <span>AI-Powered Partner Suggestions</span>
        </CardTitle>
        <CardDescription>
          Based on your skills, here are some peers you might want to connect with.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-6">
            <SuggestionSkeleton />
            <SuggestionSkeleton />
            <SuggestionSkeleton />
          </div>
        )}
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {!loading && !error && suggestions.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p>No suggestions available at the moment.</p>
            <p>Try adding more skills to your profile!</p>
          </div>
        )}
        {!loading && !error && suggestions.length > 0 && (
          <div className="space-y-6">
            {suggestions.map(({ userId, reason, user }) => (
              <div key={userId} className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <UserProfileAvatar src={user.avatar} name={user.name} className="h-12 w-12" />
                <div className="flex-1">
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">{reason}</p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/users/${user.id}`}>
                    View Profile <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
