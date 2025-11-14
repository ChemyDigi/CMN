import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "media.istockphoto.com", // for iStock images
      "images.unsplash.com",   // optional: for Unsplash images
      "cdn.pixabay.com",       // optional: for Pixabay images
      "firebasestorage.googleapis.com", // if you later use Firebase Storage URLs
    ],
  },
};

export default nextConfig;