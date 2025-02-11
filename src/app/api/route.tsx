import { NextRequest, NextResponse } from "next/server";
import { X2jOptions, XMLParser } from "fast-xml-parser";
import { z } from "zod";

export async function GET(request: NextRequest) {
   try {
      const ipv4 = z.string().ip();
      const ipAddress = ipv4.parse(request.nextUrl.searchParams.get("ipAddress"));

      // Request na zařízení
      const response = await fetch(`http://${ipAddress}/fresh.xml`, { signal: AbortSignal.timeout(4000) });

      if (!response.ok) {
         throw new Error("Zařízení nevrátilo odpověď");
      }

      // Z response vyčteme data v textové podobě
      const xmlData = await response.text();

      // Nastavíme parser tak aby správně načítal hodnoty
      const options: X2jOptions = {
         ignoreAttributes: false,
         attributeNamePrefix: "",
         ignorePiTags: true,
         allowBooleanAttributes: true,
      };

      const parser = new XMLParser(options);
      const result = parser.parse(xmlData);

      return NextResponse.json({ status: 200, message: `Data byla úšpělné načtená ze zařízení ${ipAddress}.`, data: result }, { status: 200 });
   } catch (e) {
      const error = e as Error;
      return NextResponse.json({ status: 400, message: error.message, data: e }, { status: 400 });
   }
}
