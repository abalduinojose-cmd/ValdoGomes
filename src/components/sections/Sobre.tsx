import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FOTOS } from "@/lib/midia";
import { SOBRE } from "@/lib/site-config";

const TITULO_ID = "titulo-sobre";

export function Sobre() {
  return (
    <Section id={SOBRE.id} labelledBy={TITULO_ID}>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6 xl:col-span-5">
          <SectionHeading id={TITULO_ID} rotulo={SOBRE.rotulo} titulo={SOBRE.titulo} />

          <p className="revelar poetico mt-6 text-[1.5rem] leading-snug text-gold-light">{SOBRE.frase}</p>

          <div className="revelar">
            {SOBRE.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="leitura mt-5 text-[1.0625rem] leading-relaxed text-champagne">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>

        <figure className="revelar lg:col-span-6 lg:col-start-7">
          <div className="cortina cartao relative mx-auto aspect-4/5 w-full max-w-lg overflow-hidden !rounded-[1.75rem] lg:max-w-none">
            <Image
              src={FOTOS.recepcao}
              alt={SOBRE.fotoAlt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 70vw, 92vw"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </Section>
  );
}
