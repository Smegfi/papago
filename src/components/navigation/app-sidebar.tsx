"use client";

import * as React from "react";
import { ChartArea, Settings2, ThermometerSnowflake, ThermometerSun } from "lucide-react";

import { NavMain } from "@/components/navigation/nav-main";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
   
   navMain: [
      {
         title: "Zařízení",
         url: "/device",
         icon: ThermometerSnowflake,
      },
      {
         title: "Měření",
         url: "/measuring",
         icon: ChartArea,
      },
      {
         title: "Nastavení",
         url: "/settings",
         icon: Settings2,
         badge: "TODO",
         badgeColor: "bg-red-500",
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
                     <Link href="/">
                        <div className="flex aspect-square size-8 items-center justify-center">
                           <ThermometerSun className="size-5" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">Praha 10</span>
                           <span className="truncate text-xs">papago teploměry</span>
                        </div>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
         </SidebarContent>
         <SidebarFooter>
           
         </SidebarFooter>
      </Sidebar>
   );
}
