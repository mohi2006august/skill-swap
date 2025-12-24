
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { LayoutDashboard, Users, Link2, MessageSquare, User, LogOut } from 'lucide-react';
import { UserProfileAvatar } from '../user-profile-avatar';
import { users } from '@/lib/data';
import { Separator } from '../ui/separator';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/find-a-partner', label: 'Find a Partner', icon: Users },
  { href: '/connections', label: 'Connections', icon: Link2 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

export function AppSidebar() {
  const pathname = usePathname();
  const currentUser = users[0];

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">SkillSwap</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    as="a"
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
         <Separator className="my-2" />
         <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/profile" legacyBehavior passHref>
                <SidebarMenuButton as="a" isActive={pathname === '/profile'} tooltip={{children: 'Profile'}}>
                    <UserProfileAvatar src={currentUser.avatar} name={currentUser.name} className="w-6 h-6" />
                    <span>{currentUser.name}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip={{children: 'Log Out'}}>
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
