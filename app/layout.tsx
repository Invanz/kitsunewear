import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kitsune Wear — Anime-Inspired Streetwear",
  description:
    "Anime spirit, street-level energy. Discover the latest small-batch streetwear from Kitsune Wear.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
