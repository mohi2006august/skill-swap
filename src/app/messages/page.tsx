
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { UserProfileAvatar } from '@/components/user-profile-avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { users, messages as initialMessages, currentUser } from '@/lib/data';
import type { Message, User } from '@/lib/data';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesPage() {
  const conversations = Array.from(new Set(initialMessages.map(m => m.conversationId)))
    .map(convoId => {
      const otherUserId = convoId.replace(currentUser.id, '').replace('_', '');
      const otherUser = users.find(u => u.id === otherUserId);
      const lastMessage = initialMessages.filter(m => m.conversationId === convoId).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
      return { id: convoId, user: otherUser, lastMessage };
    })
    .filter(c => c.user);

  const [activeConversation, setActiveConversation] = useState<string | null>(conversations[0]?.id || null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const activeMessages = messages.filter(m => m.conversationId === activeConversation).sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime());
  const activePartner = conversations.find(c => c.id === activeConversation)?.user;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const otherUserId = activeConversation.replace(currentUser.id, '').replace('_', '');

    const message: Message = {
      id: `msg${Date.now()}`,
      conversationId: activeConversation,
      senderId: currentUser.id,
      receiverId: otherUserId,
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-10rem)]">
         <Card className="h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            <div className="lg:col-span-1 md:col-span-1 border-r flex flex-col">
                <div className="p-4 border-b">
                     <h2 className="text-xl font-bold tracking-tight">Messages</h2>
                     <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search conversations..." className="pl-10" />
                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-1">
                    {conversations.map(({ id, user, lastMessage }) => user && (
                        <button key={id} onClick={() => setActiveConversation(id)} className={cn("w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-accent transition-colors", activeConversation === id && "bg-accent")}>
                            <UserProfileAvatar src={user.avatar} name={user.name} />
                            <div className="flex-1 truncate">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{lastMessage?.text}</p>
                            </div>
                        </button>
                    ))}
                    </div>
                </ScrollArea>
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
                {activePartner ? (
                    <>
                    <div className="p-4 border-b flex items-center gap-3">
                         <UserProfileAvatar src={activePartner.avatar} name={activePartner.name} />
                         <div>
                            <p className="font-semibold">{activePartner.name}</p>
                            <p className="text-sm text-muted-foreground">Online</p>
                         </div>
                    </div>
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                        {activeMessages.map(msg => (
                            <div key={msg.id} className={cn("flex items-end gap-2", msg.senderId === currentUser.id && "justify-end")}>
                                {msg.senderId !== currentUser.id && <UserProfileAvatar src={activePartner.avatar} name={activePartner.name} className="w-8 h-8"/>}
                                <div className={cn("max-w-xs md:max-w-md p-3 rounded-2xl", msg.senderId === currentUser.id ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none")}>
                                    <p className="text-sm">{msg.text}</p>
                                    <p className={cn("text-xs mt-1", msg.senderId === currentUser.id ? "text-primary-foreground/70": "text-muted-foreground/70")}>{formatDistanceToNow(msg.timestamp, { addSuffix: true })}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </ScrollArea>
                    <div className="p-4 border-t bg-background">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <Input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" />
                            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-muted-foreground">
                        <p>Select a conversation to start chatting.</p>
                    </div>
                )}
            </div>
        </Card>
    </div>
  );
}
