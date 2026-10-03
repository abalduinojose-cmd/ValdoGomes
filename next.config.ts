import type { NextConfig } from "next";

/**
 * Produção (Vercel): build normal, página 100% estática, imagens otimizadas.
 * `PAGES=1`: prévia estática no GitHub Pages, que serve o site na subpasta
 * com o nome do repositório e não tem servidor para otimizar imagem.
 *
 * Cada modo escreve na sua pasta: `next build` com o `next dev` de pé no
 * mesmo `.next` derruba o servidor com ENOENT de manifesto.
 */
// TODO: trocar pelo nome exato do repositório quando for criado no GitHub.
const REPO = "ValdoGomes";
const pages = process.env.PAGES === "1";
const basePath = pages ? `/${REPO}` : "";
const previa = `https://abalduinojose-cmd.github.io${basePath}`;

const distDir = pages ? ".next-pages" : process.env.NODE_ENV === "production" ? ".next-build" : ".next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  poweredByHeader: false,
  distDir,
  ...(pages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: previa },
      }
    : {}),
  images: {
    unoptimized: pages,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [48, 96, 160, 240, 360, 420],
    qualities: [70, 75, 90],
  },
};

export default nextConfig;
