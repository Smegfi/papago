"use client";

import { useState, useEffect } from "react";
import { cs,} from "date-fns/locale";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import DeviceSelection from "@/components/navigation/device-selection";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export function SidebarRight({
  actionExecution,
  children,
}: {
  actionExecution: (input: { deviceName: string; from: Date; to: Date }) => void;
  children: React.ReactNode;
}) {
  const now = new Date();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    to: now,
  });

  const [device, setDevice] = useState<string>("");

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      actionExecution({
        deviceName: device,
        from: dateRange.from,
        to: dateRange.to,
      });
    }
  }, [device, dateRange, actionExecution]);

  return (
    <Sidebar collapsible="none" className=" overflow hidden sticky hidden lg:flex top-0 h-svh border-l">
      <SidebarContent>

        {/* ----- DATE RANGE PICKER ----- */}
        <Field className="mx-auto w-full mt-4 ">
          <FieldLabel className="mx-1" htmlFor="date-picker-range">Výběr období</FieldLabel>
 
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker-range"
                className="justify-start px-2.5 font-normal w-full"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {dateRange.from.toLocaleDateString("cs-CZ")} –{" "}
                      {dateRange.to.toLocaleDateString("cs-CZ")}
                    </>
                  ) : (
                    dateRange.from.toLocaleDateString("cs-CZ")
                  )
                ) : (
                  <span>Vyber datum</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                locale={cs}
                numberOfMonths={2}
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range); // nastaví rozsah, spustí useEffect
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>

        {/* zařízení */}
        <DeviceSelection selectedDeviceChange={setDevice} />

        {children}
      </SidebarContent>
    </Sidebar>
  );
}