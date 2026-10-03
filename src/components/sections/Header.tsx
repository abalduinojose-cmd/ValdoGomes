"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icone } from "@/components/ui/Icone";
import { LogoMarca } from "@/components/ui/Logo";
import { cx } from "@/lib/cx";
import { A11Y, ACOES, ADVOGADA, NAV, whatsapp } from "@/lib/site-config";

const MENU_ID = "menu-celular";

/**
 * Ilha cliente: fundo ao rolar, fio dourado que desliza até a seção em cena
 * e o menu do celular. Todo o resto da página é Server Component.
 */
export function Header() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [ativa, setAtiva] = useState("");
  const [fio, setFio] = useState<{ left: number; width: number } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const aoRolar = (): void => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    const secoes = NAV.map((link) => document.getElementById(link.href.slice(1))).filter(
      (secao): secao is HTMLElement => secao !== null,
    );
    // Faixa estreita no meio da tela: só uma seção vence por vez.
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) if (entrada.isIntersecting) setAtiva(entrada.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    secoes.forEach((secao) => observador.observe(secao));
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const mover = (): void => {
      const alvo = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${ativa}"]`);
      setFio(alvo ? { left: alvo.offsetLeft, width: alvo.offsetWidth } : null);
    };
    mover();
    window.addEventListener("resize", mover);
    return () => window.removeEventListener("resize", mover);
  }, [ativa]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (evento: KeyboardEvent): void => {
      if (evento.key === "Escape") setAberto(false);
    };
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  const fechar = useCallback(() => setAberto(false), []);
  const solido = rolou || aberto;

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          solido
            ? "border-gold/15 bg-ink/92 shadow-[0_12px_30px_-26px_rgb(12_16_20/0.9)] backdrop-blur-md"
            : "border-transparent",
        )}
      >
        <a
          href="#conteudo"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-10 focus-visible:rounded-full focus-visible:bg-gold focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-ink"
        >
          {A11Y.pularConteudo}
        </a>

        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <a href="#topo" aria-label={A11Y.inicio} className="flex shrink-0 items-center gap-3">
            <LogoMarca className="h-10" />
            <span className="flex flex-col leading-none">
              <span className="nome-caps text-[0.95rem] text-gold-light">{ADVOGADA.nome}</span>
              <span className="rotulo-caps mt-1.5 text-[0.55rem] font-medium tracking-[0.34em] text-champagne">
                Advocacia
              </span>
            </span>
          </a>

          <nav ref={navRef} aria-label={A11Y.navPrincipal} className="relative hidden items-center lg:flex">
            {/* uma cápsula de vidro só, que desliza até a seção em cena */}
            {fio ? (
              <span
                aria-hidden
                className="absolute top-1/2 h-8 -translate-y-1/2 rounded-full bg-gold-light/10 shadow-[inset_0_1px_0_rgb(255_247_235/0.15)] transition-[left,width] duration-500 ease-serra"
                style={{ left: fio.left, width: fio.width }}
              />
            ) : null}
            {NAV.map((link) => {
              const acesa = ativa === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={acesa ? "true" : undefined}
                  className={cx(
                    "rotulo-caps relative rounded-full px-3 py-2 text-[0.625rem] tracking-[0.14em] transition-colors duration-300 xl:px-3.5",
                    acesa ? "text-gold-light" : "text-champagne hover:text-gold-light",
                  )}
                >
                  {link.rotulo}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href={whatsapp("cabecalho")} tamanho="sm" whatsapp>
                {ACOES.whatsappCurto}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setAberto((valor) => !valor)}
              aria-expanded={aberto}
              aria-controls={MENU_ID}
              aria-label={aberto ? A11Y.fecharMenu : A11Y.abrirMenu}
              className="inline-flex size-11 items-center justify-center rounded-full border border-gold-light/30 text-gold-light lg:hidden"
            >
              <Icone nome={aberto ? "fechar" : "menu"} className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o backdrop-blur dele viraria bloco de contenção
          e o painel fixo encolheria para a altura da barra. */}
      {aberto ? (
        <div
          id={MENU_ID}
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col justify-between overflow-y-auto bg-ink lg:hidden"
        >
          <nav aria-label={A11Y.navCelular} className="container-page flex flex-col py-4">
            {NAV.map((link, indice) => (
              <a
                key={link.href}
                href={link.href}
                onClick={fechar}
                style={{ animationDelay: `${indice * 55}ms` }}
                className="rise border-b border-gold/15 py-5 font-display text-3xl font-light text-gold-light"
              >
                {link.rotulo}
              </a>
            ))}
          </nav>
          <div className="container-page border-t border-gold/15 py-6">
            <Button href={whatsapp("cabecalho")} tamanho="lg" seta larguraTotal>
              {ACOES.whatsapp}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
