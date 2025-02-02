"use client";

import * as React from "react";
import { Settings2, SquareTerminal, ThermometerSnowflake, ThermometerSun } from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const data = {
   user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
   },
   navMain: [
      {
         title: "Dashboard",
         url: "/",
         icon: SquareTerminal,
         isActive: true,
         items: [
            {
               title: "Všechna data",
               url: "#",
            },
            {
               title: "Export",
               url: "#",
            },
         ],
      },
      {
         title: "Teploměry",
         url: "/device",
         icon: ThermometerSnowflake,
         items: [
            {
               title: "Zobrazit všechny",
               url: "#",
            },
            {
               title: "Přidat nový",
               url: "#",
            },
         ],
      },
      {
         title: "Nastavení",
         url: "#",
         icon: Settings2,
         badge: "TODO",
         badgeColor: "bg-red-500",
         items: [
            {
               title: "General",
               url: "#",
            },
            {
               title: "Team",
               url: "#",
            },
            {
               title: "Billing",
               url: "#",
            },
            {
               title: "Limits",
               url: "#",
            },
         ],
      },
   ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
      <Sidebar variant="inset" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                     <a href="#">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-sidebar-primary-foreground">
                           <ThermometerSun className="size-5" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">Praha 10</span>
                           <span className="truncate text-xs">papago teploměry</span>
                        </div>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user} />
         </SidebarFooter>
      </Sidebar>
   );
}
