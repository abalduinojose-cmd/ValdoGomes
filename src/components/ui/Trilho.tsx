"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import { Icone } from "@/components/ui/Icone";
import { cx } from "@/lib/cx";

type TrilhoProps = {
  readonly children: ReactNode;
  readonly rotulo: string;
  readonly rotuloAnterior: string;
  readonly rotuloProximo: string;
  readonly className?: string;
};

/**
 * Carrossel com setas: rola um card por vez, aceita arrasto com o mouse e
 * desabilita as setas nas pontas. No toque, o scroll nativo resolve.
 */
export function Trilho({ children, rotulo, rotuloAnterior, rotuloProximo, className }: TrilhoProps) {
  const ref = useRef<HTMLUListElement>(null);
  const arrasto = useRef<{ inicioX: number; inicioScroll: number } | null>(null);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(false);

  const sincronizar = useCallback((): void => {
    const no = ref.current;
    if (!no) return;
    setNoInicio(no.scrollLeft <= 8);
    setNoFim(no.scrollLeft >= no.scrollWidth - no.clientWidth - 8);
  }, []);

  useEffect(() => {
    sincronizar();
    window.addEventListener("resize", sincronizar);
    return () => window.removeEventListener("resize", sincronizar);
  }, [sincronizar]);

  const rolar = useCallback((direcao: 1 | -1): void => {
    const no = ref.current;
    if (!no) return;
    const card = no.querySelector("li");
    const passo = card ? card.getBoundingClientRect().width + 20 : no.clientWidth * 0.8;
    no.scrollBy({ left: passo * direcao, behavior: "smooth" });
  }, []);

  const aoApertar = useCallback((evento: ReactPointerEvent<HTMLUListElement>): void => {
    if (evento.pointerType !== "mouse" || !ref.current) return;
    arrasto.current = { inicioX: evento.clientX, inicioScroll: ref.current.scrollLeft };
  }, []);

  const aoMover = useCallback((evento: ReactPointerEvent<HTMLUListElement>): void => {
    const no = ref.current;
    const estado = arrasto.current;
    if (!no || !estado) return;
    const delta = evento.clientX - estado.inicioX;
    if (Math.abs(delta) > 4) {
      no.classList.add("snap-none", "select-none");
      no.scrollLeft = estado.inicioScroll - delta;
    }
  }, []);

  const soltar = useCallback((): void => {
    ref.current?.classList.remove("snap-none", "select-none");
    arrasto.current = null;
  }, []);

  return (
    <div>
      <div className="mb-5 flex justify-end gap-2.5 max-md:hidden">
        <button type="button" onClick={() => rolar(-1)} disabled={noInicio} aria-label={rotuloAnterior} className="seta-trilho">
          <Icone nome="anterior" className="size-5" />
        </button>
        <button type="button" onClick={() => rolar(1)} disabled={noFim} aria-label={rotuloProximo} className="seta-trilho">
          <Icone nome="proximo" className="size-5" />
        </button>
      </div>

      <ul
        ref={ref}
        onScroll={sincronizar}
        onPointerDown={aoApertar}
        onPointerMove={aoMover}
        onPointerUp={soltar}
        onPointerLeave={soltar}
        tabIndex={0}
        aria-label={rotulo}
        className={cx(
          // `relative`: qualquer descendente absoluto ancora aqui e fica
          // clipado pelo scroll, em vez de esticar a largura da página.
          "scrollbar-none relative flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto pb-2",
          className,
        )}
      >
        {children}
      </ul>
    </div>
  );
}
