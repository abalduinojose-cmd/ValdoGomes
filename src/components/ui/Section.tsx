import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cx } from "@/lib/cx";

/** Os dois tons do ritmo das seções: preto e o marrom-escuro da marca. */
export type Tom = "ink" | "soft";

export const FUNDO: Record<Tom, string> = {
  ink: "bg-ink",
  soft: "bg-ink-soft",
};

/** A luz de abajur alterna o lado conforme o tom, para o ritmo não ficar repetitivo. */
const LUZ: Record<Tom, string> = {
  ink: "luz-direita",
  soft: "luz",
};

type SectionProps = {
  readonly children: ReactNode;
  readonly id?: string;
  readonly tom?: Tom;
  readonly labelledBy: string;
  readonly className?: string;
  readonly containerClassName?: string;
  /** Conteúdo sangrando até as bordas: dispensa o container interno. */
  readonly bleed?: boolean;
};

export function Section({
  children,
  id,
  tom = "ink",
  labelledBy,
  className,
  containerClassName,
  bleed = false,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx("relative py-20 md:py-28", FUNDO[tom], LUZ[tom], className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
