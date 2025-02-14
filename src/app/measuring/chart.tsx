"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { set, z } from "zod";
import { M_PLUS_1 } from "next/font/google";

const chartConfig = {
   temp: {
      label: "Teplota",
      color: "hsl(var(--chart-3))",
   },
   humidity: {
      label: "Vlhkost",
      color: "hsl(var(--chart-4))",
   },
} satisfies ChartConfig;

export type ChartDataType = {
   id: number;
   minute: number;
   temp: string;
   humidity: string;
};

let id = 1;

export default function ChartsComponents() {
   const [chartData, setChartData] = useState<ChartDataType[]>([]);

   useEffect(() => {
      const interval = setInterval(() => {
         fetch("/api?ipAddress=10.41.250.13")
            .then((result) => {
               if (!result.ok) {
                  throw new Error("Nebylo možné načíst data");
               }
               return result.json();
            })
            .then((data) => {
               const datetime = new Date(data.data.root.status.time);

               const value: ChartDataType = {
                  id: id++,
                  minute: datetime.getMinutes(),
                  temp: data.data.root.sns.val,
                  humidity: data.data.root.sns.val2,
               };
               setChartData([...chartData, value]);
               console.log(value);
            })
            .catch((err) => {
               console.log(err);
            });
      }, 3000);

      return () => {
         clearInterval(interval);
      };
   }, []);

   return (
      <Card>
         <CardHeader>
            <CardTitle>Teplota v průběhu dne</CardTitle>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <AreaChart
                  accessibilityLayer
                  data={chartData}
                  dataKey={id}
                  margin={{
                     left: 12,
                     right: 12,
                  }}
               >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="minute" tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area dataKey="temp" fill="var(--color-temp)" fillOpacity={0.4} stroke="var(--color-temp)" stackId="a" />
                  <Area dataKey="humidity" fill="var(--color-humidity)" fillOpacity={0.4} stroke="var(--color-humidity)" stackId="a" />
               </AreaChart>
            </ChartContainer>
         </CardContent>
      </Card>
   );
}
