import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import { GALERIA_FOTOS } from "@/lib/midia";
import { CONTATO, GALERIA } from "@/lib/site-config";

const TITULO_ID = "titulo-estrutura";

/**
 * O lugar dos reels do Cabana (este cliente não mandou vídeos): um mosaico
 * com as fotos do escritório publicadas no Perfil do Google e, ao lado, o
 * cartão do Instagram. A fachada é vertical e ocupa duas linhas; as outras
 * quatro fecham o retângulo.
 */
export function Galeria() {
  const [primeira, ...demais] = GALERIA.fotos;

  return (
    <Section id={GALERIA.id} labelledBy={TITULO_ID}>
      <SectionHeading id={TITULO_ID} rotulo={GALERIA.rotulo} titulo={GALERIA.titulo} lead={GALERIA.lead} className="max-w-2xl" />

      <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
        <ul className="escalonar grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-3 md:gap-4 lg:col-span-8">
          {[primeira!, ...demais].map((foto, indice) => (
            <li
              key={foto.chave}
              className={cx(
                "revelar group relative overflow-hidden rounded-2xl border border-gold/20 bg-ink-card",
                indice === 0 && "row-span-2",
              )}
            >
              <Image
                src={GALERIA_FOTOS[foto.chave]!}
                alt={foto.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 18rem, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-[scale] duration-700 ease-serra group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </li>
          ))}
        </ul>

        {/* Cartão de perfil: um pedaço do "feed" no topo, o ícone sobre a
            emenda e o @ logo abaixo, como no Instagram. */}
        <article className="revelar group/perfil relative flex flex-col overflow-hidden rounded-3xl border border-gold/20 bg-ink-soft lg:col-span-4">
          <div className="relative grid grid-cols-3 gap-px bg-gold-light/10">
            {demais.slice(0, 3).map((foto) => (
              <figure key={foto.chave} className="relative aspect-square overflow-hidden bg-ink">
                <Image
                  src={GALERIA_FOTOS[foto.chave]!}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="8rem"
                  className="object-cover transition-[scale] duration-700 ease-serra group-hover/perfil:scale-105"
                />
              </figure>
            ))}
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-soft via-ink-soft/55 to-transparent" />
          </div>

          <div className="relative -mt-9 flex flex-1 flex-col px-7 pb-7">
            <span className="inline-flex size-[3.25rem] items-center justify-center rounded-2xl border border-gold-light/20 bg-ink-soft text-gold-light">
              <Icone nome="instagram" className="size-[1.35rem]" traco={1.5} />
            </span>
            <p className="mt-4 text-[1.05rem] font-semibold text-gold-light">{CONTATO.instagramUsuario}</p>
            <h3 className="mt-3 text-[1.6rem] leading-snug">{GALERIA.instagramTitulo}</h3>
            <p className="mb-6 mt-2.5 text-[0.9375rem] leading-relaxed text-champagne">{GALERIA.instagramTexto}</p>
            <a
              href={CONTATO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-contorno mt-auto h-12 w-full px-6 text-[0.875rem]"
            >
              <Icone nome="instagram" className="size-[1.15rem]" traco={1.75} />
              {GALERIA.instagramCta}
            </a>
          </div>
        </article>
      </div>
    </Section>
  );
}
