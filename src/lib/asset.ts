/**
 * Prefixo dos arquivos de `public/` escritos à mão (os vídeos).
 *
 * `next/image` já resolve o `basePath` sozinho; caminhos manuais não. Na raiz
 * do domínio não muda nada; numa prévia em subpasta acrescenta o prefixo.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(caminho: `/${string}`): string {
  return `${BASE}${caminho}`;
}
