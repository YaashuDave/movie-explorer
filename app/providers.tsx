"use client";

import React from "react";
import { FavoritesProvider } from "@/lib/favorites";

export function Providers({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}
