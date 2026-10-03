import { Icone, type NomeIcone } from "@/components/ui/Icone";

type ChipProps = {
  readonly rotulo: string;
  readonly icone: NomeIcone;
};

export function Chip({ rotulo, icone }: ChipProps) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-light/[0.04] px-3.5 py-2 text-[0.8125rem] text-gold-light">
      <Icone nome={icone} className="size-4 text-gold" traco={1.25} />
      {rotulo}
    </li>
  );
}
