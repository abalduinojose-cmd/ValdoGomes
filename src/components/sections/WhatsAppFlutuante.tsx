import { IconeWhatsApp } from "@/components/ui/IconeWhatsApp";
import { FLUTUANTE, whatsapp } from "@/lib/site-config";

/**
 * Botão flutuante do WhatsApp, na cor oficial (#25D366), no canto inferior
 * direito. Server Component: zero JavaScript. O anel que pulsa e a dica que
 * aparece no hover (desktop) são CSS puro e somem com movimento reduzido.
 */
export function WhatsAppFlutuante() {
  return (
    <a
      href={whatsapp("fixo")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={FLUTUANTE.rotulo}
      className="wa-flutuante group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 md:bottom-6 md:right-6"
    >
      <span aria-hidden className="wa-pulso absolute inset-0 rounded-full bg-[#25D366]" />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgb(37_211_102/0.55),0_4px_12px_rgb(12_16_20/0.5)] transition duration-300 ease-serra group-hover:scale-105 group-hover:bg-[#20bd5a] md:size-16">
        <IconeWhatsApp className="size-7 md:size-8" />
      </span>
      {/* dica no hover, só no desktop */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-gold-light/15 bg-ink-card/95 px-4 py-2 text-[0.8125rem] font-medium text-gold-light opacity-0 shadow-lg backdrop-blur-md transition duration-300 ease-serra group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        {FLUTUANTE.dica}
      </span>
    </a>
  );
}
