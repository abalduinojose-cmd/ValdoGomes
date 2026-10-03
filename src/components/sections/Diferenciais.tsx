import { Container } from "@/components/ui/Container";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { DIFERENCIAIS } from "@/lib/site-config";

/**
 * Editorial, sem cartões (os "destaques" do Cabana): cada item abre com um
 * fio que se pinta de ouro no hover, ícone em chip dourado e a numeração
 * grande em marca d'água.
 */
export function Diferenciais() {
  return (
    <section aria-labelledby="titulo-diferenciais" className="bg-ink pb-20 md:pb-28">
      <Container>
        <h2
          id="titulo-diferenciais"
          className="rotulo-caps inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold-light/[0.05] py-1.5 pl-2.5 pr-3.5 font-body text-[0.625rem] font-semibold text-gold-light"
        >
          <span aria-hidden className="ponto-vivo relative inline-flex size-1.5 rounded-full bg-gold" />
          {DIFERENCIAIS.rotulo}
        </h2>

        <ul className="escalonar mt-10 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {DIFERENCIAIS.itens.map((item, indice) => (
            <li key={item.titulo} className="revelar group relative border-t border-gold-light/12 pt-7">
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-0 bg-gradient-to-r from-gold-light to-gold transition-[width] duration-700 ease-serra group-hover:w-full"
              />

              <div className="flex items-start justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8c7b2] via-gold to-[#a9826b] text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.3)] transition-[translate] duration-500 ease-serra group-hover:-translate-y-1">
                  <Icone nome={item.icone as NomeIcone} className="size-[1.35rem]" traco={1.5} />
                </span>
                {/* marca d'água em pseudo-elemento: é enfeite, não texto a ler */}
                <span
                  aria-hidden
                  data-numero={String(indice + 1).padStart(2, "0")}
                  className="font-display text-5xl font-light leading-none text-gold-light/12 transition-colors duration-500 before:content-[attr(data-numero)] group-hover:text-gold/40"
                />
              </div>

              <h3 className="mt-6 text-[1.6rem] font-normal leading-snug">{item.titulo}</h3>
              <p className="mt-2.5 max-w-[42ch] text-[0.9375rem] leading-relaxed text-champagne">{item.descricao}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
