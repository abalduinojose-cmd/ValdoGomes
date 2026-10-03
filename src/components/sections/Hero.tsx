import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { LogoMarca } from "@/components/ui/Logo";
import { StatusAtendimento } from "@/components/ui/StatusAtendimento";
import { VideoFundo } from "@/components/ui/VideoFundo";
import { asset } from "@/lib/asset";
import { FOTOS } from "@/lib/midia";
import { HERO, whatsapp } from "@/lib/site-config";

/**
 * Hero do Cabana: o vídeo do tour do escritório (vertical, 720x1280) no
 * lugar da foto, véu, texto embaixo à esquerda e a faixa de selos no pé. No
 * desktop o vídeo ocupa a metade direita e o véu lateral funde a borda no
 * preto; no celular ele fica no alto e a base se dissolve no breu. O pôster
 * é o primeiro quadro do vídeo e é o LCP; o vídeo entra por cima.
 *
 * Tudo é Server Component. O h1 não anima: é o candidato a LCP.
 */
export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="titulo-hero"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[64svh] overflow-hidden md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[58%] lg:w-[52%]"
      >
        <div className="hero-zoom absolute inset-0">
          <Image
            src={FOTOS.heroVideo}
            alt={HERO.retratoAlt}
            fill
            priority
            fetchPriority="high"
            placeholder="blur"
            quality={90}
            sizes="(min-width: 1024px) 52vw, (min-width: 768px) 58vw, 100vw"
            className="object-cover object-[50%_45%]"
          />
          <VideoFundo src={asset("/videos/hero.mp4")} label={HERO.videoAlt} className="absolute inset-0 object-[50%_45%]" />
        </div>
        {/* dissolve a base (celular) e a borda esquerda (desktop) no breu,
            para a foto não virar um recorte */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent to-ink md:hidden" />
        <div className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-ink to-transparent md:block" />
      </div>

      <div aria-hidden className="veu-hero absolute inset-0 -z-10" />
      {/* escurinho a mais que clareia na chegada */}
      <div aria-hidden className="hero-clarear absolute inset-0 -z-10 bg-ink" />

      <div className="container-page flex flex-1 items-end pb-12 pt-[46svh] md:pb-16 md:pt-32">
        <div className="max-w-2xl">
          {/* cartão de visita: o VG dourado numa placa escura, o nome do
              escritório e o status do atendimento ao vivo */}
          <div className="rise inline-flex max-w-full items-center gap-3.5 rounded-[1.35rem] border border-gold/30 bg-[linear-gradient(120deg,rgb(255_247_235/0.12),rgb(255_247_235/0.03)_60%)] p-1.5 pr-5 shadow-[inset_0_1px_0_rgb(255_247_235/0.16),0_18px_40px_-24px_rgb(12_16_20/0.9)] backdrop-blur-xl">
            <span className="relative flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-gold/40 bg-[radial-gradient(circle_at_30%_20%,#2a1214,#0c1014_70%)]">
              <span aria-hidden className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/60 to-transparent" />
              <LogoMarca className="h-7" />
            </span>
            <span className="flex min-w-0 flex-col gap-1 leading-tight">
              <span className="whitespace-nowrap text-[0.9375rem] font-semibold tracking-[-0.01em] text-gold-light">
                {HERO.chipNome}
              </span>
              <StatusAtendimento padrao={HERO.chipDetalhe} />
            </span>
          </div>

          {/* as áreas como itens: no celular quebram inteiras, sem ponto solto */}
          <ul
            aria-label="Áreas de atuação"
            className="rise rotulo-caps mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.6875rem] text-gold-light sm:text-[0.75rem]"
            style={{ animationDelay: "60ms" }}
          >
            {HERO.areas.map((area, indice) => (
              <li key={area} className="flex items-center gap-3">
                {indice > 0 ? <span aria-hidden className="size-1 rotate-45 bg-gold" /> : <span aria-hidden className="traco-desenha h-px w-8 bg-gold" />}
                {area}
              </li>
            ))}
          </ul>

          <h1 id="titulo-hero" className="mt-4 text-[clamp(2.6rem,6vw,4.8rem)]">
            {`${HERO.titulo} `}
            <span className="texto-ouro">{HERO.tituloDestaque}</span>
          </h1>

          {/* duas vozes: a do cliente (em destaque) e a do escritório */}
          <div className="rise mt-6 max-w-[34rem] border-l-2 border-gold/70 pl-5" style={{ animationDelay: "160ms" }}>
            <p className="text-[1.125rem] font-semibold leading-snug text-gold-light md:text-[1.25rem]">{HERO.subtituloDestaque}</p>
            <p className="mt-1.5 text-[1rem] leading-relaxed text-champagne md:text-[1.0625rem]">{HERO.subtitulo}</p>
          </div>

          <div
            className="rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <Button href={whatsapp("hero")} tamanho="lg" seta="whatsapp">
              {HERO.cta}
            </Button>
            <Button href="#areas" variante="contorno" tamanho="lg" seta="baixo">
              {HERO.ctaSecundario}
            </Button>
          </div>
        </div>
      </div>

      {/* faixa de selos: ícone + dado forte + complemento, em vidro */}
      <div className="rise border-t border-gold-light/12 bg-ink/50 backdrop-blur-md" style={{ animationDelay: "360ms" }}>
        <ul className="container-page grid grid-cols-2 gap-x-4 gap-y-4 py-5 md:grid-cols-4 md:gap-x-0 md:py-6">
          {HERO.selos.map((selo, indice) => (
            <li
              key={selo.valor}
              className={`flex items-center gap-3 md:justify-center md:px-4 ${indice > 0 ? "md:border-l md:border-gold-light/10" : ""}`}
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                {selo.icone === "estrela" ? (
                  <svg viewBox="0 0 24 24" className="size-[1.1rem] text-gold" fill="currentColor" aria-hidden focusable="false">
                    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />
                  </svg>
                ) : (
                  <Icone nome={selo.icone} className="size-[1.1rem]" traco={1.5} />
                )}
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[0.9375rem] font-semibold tracking-[-0.01em] text-gold-light">{selo.valor}</span>
                <span className="mt-0.5 block text-[0.75rem] text-champagne">{selo.detalhe}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
