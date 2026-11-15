import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES_DEPLOY === "true";
const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const basePath =
  isGitHubPagesBuild &&
  repositoryOwner &&
  repositoryName &&
  repositoryName !== `${repositoryOwner}.github.io`
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      basePath,
    }
  : {};

export default nextConfig;
