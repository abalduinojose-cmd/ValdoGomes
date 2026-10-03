import { cx } from "@/lib/cx";
import { FUNDO, type Tom } from "@/components/ui/Section";

const PREENCHIMENTO: Record<Tom, string> = {
  ink: "text-ink",
  soft: "text-ink-soft",
};

type SilhuetaProps = {
  readonly de: Tom;
  readonly para: Tom;
};

/**
 * Divisor de seção (o lugar da serra com a cabana no Cabana Afrodite): a
 * curva do topo do quadro da logo vira um relevo suave, com um fio dourado
 * acompanhando a crista.
 */
export function Silhueta({ de, para }: SilhuetaProps) {
  return (
    <div aria-hidden className={cx("relative -mb-px overflow-hidden", FUNDO[de])}>
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        focusable="false"
        className={cx("block h-14 w-full md:h-24", PREENCHIMENTO[para])}
      >
        {/* curva de trás, mais suave */}
        <path d="M0 110V78C260 46 520 50 760 70s470 22 680-14v54Z" fill="currentColor" opacity="0.4" />
        {/* curva da frente: a mesma do topo do quadro da logo */}
        <path d="M0 110V92c300-30 560-36 820-14s420 22 620-10v42Z" fill="currentColor" />
        {/* fio dourado sobre a crista */}
        <path
          d="M0 92c300-30 560-36 820-14s420 22 620-10"
          fill="none"
          stroke="var(--gold)"
          strokeOpacity="0.55"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
