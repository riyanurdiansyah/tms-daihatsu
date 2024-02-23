// const path = require("path");
// import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  //   sassOptions: {
  //     includePaths: [path.join(__dirname, "styles")],
  //   },
  images: {
    domains: [
      "tmsisuzu.co.id",
      "www.tmsisuzu.co.id",
      "blog-media.lifepal.co.id",
      "isuzu-astra.com",
      "storage-x.sgp1.cdn.digitaloceanspaces.com",
      "tms-storage.sgp1.digitaloceanspaces.com",
      "new-storage.sgp1.digitaloceanspaces.com",
      "youtu.be",
    ],
  },
};

export default nextConfig;
