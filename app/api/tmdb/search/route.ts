import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

function tmdbHeaders() {
  const token = process.env.TMDB_ACCESS_TOKEN;
  if (!token) throw new Error("Missing TMDB_ACCESS_TOKEN in environment");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json;charset=utf-8",
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("query") || "").trim();

    if (!query) {
      return NextResponse.json({ results: [], error: "Please enter a search term." }, { status: 400 });
    }

    const url = new URL(`${TMDB_BASE}/search/movie`);
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("language", "en-US");
    url.searchParams.set("page", "1");

    const res = await fetch(url.toString(), { headers: tmdbHeaders() });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ results: [], error: `TMDB error (${res.status})`, details: text }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ results: data.results ?? [] });
  } catch (err: any) {
    return NextResponse.json({ results: [], error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
