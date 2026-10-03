"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import { Icone } from "@/components/ui/Icone";
import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";
import { AGENDAR } from "@/lib/site-config";

const TITULO_ID = "titulo-agendar";

/** Rótulo de campo: caixa alta pequena, igual aos eyebrows. */
function Rotulo({ children, htmlFor }: { readonly children: ReactNode; readonly htmlFor?: string }) {
  const classe = "rotulo-caps block text-[0.625rem] text-champagne";
  return htmlFor ? (
    <label htmlFor={htmlFor} className={classe}>
      {children}
    </label>
  ) : (
    <span className={classe}>{children}</span>
  );
}

type OpcoesProps = {
  readonly legenda: string;
  readonly nome: string;
  readonly opcoes: readonly string[];
  readonly valor: string;
  readonly aoMudar: (valor: string) => void;
  /**
   * "chips" quebra em linhas; "segmentado" divide a largura por igual;
   * "empilhado" é segmentado do tablet para cima e em lista no celular
   * (para rótulos longos).
   */
  readonly estilo: "chips" | "segmentado" | "empilhado";
  readonly icones?: Readonly<Record<string, "local" | "online">>;
};

/**
 * Grupo de rádios nativos com cara de chip: teclado (setas), leitor de tela
 * e foco funcionam de graça. O <input> fica visualmente oculto dentro do
 * <label>, e o `has-checked:` pinta a opção marcada.
 */
