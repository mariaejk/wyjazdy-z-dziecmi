import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wyjazdy z Dziećmi",
    short_name: "WzD",
    description: "Rodzinne wyjazdy warsztatowe w naturze",
    start_url: "/",
    display: "standalone",
    background_color: "#F9F7F2",
    theme_color: "#2D4635",
    // TODO: Add icons after generating from logo
    // icons: [
    //   { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    //   { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    // ],
  };
}
