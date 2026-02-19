"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  overview: string | null;
};

function yearFromDate(date: string | null) {
  if (!date) return "—";
  const year = date.split("-")[0];
  return year || "—";
}

export function MovieCard({ movie }: { movie: Movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isFav = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  return (
    <div
      style={{
        border: "1px solid var(--card-border)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "var(--card-bg)",
      }}
    >
      <div
        style={{
          background: "#1a2332",
          aspectRatio: "2 / 3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{ padding: 12, opacity: 0.5, color: "var(--text-secondary)" }}>
            No poster
          </div>
        )}
      </div>

      <div
        style={{
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ fontWeight: 700, lineHeight: 1.2, color: "var(--foreground)" }}>
            {movie.title}
          </div>
          <div style={{ opacity: 0.7, color: "var(--text-secondary)" }}>
            {yearFromDate(movie.release_date)}
          </div>
        </div>

        <div
          style={{
            fontSize: 13,
            opacity: 0.85,
            lineHeight: 1.4,
            color: "var(--text-secondary)",
          }}
        >
          {movie.overview?.slice(0, 140) || "No description available."}
          {movie.overview && movie.overview.length > 140 ? "…" : ""}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <Link
            href={`/movie/${movie.id}`}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid var(--card-border)",
              textDecoration: "none",
              color: "var(--accent)",
              background: "rgba(59, 130, 246, 0.1)",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.2s",
            }}
          >
            Details
          </Link>

          <button
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            onClick={() => {
                if (isFav) {
                removeFavorite(movie.id);
                } else {
                addFavorite(movie);
                }
            }}
            style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid var(--card-border)",
                background: isFav ? "var(--success)" : "rgba(16, 185, 129, 0.1)",
                color: isFav ? "white" : "var(--success)",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.2s",
            }}
            >
            {isFav ? "★ Favorite" : "☆ Favorite"}
            </button>

        </div>
      </div>
    </div>
  );
}
