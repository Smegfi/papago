"use client";

import { type LucideIcon } from "lucide-react";

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
   items,
}: {
   items: {
      title: string;
      url: string;
      icon: LucideIcon;
   }[];
}) {
   return (
      <SidebarGroup>
         <SidebarGroupLabel>Menu</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => (
               <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild size="default">
                     <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   );
}
