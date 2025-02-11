import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
   try {
      const response = await axios.get("http://10.41.250.13/fresh.xml");
      return NextResponse.json(response.data);
   } catch (e) {
      return NextResponse.json({ message: e.message }, { status: 200 });
   }
}
