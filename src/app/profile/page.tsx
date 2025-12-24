
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfileAvatar } from '@/components/user-profile-avatar';
import { currentUser, users } from '@/lib/data';
import { SKILLS } from '@/lib/skills';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SkillTags } from '@/components/skill-tags';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  haveSkills: z.array(z.string()).min(1, 'Please select at least one skill you have.'),
  wantSkills: z.array(z.string()).min(1, 'Please select at least one skill you want to learn.'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const [user, setUser] = useState(currentUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      haveSkills: user.haveSkills,
      wantSkills: user.wantSkills,
    },
  });

  const { watch } = form;
  const watchedHaveSkills = watch('haveSkills');
  const watchedWantSkills = watch('wantSkills');

  const onSubmit = (data: ProfileFormValues) => {
    setUser(prev => ({ ...prev, ...data }));
    // In a real app, you would find and update the user in the main users array/DB
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data };
    }
    
    toast({
      title: 'Profile Updated',
      description: 'Your changes have been saved successfully.',
    });
  };

  const SkillSelector = ({ field, title }: { field: any; title: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {field.value?.length > 0 ? `${field.value.length} skills selected` : `Select ${title}`}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <ScrollArea className="h-72">
          <div className="p-4 space-y-2">
            {SKILLS.map(skill => (
              <FormField
                key={skill}
                control={form.control}
                name={field.name}
                render={({ field: innerField }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={innerField.value?.includes(skill)}
                        onCheckedChange={checked => {
                          return checked
                            ? innerField.onChange([...innerField.value, skill])
                            : innerField.onChange(innerField.value?.filter(value => value !== skill));
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{skill}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and edit your personal information and skills.</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <UserProfileAvatar src={user.avatar} name={user.name} className="w-20 h-20 text-2xl" />
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Upload className="h-4 w-4" />
                        </Button>
                    </div>
                    <div>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Make changes to your profile here. Click save when you're done.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="haveSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills You Have</FormLabel>
                      <SkillSelector field={field} title="your skills" />
                      <FormMessage />
                      <div className="pt-2">
                        <SkillTags skills={watchedHaveSkills} variant="secondary" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wantSkills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills You Want</FormLabel>
                      <SkillSelector field={field} title="desired skills" />
                      <FormMessage />
                      <div className="pt-2">
                         <SkillTags skills={watchedWantSkills} variant="outline" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
