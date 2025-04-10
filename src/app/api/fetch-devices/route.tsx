import { NextResponse } from "next/server";
import { fetchAllDevicesAction } from "@/server/actions";

export async function GET() {
   try {
      const result = await fetchAllDevicesAction();
      if (result?.data) {
         return NextResponse.json({ message: `Data načtená ze všech zařízení`, devices: result.data }, { status: 200 });
      }
   } catch (e) {
      const error = e as Error;
      return NextResponse.json({ message: error.message, data: e }, { status: 400 });
   }
}
