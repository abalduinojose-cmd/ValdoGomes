import { cx } from "@/lib/cx";

type SectionHeadingProps = {
  readonly id: string;
  readonly rotulo: string;
  readonly titulo: string;
  readonly lead?: string;
  readonly alinhamento?: "esquerda" | "centro";
  readonly className?: string;
};

/** Rótulo em pílula, título grande e leve e um parágrafo de apoio. */
export function SectionHeading({
  id,
  rotulo,
  titulo,
  lead,
  alinhamento = "esquerda",
  className,
}: SectionHeadingProps) {
  const centro = alinhamento === "centro";

  return (
    <div className={cx("revelar", centro && "flex flex-col items-center text-center", className)}>
      {/* rótulo em pílula de vidro com um ponto dourado que pulsa de leve */}
      <p className="rotulo-caps inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold-light/[0.05] py-1.5 pl-2.5 pr-3.5 text-[0.625rem] text-gold-light shadow-[inset_0_1px_0_rgb(255_247_235/0.08)]">
        <span aria-hidden className="ponto-vivo relative inline-flex size-1.5 rounded-full bg-gold" />
        {rotulo}
      </p>

      <h2 id={id} className="mt-5 text-[clamp(2.2rem,4.8vw,3.6rem)]">
        {titulo}
      </h2>

      {lead ? <p className="leitura mt-5 text-[1.0625rem] leading-relaxed text-champagne">{lead}</p> : null}
    </div>
  );
}
