import Image from "next/image";

import completo from "@/assets/logo/valdo-gomes.png";
import marca from "@/assets/logo/marca.png";
import { cx } from "@/lib/cx";

type LogoProps = {
  readonly className?: string;
};

/** Monograma VG dourado do logo do cliente (decorativo: o link já tem nome). */
export function LogoMarca({ className }: LogoProps) {
  return <Image src={marca} alt="" sizes="40px" className={cx("h-10 w-auto", className)} />;
}

/** Logo completo (VG + VALDO GOMES + ADVOCACIA), para o fechamento. */
export function LogoCompleto({ className }: LogoProps) {
  return (
    <Image
      src={completo}
      alt="Valdo Gomes Advocacia"
      sizes="(min-width: 768px) 320px, 260px"
      className={cx("h-auto w-full", className)}
    />
  );
}
