import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESSO, whatsapp } from "@/lib/site-config";

const TITULO_ID = "titulo-processo";

/**
 * No lugar do calendário do Cabana: título centrado, as quatro etapas em
 * cartões costurados por um fio dourado e o convite centrado embaixo.
 */
export function Processo() {
  return (
    <Section id={PROCESSO.id} tom="soft" labelledBy={TITULO_ID}>
      <SectionHeading
        id={TITULO_ID}
       
        rotulo={PROCESSO.rotulo}
        titulo={PROCESSO.titulo}
        lead={PROCESSO.lead}
        alinhamento="centro"
        className="mx-auto max-w-3xl"
      />

      <ol className="escalonar relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* o fio que liga as etapas no desktop */}
        <span aria-hidden className="absolute left-[12%] right-[12%] top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent lg:block" />
        {PROCESSO.passos.map((passo, indice) => (
          <li key={passo.titulo} className="revelar cartao relative flex flex-col p-7">
            <span className="relative z-10 inline-flex size-12 items-center justify-center self-start rounded-full bg-gradient-to-br from-[#e8c7b2] via-gold to-[#a9826b] font-display text-2xl text-ink">
              {indice + 1}
            </span>
            <h3 className="mt-6 text-[1.6rem] leading-tight">{passo.titulo}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-champagne">{passo.descricao}</p>
          </li>
        ))}
      </ol>

      <p className="revelar mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-champagne">{PROCESSO.nota}</p>

      <div className="revelar mt-8 flex justify-center">
        <Button href={whatsapp("atendimento")} tamanho="lg" seta>
          {PROCESSO.cta}
        </Button>
      </div>
    </Section>
  );
}
