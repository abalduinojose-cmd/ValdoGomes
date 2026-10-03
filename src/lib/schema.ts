/**
 * Geradores de JSON-LD tipados. Tudo sai de site-config.ts, então dado de
 * contato muda em um lugar só e o Google vê o mesmo que o visitante.
 */
import { ADVOGADA, AREAS, AVALIACOES, CONTATO, NAV, PERGUNTAS, SITE } from "@/lib/site-config";

type JsonLd = Record<string, unknown>;

const ID_ESCRITORIO = `${SITE.url}/#escritorio`;
const ID_ADVOGADO = `${SITE.url}/#advogado`;

const HORARIO = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:00",
  closes: "17:00",
} as const;

function endereco(rua: string, cep: string): JsonLd {
  return {
    "@type": "PostalAddress",
    streetAddress: rua,
    addressLocality: CONTATO.cidade,
    addressRegion: CONTATO.estado,
    ...(cep ? { postalCode: cep } : {}),
    addressCountry: CONTATO.pais,
  };
}

const REDES = [CONTATO.instagram, CONTATO.facebook, CONTATO.google];

/** O escritório (endereço da Unidade Centro, a do Perfil no Google) com as duas unidades como departamentos. */
export function legalService(): JsonLd {
  const [centro] = CONTATO.unidades;
  return {
    "@type": "LegalService",
    "@id": ID_ESCRITORIO,
    name: SITE.nome,
    description: SITE.descricao,
    url: SITE.url,
    image: `${SITE.url}/opengraph-image`,
    telephone: CONTATO.telefone,
    address: endereco(centro!.rua, centro!.cep),
    geo: { "@type": "GeoCoordinates", ...centro!.geo },
    openingHoursSpecification: HORARIO,
    areaServed: [
      { "@type": "City", name: "Resende" },
      { "@type": "State", name: "Rio de Janeiro" },
      { "@type": "Country", name: "Brasil" },
    ],
    knowsAbout: AREAS.itens.map((area) => `Direito ${area.titulo}`),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: AVALIACOES.total,
      bestRating: 5,
    },
    department: CONTATO.unidades.map((unidade) => ({
      "@type": "LegalService",
      "@id": `${SITE.url}/#unidade-${unidade.id}`,
      name: `${SITE.nome} · ${unidade.nome}`,
      address: endereco(unidade.rua, unidade.cep),
      geo: { "@type": "GeoCoordinates", ...unidade.geo },
      openingHoursSpecification: HORARIO,
      telephone: CONTATO.telefone,
      description: unidade.regra,
    })),
    founder: { "@id": ID_ADVOGADO },
    sameAs: REDES,
  };
}

export function attorney(): JsonLd {
  return {
    "@type": ["Person", "Attorney"],
    "@id": ID_ADVOGADO,
    name: ADVOGADA.nome,
    jobTitle: "Advogado",
    worksFor: { "@id": ID_ESCRITORIO },
    address: endereco(CONTATO.endereco.rua, CONTATO.endereco.cep),
    sameAs: [CONTATO.instagram, CONTATO.facebook],
  };
}

export function faqPage(): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#perguntas`,
    mainEntity: PERGUNTAS.itens.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}

export function breadcrumbList(): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: SITE.url },
      ...NAV.map((link, indice) => ({
        "@type": "ListItem",
        position: indice + 2,
        name: link.rotulo,
        item: `${SITE.url}/${link.href}`,
      })),
    ],
  };
}

/** Um único bloco com @graph: as entidades se referenciam pelos @id. */
export function grafo(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [legalService(), attorney(), faqPage(), breadcrumbList()],
  };
}
