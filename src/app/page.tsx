import { Areas } from "@/components/sections/Areas";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { Contato } from "@/components/sections/Contato";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Escritorio } from "@/components/sections/Escritorio";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Frase } from "@/components/sections/Frase";
import { Galeria } from "@/components/sections/Galeria";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PreAgendamento } from "@/components/sections/PreAgendamento";
import { Processo } from "@/components/sections/Processo";
import { Sobre } from "@/components/sections/Sobre";
import { WhatsAppFlutuante } from "@/components/sections/WhatsAppFlutuante";
import { Silhueta } from "@/components/ui/Silhueta";

/** Mesma sequência do site da Luciene Garcia (que segue o Cabana Afrodite). */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Silhueta de="ink" para="soft" />
        <Areas />

        <Silhueta de="soft" para="ink" />
        <Sobre />
        <Diferenciais />

        <Frase />

        <Galeria />

        <Silhueta de="ink" para="soft" />
        <Avaliacoes />

        <Silhueta de="soft" para="ink" />
        <Escritorio />

        <Silhueta de="ink" para="soft" />
        <Processo />

        <Silhueta de="soft" para="ink" />
        <PreAgendamento />

        <Silhueta de="ink" para="soft" />
        <Faq />

        <Contato />
      </main>
      <Footer />
      <WhatsAppFlutuante />
    </>
  );
}
