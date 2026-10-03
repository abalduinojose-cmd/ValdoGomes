"use client";

import { useEffect, useState } from "react";

import { cx } from "@/lib/cx";

type Status = { readonly aberto: boolean; readonly texto: string };

const ABRE = 8;
const FECHA = 17;

/** Dia da semana (0 = domingo) e hora decimal no fuso de Brasília. */
function agoraEmBrasilia(): { dia: number; hora: number } {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? "";
  const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hora = Number(valor("hour")) % 24;
  return { dia: dias.indexOf(valor("weekday")), hora: hora + Number(valor("minute")) / 60 };
}

/** Segunda a sexta, das 8h às 17h (feriados não entram na conta). */
function calcular(): Status {
  const { dia, hora } = agoraEmBrasilia();
  const util = dia >= 1 && dia <= 5;
  if (util && hora >= ABRE && hora < FECHA) return { aberto: true, texto: `Aberto agora · até ${FECHA}h` };
  if (util && hora < ABRE) return { aberto: false, texto: `Fechado · abre hoje às ${ABRE}h` };
  if (dia >= 1 && dia <= 4) return { aberto: false, texto: `Fechado · abre amanhã às ${ABRE}h` };
  return { aberto: false, texto: `Fechado · abre segunda às ${ABRE}h` };
}

/**
 * Status do atendimento ao vivo, no fuso de Brasília. O HTML estático sai com
 * o horário fixo (sem risco de divergir na hidratação) e o status real entra
 * logo depois, no navegador; ele se atualiza a cada minuto.
 */
export function StatusAtendimento({ padrao }: { readonly padrao: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const atualizar = (): void => setStatus(calcular());
    atualizar();
    const id = window.setInterval(atualizar, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-2 text-[0.75rem] text-champagne">
      <span
        aria-hidden
        className={cx(
          "relative inline-flex size-2 shrink-0 rounded-full",
          status?.aberto ? "ponto-aberto bg-[#3ddc84]" : "bg-gold",
        )}
      />
      <span aria-live="polite">{status?.texto ?? padrao}</span>
    </span>
  );
}
