import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { LogoMarca } from "@/components/ui/Logo";
import { ADVOGADA, CONTATO, NAV, RODAPE, SITE } from "@/lib/site-config";

const REDES: readonly { readonly href: string; readonly rotulo: string; readonly icone: NomeIcone }[] = [
  { href: CONTATO.instagram, rotulo: "Instagram da Advocacia Valdo Gomes", icone: "instagram" },
  { href: CONTATO.google, rotulo: "Perfil da Advocacia Valdo Gomes no Google", icone: "google" },
  { href: CONTATO.unidades[0]!.mapa, rotulo: "Unidade Centro no mapa", icone: "local" },
  { href: CONTATO.unidades[1]!.mapa, rotulo: "Unidade Cidade Alegria no mapa", icone: "local" },
];

/**
 * Rodapé do Cabana: a marca respirando no alto, os contatos em ícones, a
 * navegação e o fio legal embaixo. Ao fundo, o monograma VG em marca d'água.
 */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink pb-28 pt-20 md:pb-20">
      <LogoMarca className="pointer-events-none absolute -bottom-16 left-1/2 -z-10 h-64 -translate-x-1/2 opacity-[0.06]" />
      <div aria-hidden className="absolute left-1/2 top-0 -z-10 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-gold/10 blur-[110px]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

      <div className="container-page flex flex-col items-center text-center">
        <LogoMarca className="h-16 md:h-20" />
        <p className="nome-caps mt-6 text-[1.3rem] text-gold-light">{ADVOGADA.nomeCompleto}</p>
        <p className="rotulo-caps mt-2.5 text-[0.625rem] text-champagne">{[ADVOGADA.experiencia, ADVOGADA.oab, "Resende-RJ"].filter(Boolean).join(" · ")}</p>

        <ul className="mt-9 flex items-center gap-2.5">
          {REDES.map((rede) => (
            <li key={rede.href}>
              <a
                href={rede.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={rede.rotulo}
                title={rede.rotulo}
                className="group relative inline-flex size-12 items-center justify-center rounded-2xl border border-gold-light/12 bg-gold-light/[0.04] text-gold-light transition duration-300 ease-serra hover:-translate-y-1 hover:border-transparent hover:text-ink"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e8c7b2] via-gold to-[#a9826b] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <Icone nome={rede.icone} className="relative size-[1.15rem]" traco={1.5} />
              </a>
            </li>
          ))}
        </ul>

        <nav aria-label={RODAPE.navTitulo} className="mt-10 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-1">
            {NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rotulo-caps inline-block rounded-full px-3.5 py-2 text-[0.625rem] text-champagne transition-colors duration-300 hover:bg-gold-light/[0.06] hover:text-gold-light"
                >
                  {link.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="leitura mt-10 text-xs leading-relaxed text-champagne">{RODAPE.aviso}</p>

        <div className="relative mt-10 w-full pt-7">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-light/15 to-transparent" />
          <div className="flex flex-col items-center gap-2 text-[0.75rem] text-champagne sm:flex-row sm:justify-between">
            <p>{`© ${ano} ${SITE.nome}. ${RODAPE.direitos}`}</p>
            <p className="max-sm:order-first">{CONTATO.horario}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
