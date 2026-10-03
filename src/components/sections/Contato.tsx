import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoCompleto } from "@/components/ui/Logo";
import { FOTOS } from "@/lib/midia";
import { CONTATO_SECAO, FINAL, whatsapp } from "@/lib/site-config";

const TITULO_ID = "titulo-contato";

/**
 * O fechamento do Cabana: foto em tela cheia, logo, chamada e a pílula
 * principal. Aqui ele também é a seção de contato; as redes ficam no rodapé.
 */
export function Contato() {
  return (
    <section
      id={CONTATO_SECAO.id}
      aria-labelledby={TITULO_ID}
      className="relative isolate flex min-h-[40rem] items-center overflow-hidden py-24 md:min-h-[46rem]"
    >
      <Image
        src={FOTOS.reuniao}
        alt={FINAL.fotoAlt}
        fill
        placeholder="blur"
        sizes="100vw"
        className="deriva-foto -z-20 object-cover object-[50%_40%]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
      <div aria-hidden className="veu-foto absolute inset-0 -z-10" />
      <div aria-hidden className="ponte-topo-soft absolute inset-x-0 top-0 -z-10 h-28 md:h-36" />
      <div aria-hidden className="ponte-base-ink absolute inset-x-0 bottom-0 -z-10 h-44 md:h-64" />

      <Container>
        <div className="revelar mx-auto flex max-w-3xl flex-col items-center text-center">
          <LogoCompleto className="max-w-[15rem] md:max-w-[19rem]" />

          <h2 id={TITULO_ID} className="mt-10 text-[clamp(2.3rem,5.2vw,3.9rem)]">
            {FINAL.titulo}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-gold-light/90">{CONTATO_SECAO.lead}</p>

          <Button href={whatsapp("contato")} tamanho="lg" seta="whatsapp" className="mt-9">
            {FINAL.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
