import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "Search movies and manage favorites",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <a href="/" style={{ fontWeight: 700, fontSize: 20, textDecoration: "none", color: "var(--foreground)" }}>
                🎬 Movie Explorer
              </a>
              <div style={{ display: "flex", gap: 20 }}>
                <a href="/" style={{ color: "var(--foreground)", fontWeight: 500 }}>Search</a>
                <a href="/favorites" style={{ color: "var(--foreground)", fontWeight: 500 }}>Favorites</a>
              </div>
            </header>

            <main style={{ marginTop: 16 }}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
