"use client";

import { Area, AreaChart, CartesianGrid, XAxis,YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
   desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
   },
} satisfies ChartConfig;

export enum dType {
   temperature = "temperature",
   pressure = "pressure",
   humidity = "humidity",
}


export function Chart({
   data,dataType
}: {
   data: {
      deviceId: number;
      deviceName: string;
      location: string;
      values: { time: string | undefined; temperature: string; humidity: string; pressure: string }[];
   },dataType:dType
}) {

   const units={
      temperature:"°C",
      humidity:"%",
      pressure:"°C"};

      const czDisplayName = {
         temperature: "Teplota",
         humidity: "Vlhkost",
         pressure: "Rosný bod",
      };


   return (
      <Card>
         <CardHeader>
            <CardTitle>{czDisplayName[dataType]}</CardTitle>
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
                     bottom: 12,
                  }}
               >
                  <CartesianGrid vertical={true} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={5} label={{ value: 'Datum a čas', position: 'insideBottom', offset: -5 }}/>
                  <YAxis domain={['dataMin-5', 'dataMax+5']}tickFormatter={(tick) => tick.toFixed(1)} allowDataOverflow={true} label={{ value: units[dataType], angle: 0, position: 'insideLeft' }}/>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Area dataKey={dataType} type="linear" fill="#00f0ff" fillOpacity={0.4} stroke="var(--color-desktop)"  />
               </AreaChart>
            </ChartContainer>
         </CardContent>
         
      </Card>
   );
}
