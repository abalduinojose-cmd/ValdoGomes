import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { FOTOS } from "@/lib/midia";
import { FRASE } from "@/lib/site-config";

/**
 * Full-bleed poético (o "mar de nuvens" do Cabana) com a foto da Justiça.
 *
 * A foto aparece sem parallax (o scale ampliava e borrava) e em qualidade 90.
 * No desktop ela ocupa a seção inteira e o texto fica à esquerda, sobre uma
 * sombra lateral firme: na recepção do Valdo esse lado é a parede vazada, de
 * desenho muito marcado, e sem a sombra as citações perdiam leitura. No celular ela vem em cima, inteira na largura e enquadrada na
 * estátua, e o texto vem embaixo: antes o recorte vertical ampliava a imagem
 * ~3x (borrada) e a frase ficava em cima da estátua.
 */
export function Frase() {
  return (
    <section
      aria-label={FRASE.poetico}
      className="relative isolate overflow-hidden bg-ink md:flex md:min-h-[82svh] md:items-end md:py-20"
    >
      <div className="relative aspect-[4/3] w-full md:absolute md:inset-0 md:-z-20 md:aspect-auto">
        <Image
          src={FOTOS.recepcaoCorredor}
          alt={FRASE.fotoAlt}
          fill
          quality={90}
          placeholder="blur"
          sizes="(max-width: 767px) 135vw, 100vw"
          className="object-cover object-[74%_center] md:object-[center_42%]"
        />
        {/* bordas que se fundem no preto das seções vizinhas */}
        <div aria-hidden className="ponte-topo-ink absolute inset-x-0 top-0 h-6 md:h-28" />
        <div aria-hidden className="ponte-base-ink absolute inset-x-0 bottom-0 h-1/3 md:h-40" />
        {/* só no desktop: sombra lateral onde o texto fica, o resto da foto limpo */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(12_16_20/0.94)_0%,rgb(12_16_20/0.86)_38%,rgb(12_16_20/0.45)_60%,rgb(12_16_20/0)_80%)] md:block"
        />
      </div>

      <Container className="relative -mt-6 pb-16 md:mt-0 md:pb-0">
        <div className="revelar max-w-[40rem]">
          <p className="poetico text-[clamp(2rem,4.4vw,3.3rem)] leading-[1.1] text-gold-light">{FRASE.poetico}</p>
          <p className="poetico mt-3 text-[clamp(1.35rem,2.6vw,2rem)] leading-snug">
            <span className="marca-texto">{FRASE.apoio}</span>
          </p>
        </div>

        <div className="revelar max-w-[40rem]">
          <ul className="mt-9 grid gap-4 border-t border-gold-light/20 pt-6">
            {FRASE.citacoes.map((citacao) => (
              <li key={citacao.autor} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <q className="font-display text-[1.2rem] italic text-gold-light">{citacao.texto}</q>
                <span className="text-sm text-champagne">{citacao.autor}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-champagne">{FRASE.nota}</p>
        </div>
      </Container>
    </section>
  );
}
