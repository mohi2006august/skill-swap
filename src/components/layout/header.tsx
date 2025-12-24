
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserProfileAvatar } from '@/components/user-profile-avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { users } from '@/lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronsLeft, Menu } from 'lucide-react';

const getPageTitle = (path: string) => {
    if (path === '/') return 'Dashboard';
    const title = path.split('/')[1];
    return title.charAt(0).toUpperCase() + title.slice(1).replace('-', ' ');
}

export function Header() {
  const currentUser = users[0];
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
       <div className="md:hidden">
         <SidebarTrigger asChild>
           <Button variant="outline" size="icon">
             <Menu className="h-5 w-5" />
           </Button>
         </SidebarTrigger>
       </div>

      <div className="hidden md:block">
        <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
                <ChevronsLeft className="h-5 w-5" />
            </Button>
        </SidebarTrigger>
      </div>

      <h1 className="text-lg font-semibold flex-1">{getPageTitle(pathname)}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <UserProfileAvatar src={currentUser.avatar} name={currentUser.name} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{currentUser.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{currentUser.id}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">
                Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
