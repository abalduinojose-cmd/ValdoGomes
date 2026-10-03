import { Icone } from "@/components/ui/Icone";
import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { MapaEscritorio } from "@/components/ui/MapaEscritorio";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MAPAS } from "@/lib/midia";
import { CONTATO, ESCRITORIO, whatsapp } from "@/lib/site-config";

const TITULO_ID = "titulo-escritorio";

/**
 * A "localização" do Cabana, em dobro: cada unidade com o seu mapa na
 * identidade do site, o endereço e a regra de atendimento (com hora marcada
 * no Centro, por ordem de chegada na Cidade Alegria). Embaixo, uma faixa com
 * horário, telefones e WhatsApp, que valem para as duas.
 */
export function Escritorio() {
  return (
    <Section id={ESCRITORIO.id} labelledBy={TITULO_ID}>
      <SectionHeading id={TITULO_ID} rotulo={ESCRITORIO.rotulo} titulo={ESCRITORIO.titulo} lead={ESCRITORIO.lead} className="max-w-3xl" />

      <ul className="escalonar mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {CONTATO.unidades.map((unidade) => (
          <li key={unidade.id} className="revelar cartao flex flex-col overflow-hidden !rounded-[1.5rem]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <MapaEscritorio
                mapa={MAPAS[unidade.id]}
                alt={`${ESCRITORIO.mapaTitulo}: ${unidade.nome}`}
                nome={unidade.nome}
                bairro={unidade.bairro}
                href={unidade.mapa}
                rotuloAbrir={ESCRITORIO.mapaAbrir}
              />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
              <p className="flex items-start gap-3 text-[1rem] leading-relaxed text-gold-light">
                <Icone nome="local" className="mt-0.5 size-5 text-gold" traco={1.4} />
                {unidade.linha}
              </p>
              <p className="inline-flex items-center gap-2 self-start rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5 text-[0.8125rem] font-medium text-gold-light">
                <Icone nome="relogio" className="size-4 text-gold" traco={1.5} />
                {unidade.regra}
              </p>
              <a
                href={unidade.mapa}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw mt-auto inline-flex items-center gap-1.5 self-start pt-2 text-sm font-medium text-gold-light"
              >
                {ESCRITORIO.mapaAbrir}
                <Icone nome="seta" className="size-3.5" traco={1.5} />
              </a>
            </div>
          </li>
        ))}
      </ul>

      {/* vale para as duas unidades */}
      <div className="revelar mt-6 grid gap-px overflow-hidden rounded-[1.25rem] border border-gold/20 bg-gold/20 md:grid-cols-3">
        <p className="flex items-center gap-3 bg-ink-card p-5 text-[0.9375rem] text-gold-light">
          <Icone nome="relogio" className="size-5 shrink-0 text-gold" traco={1.4} />
          {ESCRITORIO.horario}
        </p>
        <p className="flex items-center gap-3 bg-ink-card p-5 text-[0.9375rem] text-gold-light">
          <Icone nome="conversa" className="size-5 shrink-0 text-gold" traco={1.4} />
          <span>
            <span className="sr-only">{`${ESCRITORIO.telefonesRotulo}: `}</span>
            {CONTATO.telefonesFixos.join(" · ")}
          </span>
        </p>
        <a
          href={whatsapp("contato")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-ink-card p-5 text-[0.9375rem] text-gold-light transition-colors duration-300 hover:bg-ink"
        >
          <IconeWhatsApp className="size-5 text-gold" />
          {`WhatsApp ${CONTATO.whatsappExibicao}`}
        </a>
      </div>
    </Section>
  );
}
