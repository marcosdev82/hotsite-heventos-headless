import { NextRequest, NextResponse } from "next/server";
import { searchContent } from "@/services/content.service";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query?.trim()) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchContent(query);
    return NextResponse.json({ results: data.contentNodes.nodes });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
