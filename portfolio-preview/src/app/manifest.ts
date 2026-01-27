import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shubham Umap's Portfolio (FullStack MERN Developer)",
    short_name: "Shubham's Portfolio",
    description:
      "Explore Shubham Umap's portfolio, showcasing senior FullStack Web Development expertise in React, Node.js, and the MERN stack. 🚀 #FullStack #MERN #ReactJS",
    start_url: '/',
    dir: "rtl",
    display: "standalone",
    display_override: ["fullscreen", "minimal-ui"],
    background_color: '#fff',
    theme_color: '#60e4fc',
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        purpose: "any",
        type: "image/x-icon",
      },
      {
        src: "/favicon-32x32",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/android-chrome-512x512.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
    screenshots: [
      {
        src: "images/screenshots/home.webp",
        sizes: "2835x1377",
        type: "image/webp",
      },
      {
        src: "images/screenshots/home_android.webp",
        sizes: "1398x1378",
        type: "image/webp",
      },
    ],
  };
}
