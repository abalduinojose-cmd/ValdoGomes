import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { grafo } from "@/lib/schema";
import { SITE } from "@/lib/site-config";
import "./globals.css";

/**
 * Uma família só, usada com decisão: Plus Jakarta Sans variável (200 a 800,
 * com itálico). Títulos grandes e leves com tracking fechado, rótulos em
 * caixa alta pequena, texto corrido em 400. Pedido da cliente por fontes
 * "mais clean e modernas" no lugar da serifa.
 */
const jakarta = Plus_Jakarta_Sans({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/** Só a origem: com subpasta o Next repetiria o basePath no og:image. */
const ORIGEM = new URL(SITE.url).origin;

export const metadata: Metadata = {
  metadataBase: new URL(ORIGEM),
  title: { default: SITE.titulo, template: `%s | ${SITE.nome}` },
  description: SITE.descricao,
  keywords: [...SITE.palavrasChave],
  applicationName: SITE.nome,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.nome,
    title: SITE.titulo,
    description: SITE.descricao,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titulo,
    description: SITE.descricao,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0c1014",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    // As variáveis das fontes ficam no <html>: é ali que o font-family resolve.
    <html lang="pt-BR" className={jakarta.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Conteúdo estático gerado de site-config.ts, sem entrada do usuário.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo()) }}
        />
      </body>
    </html>
  );
}
