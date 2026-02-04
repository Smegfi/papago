"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"


import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  
  ...props
}: CalendarProps) {
  return (
    <DayPicker
    hideWeekdays
      
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
    
        

        nav: "space-x-1 flex items-center",
       
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",

       
        
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
       
        
        

        
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeft
                className={cn("h-4 w-4", className)}
                {...props}
              />
            )
          }
          return (
            <ChevronRight
              className={cn("h-4 w-4", className)}
              {...props}
            />
          )
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
