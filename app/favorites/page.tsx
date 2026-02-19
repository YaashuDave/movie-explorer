"use client";

import React from "react";
import { useFavorites } from "@/lib/favorites";
import { MovieCard } from "@/components/MovieCard";

export default function FavoritesPage() {
  const { favorites, setRating, setNote } = useFavorites();

  if (favorites.length === 0) {
  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        border: "1px solid var(--card-border)",
        background: "var(--card-bg)",
        color: "var(--text-secondary)",
      }}
    >
      <h2 style={{ marginTop: 0, color: "var(--foreground)" }}>No favorites yet 🎬</h2>
      <p style={{ margin: 0 }}>
        Go to the search page and add movies to your favorites list.
      </p>
    </div>
  );
}


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h1 style={{ margin: 0, color: "var(--foreground)" }}>Favorites</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {favorites.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: 12,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              background: "var(--card-bg)",
            }}
          >
            <MovieCard movie={movie} />

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <label style={{ fontSize: 13, opacity: 0.8, color: "var(--text-secondary)" }}>
                  Personal Rating:
                </label>
                <select
                  value={movie.rating ?? ""}
                  onChange={(e) =>
                    setRating(
                      movie.id,
                      e.target.value ? Number(e.target.value) as 1 | 2 | 3 | 4 | 5 : null
                    )
                  }
                  style={{
                    marginLeft: 8,
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid var(--card-border)",
                    background: "var(--card-bg)",
                    color: "var(--foreground)",
                  }}
                >
                  <option value="">—</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <textarea
                placeholder="Add a personal note..."
                value={movie.note}
                onChange={(e) => setNote(movie.id, e.target.value)}
                rows={3}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid var(--card-border)",
                  background: "var(--card-bg)",
                  color: "var(--foreground)",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
