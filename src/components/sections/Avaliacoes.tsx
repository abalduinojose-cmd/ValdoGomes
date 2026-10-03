import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Trilho } from "@/components/ui/Trilho";
import { AVATARES } from "@/lib/midia";
import { A11Y, AVALIACOES, CONTATO } from "@/lib/site-config";

const TITULO_ID = "titulo-avaliacoes";

function Estrelas({ className }: { readonly className?: string }) {
  return (
    <span role="img" aria-label="5 de 5 estrelas" className={`flex gap-0.5 text-gold ${className ?? ""}`}>
      {Array.from({ length: 5 }, (_, indice) => (
        <svg key={indice} viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden focusable="false">
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />
        </svg>
      ))}
    </span>
  );
}

/** Ramo de louro ao lado da nota, como o selo do resumo no Cabana. */
function Louro({ espelhado = false }: { readonly espelhado?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 56"
      aria-hidden
      focusable="false"
      className={`h-12 w-auto text-gold ${espelhado ? "-scale-x-100" : ""}`}
      fill="currentColor"
    >
      <path d="M20 2c-8 6-14 16-14 27 0 10 5 19 12 25l1-2C13 46 9 39 9 29 9 19 14 9 21 4Z" />
      {[10, 18, 26, 34, 42].map((y, i) => (
        <ellipse key={y} cx={8 - i * 0.5} cy={y} rx="4.5" ry="2.2" transform={`rotate(${-28 - i * 6} ${8 - i * 0.5} ${y})`} />
      ))}
    </svg>
  );
}

export function Avaliacoes() {
  return (
    <Section id={AVALIACOES.id} tom="soft" labelledBy={TITULO_ID}>
      <SectionHeading id={TITULO_ID} rotulo={AVALIACOES.rotulo} titulo={AVALIACOES.titulo} />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="revelar lg:col-span-4">
          <div className="cartao p-8 lg:sticky lg:top-24">
            <div className="flex items-center justify-center gap-3">
              <Louro />
              <div className="text-center">
                <p className="font-display text-6xl font-light leading-none text-gold-light">{AVALIACOES.nota}</p>
                <Estrelas className="mt-2 justify-center" />
              </div>
              <Louro espelhado />
            </div>
            <h3 className="mt-5 text-center text-2xl">{AVALIACOES.resumoTitulo}</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-champagne">{AVALIACOES.resumoTexto}</p>
            <p className="rotulo-caps mt-6 border-t border-gold-light/10 pt-6 text-center text-[0.625rem] text-gold-light">
              {AVALIACOES.resumo}
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <Trilho rotulo={A11Y.trilhoAvaliacoes} rotuloAnterior={A11Y.anterior} rotuloProximo={A11Y.proxima}>
            {AVALIACOES.itens.map((avaliacao) => (
              <li key={avaliacao.foto} className="w-[82vw] max-w-[22.5rem] shrink-0 snap-start sm:w-[22.5rem]">
                <figure className="cartao cartao-vivo flex h-full flex-col p-7">
                  <figcaption className="flex items-center gap-3.5">
                    <Image
                      src={AVATARES[avaliacao.foto]!}
                      alt={`Foto de perfil de ${avaliacao.nome}`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="size-12 shrink-0 rounded-full object-cover ring-1 ring-gold/30"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-gold-light">{avaliacao.nome}</span>
                      <span className="rotulo-caps mt-0.5 block text-[0.58rem] text-champagne">{avaliacao.data}</span>
                    </span>
                  </figcaption>

                  <Estrelas className="mt-4" />

                  <blockquote className="mt-3 flex-1">
                    <p className="text-[0.9375rem] leading-relaxed text-gold-light/90">{avaliacao.texto}</p>
                  </blockquote>

                  <p className="rotulo-caps mt-5 text-[0.55rem] text-champagne">{AVALIACOES.via}</p>
                </figure>
              </li>
            ))}
          </Trilho>

          <div className="revelar mt-8 flex justify-center md:justify-start">
            <Button href={CONTATO.googleAvaliacoes} variante="contorno">
              {AVALIACOES.verTodas}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
