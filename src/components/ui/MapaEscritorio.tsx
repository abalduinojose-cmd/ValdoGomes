import Image, { type StaticImageData } from "next/image";

import { Icone } from "@/components/ui/Icone";
import { LogoMarca } from "@/components/ui/Logo";

type MapaEscritorioProps = {
  readonly mapa: StaticImageData;
  readonly alt: string;
  readonly nome: string;
  readonly bairro: string;
  readonly href: string;
  readonly rotuloAbrir: string;
};

/**
 * Mapa real na identidade do site (tiles do OpenStreetMap recoloridos por
 * scripts/mapa.py) com o pino desenhado no centro exato do endereço. Sem
 * iframe do Google: zero JavaScript de terceiro e zero cookie. O clique leva
 * ao Google Maps para traçar a rota.
 */
export function MapaEscritorio({ mapa, alt, nome, bairro, href, rotuloAbrir }: MapaEscritorioProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${nome}, ${bairro}: ${rotuloAbrir}`} className="group absolute inset-0 block">
      <Image
        src={mapa}
        alt={alt}
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 40vw, 92vw"
        className="object-cover transition-[scale] duration-[1.2s] ease-serra group-hover:scale-[1.04]"
      />
      {/* vinheta: as bordas do mapa se dissolvem no cartão */}
      <span aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(12_16_20/0.75)_100%)]" />

      {/* pino: anel que pulsa + gota dourada com o monograma */}
      <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="mapa-pulso absolute bottom-0 left-1/2 size-16 -translate-x-1/2 translate-y-1/2 rounded-full border border-gold/60" />
        <span className="relative flex flex-col items-center">
          <span className="flex size-12 items-center justify-center rounded-full rounded-br-none rotate-45 bg-gradient-to-br from-[#e8c7b2] via-gold to-[#a9826b] shadow-[0_10px_24px_-8px_rgb(12_16_20/0.9)]">
            <span className="-rotate-45">
              <LogoMarca className="h-6 brightness-0" />
            </span>
          </span>
          <span className="mt-1 size-1.5 rounded-full bg-gold" />
        </span>
      </span>

      {/* etiqueta do lugar */}
      <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-ink/85 px-4 py-3 backdrop-blur-md md:inset-x-5 md:bottom-5">
        <span className="min-w-0 leading-tight">
          <span className="block truncate font-display text-[1.15rem] text-gold-light">{nome}</span>
          <span className="rotulo-caps mt-1 block text-[0.55rem] text-champagne">{bairro}</span>
        </span>
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-[translate] duration-300 group-hover:translate-x-0.5">
          <Icone nome="seta" className="size-4" traco={1.75} />
        </span>
      </span>

      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-0.5 text-[0.6rem] text-champagne">
        © OpenStreetMap
      </span>
    </a>
  );
}
