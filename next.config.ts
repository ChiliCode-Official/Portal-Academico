import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let repoName = "";
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repoName = `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`;
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoName || undefined,
  assetPrefix: repoName || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
