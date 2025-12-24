
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileAvatar } from '@/components/user-profile-avatar';
import { connections, users, currentUser, Connection } from '@/lib/data';
import { Check, X, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ConnectionsPage() {
    const { toast } = useToast();
    const [mockConnections, setMockConnections] = useState(connections);

    const received = mockConnections.filter(c => c.toUserId === currentUser.id && c.status === 'pending');
    const sent = mockConnections.filter(c => c.fromUserId === currentUser.id && c.status === 'pending');
    const partners = mockConnections.filter(c => (c.fromUserId === currentUser.id || c.toUserId === currentUser.id) && c.status === 'accepted');

    const handleRequest = (connectionId: string, newStatus: 'accepted' | 'declined') => {
        setMockConnections(prev => prev.map(c => c.id === connectionId ? {...c, status: newStatus} : c));
        const user = users.find(u => u.id === mockConnections.find(c => c.id === connectionId)?.fromUserId);
        toast({
            title: `Request ${newStatus}`,
            description: `You have ${newStatus} the connection request from ${user?.name}.`
        })
    };
    
    const ConnectionList = ({ connList, type }: { connList: Connection[], type: 'received' | 'sent' | 'partners' }) => {
        if (connList.length === 0) {
            return <p className="text-muted-foreground text-center py-8">No connections here.</p>;
        }

        return (
            <div className="space-y-4">
                {connList.map(conn => {
                    const otherUserId = type === 'sent' ? conn.toUserId : conn.fromUserId;
                    const partnerId = conn.fromUserId === currentUser.id ? conn.toUserId : conn.fromUserId;
                    const user = users.find(u => u.id === (type === 'partners' ? partnerId : otherUserId));

                    if (!user) return null;

                    return (
                        <div key={conn.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                            <UserProfileAvatar src={user.avatar} name={user.name} />
                            <div className="flex-1">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.id}</p>
                            </div>
                            {type === 'received' && (
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="text-green-600 hover:text-green-600" onClick={() => handleRequest(conn.id, 'accepted')}>
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="text-red-600 hover:text-red-600" onClick={() => handleRequest(conn.id, 'declined')}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            {type === 'sent' && <Badge variant="outline">Pending</Badge>}
                             {type === 'partners' && (
                                <div className="flex gap-2">
                                    <Button asChild variant="outline" size="sm">
                                      <Link href={`/users/${user.id}`}>
                                        View Profile <ArrowRight className="ml-2 h-4 w-4" />
                                      </Link>
                                    </Button>
                                    <Button asChild size="sm">
                                      <Link href="/messages">
                                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                                      </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connections</h1>
        <p className="text-muted-foreground">Manage your study partner connection requests.</p>
      </div>
      <Tabs defaultValue="partners">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="partners">My Partners ({partners.length})</TabsTrigger>
          <TabsTrigger value="received">Received ({received.length})</TabsTrigger>
          <TabsTrigger value="sent">Sent ({sent.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="partners">
          <Card>
            <CardContent className="p-6">
                <ConnectionList connList={partners} type="partners" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="received">
          <Card>
            <CardContent className="p-6">
                <ConnectionList connList={received} type="received" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sent">
          <Card>
            <CardContent className="p-6">
                <ConnectionList connList={sent} type="sent" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
// This is a dummy component. In a real app, this would be a proper badge.
const Badge = ({ children, variant }: { children: React.ReactNode, variant: string }) => (
    <span className="text-xs font-semibold inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline rounded-full bg-secondary text-secondary-foreground">
        {children}
    </span>
)
