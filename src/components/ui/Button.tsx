import type { ReactNode } from "react";

import { Icone } from "@/components/ui/Icone";
import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { cx } from "@/lib/cx";

export type Variante = "ouro" | "contorno" | "discreto";
export type Tamanho = "sm" | "md" | "lg";

type ButtonProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variante?: Variante;
  readonly tamanho?: Tamanho;
  /**
   * Chip redondo no fim da pílula: seta diagonal (gira no hover), o glifo do
   * WhatsApp (fica verde no hover) ou seta para baixo, para âncoras da página.
   */
  readonly seta?: boolean | "whatsapp" | "baixo";
  /** Glifo do WhatsApp antes do rótulo. */
  readonly whatsapp?: boolean;
  readonly larguraTotal?: boolean;
  readonly className?: string;
};

const VARIANTES: Record<Variante, string> = {
  ouro: "btn-ouro",
  contorno: "btn-contorno",
  discreto: "btn-discreto",
};

const TAMANHOS: Record<Tamanho, string> = {
  sm: "h-10 px-5 text-[0.8125rem]",
  md: "h-12 px-6 text-[0.875rem]",
  lg: "h-14 px-8 text-[0.9375rem]",
};

/** Com seta, o lado direito encosta menos na borda para a bolinha respirar. */
const TAMANHOS_COM_SETA: Record<Tamanho, string> = {
  sm: "h-11 pl-5 pr-1.5 text-[0.8125rem]",
  md: "h-13 pl-6 pr-2 text-[0.875rem]",
  lg: "h-[3.75rem] pl-7 pr-2.5 text-[0.9375rem]",
};

/**
 * Pílula do padrão Cabana. Server Component: não carrega JavaScript.
 * Links externos (WhatsApp, redes) abrem em outra aba com rel seguro.
 */
export function Button({
  href,
  children,
  variante = "ouro",
  tamanho = "md",
  seta = false,
  whatsapp = false,
  larguraTotal = false,
  className,
}: ButtonProps) {
  const externo = href.startsWith("http");

  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(
        "btn",
        VARIANTES[variante],
        seta ? TAMANHOS_COM_SETA[tamanho] : TAMANHOS[tamanho],
        larguraTotal && "w-full",
        className,
      )}
    >
      {whatsapp ? <IconeWhatsApp className="size-[1.15rem]" /> : null}
      {children}
      {seta ? (
        <span aria-hidden className="btn-seta" data-tipo={seta === true ? "seta" : seta}>
          {seta === "whatsapp" ? (
            <IconeWhatsApp className="size-[1.05rem]" />
          ) : (
            <Icone nome={seta === "baixo" ? "baixo" : "seta"} className="size-4" traco={1.75} />
          )}
        </span>
      ) : null}
    </a>
  );
}
