"use client";

import React, { useMemo, useState } from "react";
import { MovieCard } from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  async function runSearch(q: string) {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/tmdb/search?query=${encodeURIComponent(q.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Search failed.");
        setResults([]);
        return;
      }

      setResults(data?.results ?? []);
      if ((data?.results ?? []).length === 0) {
        setError("No results found.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h1 style={{ margin: 0, color: "var(--foreground)" }}>Search</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = query.trim();
          setSubmitted(q);

          if (q.length < 2) {
            setError("Please type at least 2 characters.");
            setResults([]);
            return;
          }

          runSearch(q);
        }}
        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title (e.g., Inception)"
          style={{
            padding: 10,
            minWidth: 320,
            borderRadius: 10,
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
            color: "var(--foreground)",
          }}
        />

        <button
          type="submit"
          disabled={!canSearch || loading}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid var(--accent)",
            background: !canSearch || loading ? "var(--card-bg)" : "var(--accent)",
            color: !canSearch || loading ? "var(--text-secondary)" : "white",
            cursor: !canSearch || loading ? "not-allowed" : "pointer",
            fontWeight: 500,
          }}
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      {submitted && !loading && (
        <div style={{ opacity: 0.75, fontSize: 13, color: "var(--text-secondary)" }}>
          Showing results for: <b>{submitted}</b>
        </div>
      )}

      {loading && (
  <div
    style={{
      padding: 12,
      borderRadius: 12,
      border: "1px solid var(--card-border)",
      background: "var(--card-bg)",
      color: "var(--text-secondary)",
    }}
  >
    Searching for movies...
  </div>
)}

{!loading && error && (
  <div
    style={{
      padding: 12,
      borderRadius: 12,
      border: "1px solid rgba(239, 68, 68, 0.3)",
      background: "rgba(239, 68, 68, 0.1)",
      color: "#fca5a5",
    }}
  >
    {error}
  </div>
)}

{!loading && !error && submitted && results.length === 0 && (
  <div
    style={{
      padding: 12,
      borderRadius: 12,
      border: "1px solid var(--card-border)",
      background: "var(--card-bg)",
      color: "var(--text-secondary)",
    }}
  >
    No movies found for "<b>{submitted}</b>". Try another title.
  </div>
)}


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 6,
        }}
      >
        {results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}
