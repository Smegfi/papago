"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
   desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
   },
} satisfies ChartConfig;

export function TempreatureChart({
   data,
}: {
   data: {
      deviceId: number;
      deviceName: string;
      location: string;
      values: { time: string | undefined; temperature: string; humidity: string; pressure: string }[];
   };
}) {
   return (
      <Card>
         <CardHeader>
            <CardTitle>{data.deviceName}</CardTitle>
            <CardDescription>{data.location}</CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <AreaChart
                  accessibilityLayer
                  data={data.values}
                  margin={{
                     left: 12,
                     right: 12,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Area dataKey="temperature" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
               </AreaChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
