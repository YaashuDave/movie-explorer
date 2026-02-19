import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

function tmdbHeaders() {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Missing TMDB_ACCESS_TOKEN in environment");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json;charset=utf-8",
  };
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const url = `${TMDB_BASE}/movie/${encodeURIComponent(
      id
    )}?language=en-US`;

    const res = await fetch(url, {
      headers: tmdbHeaders(),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `TMDB error (${res.status})`, details: text },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
