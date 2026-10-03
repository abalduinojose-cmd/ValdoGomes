"use client";

import { useEffect, useRef, useState } from "react";

import { cx } from "@/lib/cx";

type VideoFundoProps = {
  readonly src: string;
  readonly label: string;
  readonly className?: string;
};

/**
 * Vídeo de fundo mudo em loop (padrão do Cabana Afrodite).
 *
 * O `src` só entra depois da montagem: a primeira pintura é o pôster (o
 * primeiro quadro do próprio vídeo, que é o LCP) e o vídeo não disputa banda
 * com ele. Quando dá para tocar, o vídeo aparece por cima com um fade; como
 * o pôster é o mesmo quadro, a troca é imperceptível. Se o autoplay for
 * bloqueado, o pôster fica e nada quebra. Com movimento reduzido, o vídeo
 * não carrega.
 */
export function VideoFundo({ src, label, className }: VideoFundoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tocar = (): void => {
      void node.play().catch(() => {
        /* autoplay bloqueado: fica o pôster */
      });
    };

    if (!node.currentSrc.endsWith(src)) {
      node.src = src;
      node.load();
    }
    /* fora do `if`: na remontagem do modo estrito o arquivo já está certo e
       ainda assim alguém precisa mandar tocar */
    if (node.readyState >= 3) tocar();
    else node.addEventListener("canplay", tocar, { once: true });

    return () => node.removeEventListener("canplay", tocar);
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      onPlaying={() => setPronto(true)}
      className={cx(
        "size-full object-cover transition-opacity duration-700 ease-serra",
        pronto ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