function Opcoes({ legenda, nome, opcoes, valor, aoMudar, estilo, icones }: OpcoesProps) {
  return (
    <fieldset className="min-w-0">
      <legend className="rotulo-caps mb-3 text-[0.625rem] text-champagne">{legenda}</legend>
      <div
        className={cx(
          estilo === "chips" && "flex flex-wrap gap-2",
          estilo === "segmentado" && "grid grid-flow-col auto-cols-fr gap-2",
          estilo === "empilhado" && "grid gap-2 sm:grid-flow-col sm:auto-cols-fr",
        )}
      >
        {opcoes.map((opcao) => (
          <label
            key={opcao}
            className={cx(
              "relative flex cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.875rem] transition duration-300 ease-serra",
              estilo === "chips" ? "h-10" : "h-12 justify-center px-3",
              "border-gold-light/15 bg-gold-light/[0.03] text-gold-light hover:border-gold/60",
              "has-checked:border-transparent has-checked:bg-gold has-checked:font-semibold has-checked:text-ink",
              "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold-light",
            )}
          >
            <input
              type="radio"
              name={nome}
              value={opcao}
              checked={valor === opcao}
              onChange={() => aoMudar(opcao)}
              className="absolute size-px opacity-0"
            />
            {icones?.[opcao] ? <Icone nome={icones[opcao]} className="size-4" traco={1.5} /> : null}
            {opcao}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Pré-agendamento: o formulário monta a mensagem e abre o WhatsApp da
 * escritório já preenchido. Nada é enviado a servidor nem guardado no
 * site.
 */
export function PreAgendamento() {
  const id = useId();
  const nomeRef = useRef<HTMLInputElement>(null);
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState<string>(AGENDAR.assuntos[0]);
  const [formato, setFormato] = useState<string>(AGENDAR.formatos[0]);
  const [periodo, setPeriodo] = useState<string>(AGENDAR.periodos[2]);
  const [detalhe, setDetalhe] = useState("");
  const [tentou, setTentou] = useState(false);

  const nomeValido = nome.trim().length >= 2;
  const texto = AGENDAR.mensagem({ nome, assunto, formato, periodo, detalhe });

  const enviar = (evento: FormEvent<HTMLFormElement>): void => {
    evento.preventDefault();
    setTentou(true);
    if (!nomeValido) {
      nomeRef.current?.focus();
      return;
    }
    const link = AGENDAR.link(texto);
    // Gesto do usuário: o navegador libera a nova aba. Se bloquear, vai na mesma.
    const aba = window.open(link, "_blank", "noopener,noreferrer");
    if (!aba) window.location.href = link;
  };

  const erroNome = tentou && !nomeValido;

  return (
    <Section id={AGENDAR.id} labelledBy={TITULO_ID}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* coluna de apoio: título, horário e privacidade (fixa ao rolar) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id={TITULO_ID} rotulo={AGENDAR.rotulo} titulo={AGENDAR.titulo} lead={AGENDAR.lead} />

          <div className="revelar mt-10">

            <p className="flex items-center gap-3 text-[0.9375rem] text-gold-light">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-gold/30 text-gold">
                <Icone nome="relogio" className="size-4" traco={1.5} />
              </span>
              {AGENDAR.horario}
            </p>
            <p className="mt-4 max-w-[46ch] text-[0.8125rem] leading-relaxed text-champagne">{AGENDAR.privacidade}</p>
          </div>
        </div>

        {/* o formulário */}
        <form onSubmit={enviar} noValidate className="revelar cartao min-w-0 p-6 md:p-9 lg:col-span-7">
          <div className="grid gap-7">
            <div>
              <Rotulo htmlFor={`${id}-nome`}>{AGENDAR.campos.nome}</Rotulo>
              <input
                ref={nomeRef}
                id={`${id}-nome`}
                name="nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder={AGENDAR.campos.nomePlaceholder}
                aria-invalid={erroNome}
                aria-describedby={erroNome ? `${id}-erro` : undefined}
                className={cx(
                  "mt-3 h-13 w-full rounded-2xl border bg-ink/60 px-5 text-[1rem] text-gold-light outline-none transition duration-300 placeholder:text-champagne/70",
                  "focus:border-gold-light focus:bg-ink",
                  erroNome ? "border-[#e8a08a]" : "border-gold-light/15",
                )}
              />
              {erroNome ? (
                <p id={`${id}-erro`} role="alert" className="mt-2 text-[0.8125rem] text-[#f0b4a2]">
                  {AGENDAR.campos.nomeErro}
                </p>
              ) : null}
            </div>

            <Opcoes
              legenda={AGENDAR.campos.assunto}
              nome="assunto"
              opcoes={AGENDAR.assuntos}
              valor={assunto}
              aoMudar={setAssunto}
              estilo="chips"
            />

            <Opcoes
              legenda={AGENDAR.campos.formato}
              nome="formato"
              opcoes={AGENDAR.formatos}
              valor={formato}
              aoMudar={setFormato}
              estilo="empilhado"
              icones={{ [AGENDAR.formatos[0]]: "local", [AGENDAR.formatos[1]]: "local", [AGENDAR.formatos[2]]: "online" }}
            />

            <Opcoes
              legenda={AGENDAR.campos.periodo}
              nome="periodo"
              opcoes={AGENDAR.periodos}
              valor={periodo}
              aoMudar={setPeriodo}
              estilo="segmentado"
            />

            <div>
              <Rotulo htmlFor={`${id}-detalhe`}>{AGENDAR.campos.mensagem}</Rotulo>
              <textarea
                id={`${id}-detalhe`}
                name="detalhe"
                rows={3}
                maxLength={400}
                value={detalhe}
                onChange={(evento) => setDetalhe(evento.target.value)}
                placeholder={AGENDAR.campos.mensagemPlaceholder}
                className="mt-3 w-full resize-none rounded-2xl border border-gold-light/15 bg-ink/60 px-5 py-4 text-[1rem] leading-relaxed text-gold-light outline-none transition duration-300 placeholder:text-champagne/70 focus:border-gold-light focus:bg-ink"
              />
            </div>

            <button
              type="submit"
              className="btn h-14 w-full bg-[#25D366] text-[0.9375rem] text-[#04210f] shadow-[0_14px_30px_-14px_rgb(37_211_102/0.7)] hover:-translate-y-0.5 hover:bg-[#2be070]"
            >
              <IconeWhatsApp className="size-5" />
              {AGENDAR.enviar}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
