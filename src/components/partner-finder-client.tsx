
'use client';

import { useState, useMemo } from 'react';
import type { User } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCard } from '@/components/user-card';
import { Search } from 'lucide-react';

type PartnerFinderClientProps = {
  users: User[];
  skills: string[];
};

export function PartnerFinderClient({ users, skills }: PartnerFinderClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [haveSkillFilter, setHaveSkillFilter] = useState('');
  const [wantSkillFilter, setWantSkillFilter] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const haveSkillMatch = haveSkillFilter ? user.haveSkills.includes(haveSkillFilter) : true;
      const wantSkillMatch = wantSkillFilter ? user.wantSkills.includes(wantSkillFilter) : true;
      return nameMatch && haveSkillMatch && wantSkillMatch;
    });
  }, [users, searchTerm, haveSkillFilter, wantSkillFilter]);

  return (
    <div className="space-y-8">
      <div className="p-4 border rounded-lg bg-card shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
             />
          </div>
          <Select value={haveSkillFilter} onValueChange={setHaveSkillFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by skill they have..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
              {skills.map(skill => (
                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={wantSkillFilter} onValueChange={setWantSkillFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by skill they want..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
              {skills.map(skill => (
                <SelectItem key={skill} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-semibold">No users found</p>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
