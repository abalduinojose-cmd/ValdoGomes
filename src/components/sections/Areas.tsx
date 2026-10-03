import { Icone } from "@/components/ui/Icone";
import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AREAS, whatsapp, type Area } from "@/lib/site-config";

const TITULO_ID = "titulo-areas";

/**
 * Cartões escuros (as "comodidades" do Cabana), 2x2 e do mesmo tamanho. Cada
 * caso comum é um atalho: o toque abre o WhatsApp já com aquele assunto.
 * Junta numa seção só o que antes ficava repetido em "Qual é a sua situação?".
 */
function CardArea({ area }: { readonly area: Area }) {
  return (
    <li className="revelar cartao cartao-vivo group relative flex flex-col p-7 md:p-9">
      <div className="flex items-center gap-4">
        <span className="inline-flex size-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8c7b2] via-gold to-[#a9826b] text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]">
          <Icone nome={area.icone} className="size-6" traco={1.4} />
        </span>
        <h3 className="text-[clamp(1.6rem,2.4vw,2rem)] font-light">{area.titulo}</h3>
      </div>

      <p className="mt-5 text-[0.9375rem] leading-relaxed text-champagne">{area.descricao}</p>

      {area.topicos ? (
        <ul className="mt-6 flex flex-wrap gap-2 border-t border-gold-light/10 pt-6">
          {area.topicos.map((topico) => (
            <li key={topico}>
              <a
                href={whatsapp("areas", topico.toLowerCase())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Conversar no WhatsApp sobre ${topico.toLowerCase()}`}
                className="group/topico inline-flex items-center gap-2 rounded-full border border-gold-light/15 bg-gold-light/[0.04] py-1.5 pl-3.5 pr-1.5 text-[0.875rem] text-gold-light transition duration-300 ease-serra hover:border-gold/70 hover:bg-gold/15"
              >
                {topico}
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-gold/15 text-gold transition duration-300 group-hover/topico:bg-[#25D366] group-hover/topico:text-white">
                  <IconeWhatsApp className="size-3.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <a
        href={whatsapp("areas", area.assunto)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${AREAS.saibaMais}: ${area.titulo}`}
        className="rotulo-caps mt-auto inline-flex items-center gap-2 self-start pt-8 text-[0.625rem] text-gold-light"
      >
        <span className="link-draw">{AREAS.saibaMais}</span>
        <Icone
          nome="seta"
          className="size-3.5 text-gold transition-[translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          traco={1.5}
        />
      </a>
    </li>
  );
}

export function Areas() {
  return (
    <Section id={AREAS.id} tom="soft" labelledBy={TITULO_ID}>
      <SectionHeading id={TITULO_ID} rotulo={AREAS.rotulo} titulo={AREAS.titulo} lead={AREAS.lead} className="max-w-3xl" />

      <ul className="escalonar mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
        {AREAS.itens.map((area) => (
          <CardArea key={area.id} area={area} />
        ))}
      </ul>
    </Section>
  );
}
