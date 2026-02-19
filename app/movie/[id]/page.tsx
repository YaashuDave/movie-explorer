"use client";

import React, { useEffect, useState } from "react";
import { useFavorites } from "@/lib/favorites";

type MovieDetails = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
  runtime: number | null;
};

function yearFromDate(date: string | null) {
  if (!date) return "—";
  const year = date.split("-")[0];
  return year || "—";
}

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMovie() {
      try {
        const { id } = await params;

        const res = await fetch(`/api/tmdb/movie/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load movie");
        }

        if (!cancelled) {
          setMovie(data);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Network error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovie();

    return () => {
      cancelled = true;
    };
  }, [params]);

  if (loading) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        border: "1px solid var(--card-border)",
        background: "var(--card-bg)",
        color: "var(--text-secondary)",
      }}
    >
      Loading movie details...
    </div>
  );
}


  if (!movie) return <div>Not found.</div>;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const isFav = isFavorite(movie.id);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 16,
        alignItems: "start",
      }}
    >
      <div
        style={{
          border: "1px solid var(--card-border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "#1a2332",
        }}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div style={{ padding: 12, color: "var(--text-secondary)" }}>No poster</div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h1 style={{ margin: 0, color: "var(--foreground)" }}>{movie.title}</h1>

        <div style={{ display: "flex", gap: 16, opacity: 0.8, color: "var(--text-secondary)" }}>
          <div>
            <b>Year:</b> {yearFromDate(movie.release_date)}
          </div>
          <div>
            <b>Runtime:</b> {movie.runtime ? `${movie.runtime} min` : "—"}
          </div>
        </div>

        <div style={{ lineHeight: 1.5, color: "var(--text-secondary)" }}>
          {movie.overview || "No overview available."}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => {
              if (isFav) {
                removeFavorite(movie.id);
              } else {
                addFavorite({
                  id: movie.id,
                  title: movie.title,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  overview: movie.overview,
                });
              }
            }}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid var(--card-border)",
              background: isFav ? "var(--success)" : "rgba(16, 185, 129, 0.1)",
              color: isFav ? "white" : "var(--success)",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {isFav ? "★ Remove from Favorites" : "☆ Add to Favorites"}
          </button>

          <a
            href="/"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid var(--card-border)",
              textDecoration: "none",
              color: "var(--accent)",
              background: "rgba(59, 130, 246, 0.1)",
              fontWeight: 500,
            }}
          >
            Back to Search
          </a>
        </div>
      </div>
    </div>
  );
}
