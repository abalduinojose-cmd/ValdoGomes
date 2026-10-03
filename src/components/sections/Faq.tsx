import { Button } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PERGUNTAS, whatsapp } from "@/lib/site-config";

const TITULO_ID = "titulo-perguntas";

/**
 * O "combinado" do Cabana: <details>/<summary> nativo, acessível e sem uma
 * linha de JavaScript. O atributo `name` faz um abrir fechar o outro.
 */
export function Faq() {
  return (
    <Section id={PERGUNTAS.id} tom="soft" labelledBy={TITULO_ID}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id={TITULO_ID} rotulo={PERGUNTAS.rotulo} titulo={PERGUNTAS.titulo} lead={PERGUNTAS.lead} />
          <Button href={whatsapp("perguntas")} variante="contorno" whatsapp className="revelar mt-8">
            {PERGUNTAS.cta}
          </Button>
        </div>

        <div className="revelar overflow-hidden rounded-3xl border border-gold/20 bg-ink-card lg:col-span-7">
          {PERGUNTAS.itens.map((item) => (
            <details key={item.id} name="perguntas" className="group border-b border-gold-light/8 last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 px-6 py-5 transition-colors duration-300 hover:bg-gold-light/[0.03] md:px-8">
                <h3 className="font-body text-[1.0625rem] font-semibold leading-snug">{item.pergunta}</h3>
                <span className="faq-sinal inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold-light transition duration-300 ease-serra group-open:border-gold group-open:bg-gold group-open:text-ink">
                  <Icone nome="mais" className="size-4" traco={1.75} />
                </span>
              </summary>
              <p className="leitura px-6 pb-6 text-[1rem] leading-relaxed text-champagne md:px-8">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
