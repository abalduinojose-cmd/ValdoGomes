/**
 * Fonte única da verdade do site. Todo texto, link e dado de contato vive
 * aqui; os componentes só desenham.
 *
 * Copy revisada pelo Provimento 205/2021 da OAB: linguagem informativa, sem
 * superlativos, sem promessa de resultado, sem preço e sem urgência. Antes
 * de mudar qualquer frase, reler essas vedações.
 *
 * Campos vazios (como a OAB) simplesmente não aparecem no site: basta
 * preencher aqui para entrarem no hero, no rodapé e no JSON-LD.
 */

export type IconeArea = "trabalho" | "previdencia" | "civil" | "consumidor";

/** Origem do contato: vai escrita na mensagem para identificar o lead. */
export type Origem =
  | "cabecalho"
  | "hero"
  | "areas"
  | "sobre"
  | "atendimento"
  | "perguntas"
  | "contato"
  | "agendar"
  | "fixo";

const WHATSAPP_NUMERO = "5524988084941";

const SAUDACAO = "Olá! Vim pelo site da Advocacia Valdo Gomes";

const MENSAGENS: Record<Origem, string> = {
  cabecalho: `${SAUDACAO} e gostaria de atendimento.`,
  hero: `${SAUDACAO} e gostaria de falar sobre o meu caso.`,
  areas: `${SAUDACAO} e gostaria de orientação jurídica.`,
  sobre: `${SAUDACAO} e gostaria de agendar um atendimento.`,
  atendimento: `${SAUDACAO}, vi como funciona o atendimento e gostaria de falar sobre o meu caso.`,
  perguntas: `${SAUDACAO} e tenho uma dúvida que não encontrei nas perguntas frequentes.`,
  contato: `${SAUDACAO} e gostaria de agendar um atendimento.`,
  agendar: `${SAUDACAO} e gostaria de pré-agendar um atendimento.`,
  fixo: `${SAUDACAO} e gostaria de atendimento.`,
};

/** Link do WhatsApp com a mensagem da seção de origem. */
export function whatsapp(origem: Origem, assunto?: string): string {
  const texto = assunto ? `${SAUDACAO} e gostaria de orientação sobre ${assunto}.` : MENSAGENS[origem];
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

export const SITE = {
  /** Trocar pelo domínio definitivo quando o cliente registrar. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abalduinojose-cmd.github.io/ValdoGomes",
  nome: "Valdo Gomes Advocacia",
  titulo: "Valdo Gomes Advocacia | Trabalhista e Previdenciário em Resende-RJ",
  descricao:
    "Advocacia trabalhista, previdenciária, cível e do consumidor em Resende-RJ, com mais de 30 anos de experiência. Duas unidades na cidade e atendimento online para todo o Brasil.",
  palavrasChave: [
    "advogado trabalhista Resende",
    "advogado previdenciário Resende",
    "aposentadoria INSS Resende",
    "advogado BPC LOAS Resende",
    "advogado do consumidor Resende",
    "Valdo Gomes advocacia",
  ],
  locale: "pt_BR",
  ogAlt: "Selo da Valdo Gomes Advocacia sobre fundo preto",
} as const;

export const ADVOGADA = {
  nome: "Valdo Gomes",
  nomeCompleto: "Valdo Gomes Advocacia",
  titulo: "Advocacia",
  /** Ex.: "OAB/RJ 123.456". Vazio, não aparece. O Provimento 205/2021 pede o número visível. */
  oab: "",
  experiencia: "+30 anos de experiência",
} as const;

export type Unidade = {
  readonly id: "centro" | "alegria";
  readonly nome: string;
  readonly bairro: string;
  readonly rua: string;
  readonly cep: string;
  readonly linha: string;
  readonly regra: string;
  readonly mapa: string;
  readonly geo: { readonly latitude: number; readonly longitude: number };
};

const UNIDADES: readonly Unidade[] = [
  {
    id: "centro",
    nome: "Unidade Centro",
    bairro: "Centro · Resende-RJ",
    rua: "Rua Doutor Luiz Barreto, 68",
    cep: "27511-240",
    linha: "Rua Doutor Luiz Barreto, 68, Centro, Resende-RJ",
    regra: "Atendimento mediante agendamento",
    mapa: "https://www.google.com/maps/search/?api=1&query=Advocacia%20Valdo%20Gomes%2C%20R.%20Dr.%20Lu%C3%ADs%20Barreto%2C%2068%20-%20Centro%2C%20Resende%20-%20RJ",
    geo: { latitude: -22.4686695, longitude: -44.4480245 },
  },
  {
    id: "alegria",
    nome: "Unidade Cidade Alegria",
    bairro: "Cidade Alegria · Resende-RJ",
    rua: "Rua das Palmeiras, 455",
    cep: "",
    linha: "Rua das Palmeiras, 455, Cidade Alegria, Resende-RJ",
    regra: "Atendimento por ordem de chegada",
    mapa: "https://www.google.com/maps/search/?api=1&query=Rua%20das%20Palmeiras%2C%20455%2C%20Cidade%20Alegria%2C%20Resende%20-%20RJ",
    geo: { latitude: -22.482715, longitude: -44.496029 },
  },
];

export const CONTATO = {
  whatsappExibicao: "(24) 98808-4941",
  telefone: "+55-24-3355-4265",
  telefonesFixos: ["(24) 3355-4265", "(24) 3360-3084"],
  instagram: "https://www.instagram.com/valdogomesadvocacia/",
  instagramUsuario: "@valdogomesadvocacia",
  google: "https://share.google/0SpkCsVdAsHugKJ1R",
  googleAvaliacoes: "https://share.google/0SpkCsVdAsHugKJ1R",
  cidade: "Resende",
  estado: "RJ",
  pais: "BR",
  atendimento: "Presencial em Resende-RJ e online em todo o Brasil",
  horario: "Segunda a sexta-feira, das 8h às 17h",
  unidades: UNIDADES,
  /** A unidade principal (endereço do Perfil da Empresa no Google). */
  endereco: {
    rua: UNIDADES[0]!.rua,
    bairro: "Centro",
    cep: UNIDADES[0]!.cep,
    linha: UNIDADES[0]!.linha,
  },
  geo: UNIDADES[0]!.geo,
  mapa: UNIDADES[0]!.mapa,
} as const;

export const NAV = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#areas", rotulo: "Áreas" },
  { href: "#escritorio", rotulo: "Unidades" },
  { href: "#avaliacoes", rotulo: "Avaliações" },
  { href: "#perguntas", rotulo: "Dúvidas" },
  { href: "#agendar", rotulo: "Agendar" },
] as const;

export const A11Y = {
  pularConteudo: "Pular para o conteúdo",
  inicio: "Valdo Gomes Advocacia, voltar ao início",
  navPrincipal: "Navegação principal",
  navCelular: "Navegação do site",
  abrirMenu: "Abrir menu",
  fecharMenu: "Fechar menu",
  whatsappFixo: "Conversar com a Advocacia Valdo Gomes pelo WhatsApp",
  anterior: "Avaliações anteriores",
  proxima: "Próximas avaliações",
  trilhoAvaliacoes: "Avaliações de clientes no Google",
} as const;

export const ACOES = {
  whatsapp: "Conversar pelo WhatsApp",
  whatsappCurto: "WhatsApp",
} as const;

export const HERO = {
  /** Chip do topo: o monograma, o nome e a cidade, como um cartão de visita. */
  chipNome: "Valdo Gomes Advocacia",
  /** Aparece no HTML estático; no navegador vira o status ao vivo (aberto/fechado). */
  chipDetalhe: ["Seg. a sex. · 8h às 17h", ADVOGADA.oab].filter(Boolean).join(" · "),
  /** Linha de atuação logo abaixo do chip. */
  areas: ["Trabalhista", "Previdenciário", "Cível", "Consumidor"],
  titulo: "Seu direito é",
  tituloDestaque: "prioridade aqui",
  /** Abertura em duas vozes: a frase-chave em destaque e o apoio mais leve. */
  subtituloDestaque: "Você conta o que aconteceu.",
  subtitulo: "Nós explicamos os seus direitos sem juridiquês e acompanhamos cada etapa, do primeiro contato à conclusão do caso.",
  local: CONTATO.atendimento,
  cta: "Falar sobre o meu caso",
  ctaSecundario: "Ver as áreas de atuação",
  /** Faixa do pé do hero: um dado forte + um complemento curto, com ícone. */
  selos: [
    { icone: "estrela", valor: "4,9 no Google", detalhe: "67 avaliações" },
    { icone: "relogio", valor: "+30 anos", detalhe: "de experiência" },
    { icone: "local", valor: "2 unidades", detalhe: "em Resende-RJ" },
    { icone: "online", valor: "Online", detalhe: "em todo o Brasil" },
  ],
  retratoAlt: "Fachada da Advocacia Valdo Gomes, com o letreiro do escritório",
} as const;

export type Area = {
  readonly id: string;
  readonly icone: IconeArea;
  readonly titulo: string;
  readonly descricao: string;
  /** Usado na mensagem do WhatsApp: "gostaria de orientação sobre ..." */
  readonly assunto: string;
  readonly topicos?: readonly string[];
};

export const AREAS = {
  id: "areas",
  rotulo: "Áreas de atuação",
  titulo: "Em que podemos ajudar você?",
  lead: "Toque no assunto mais parecido com o seu caso. A conversa começa no WhatsApp, já com o tema, e a equipe orienta os próximos passos.",
  destaqueRotulo: "Área principal",
  saibaMais: "Conversar sobre este tema",
  itens: [
    {
      id: "trabalhista",
      icone: "trabalho",
      titulo: "Trabalhista",
      descricao: "Defesa dos direitos de quem trabalha, do registro na carteira até a rescisão.",
      assunto: "direito trabalhista",
      topicos: [
        "Trabalho sem carteira assinada",
        "Rescisão indireta",
        "Horas extras",
        "Doença profissional",
        "Acidente de trabalho",
        "Assédio moral",
      ],
    },
    {
      id: "previdenciario",
      icone: "previdencia",
      titulo: "Previdenciário",
      descricao: "Pedidos e revisões de benefícios do INSS, inclusive após uma negativa.",
      assunto: "direito previdenciário (INSS)",
      topicos: [
        "Aposentadoria",
        "Auxílio por incapacidade",
        "Pensão por morte",
        "BPC/LOAS",
        "Demais benefícios do INSS",
      ],
    },
    {
      id: "civil",
      icone: "civil",
      titulo: "Cível",
      descricao: "Responsabilidade civil, contratos e questões bancárias do dia a dia.",
      assunto: "direito cível",
      topicos: [
        "Erro médico",
        "Acidentes de trânsito",
        "Problemas bancários",
        "Revisão de contratos e empréstimos",
      ],
    },
    {
      id: "consumidor",
      icone: "consumidor",
      titulo: "Consumidor",
      descricao: "Orientação para quem teve o direito de consumidor desrespeitado.",
      assunto: "direito do consumidor",
      topicos: [
        "Cobranças indevidas",
        "Produtos com defeito",
        "Empréstimos não contratados",
        "Juros abusivos",
      ],
    },
  ] satisfies readonly Area[],
} as const;

export const SOBRE = {
  id: "sobre",
  rotulo: "Sobre o escritório",
  titulo: "Advocacia humanizada e comprometida com você",
  frase: "Há clientes que contam com o escritório há mais de vinte anos.",
  paragrafos: [
    "O escritório do Dr. Valdo Gomes cresceu com a confiança de quem foi atendido. Hoje reúne uma equipe de advogados e de atendimento preparada para receber cada pessoa com respeito, do primeiro contato ao fim do processo.",
    "Antes de indicar qualquer caminho, a equipe escuta a história de quem chega, analisa os documentos e explica as possibilidades em linguagem simples. A decisão é sempre tomada com informação e segurança.",
  ],
  fotoAlt: "Recepção da Advocacia Valdo Gomes, com teto de madeira e paredes em vinho",
  cta: "Agendar um atendimento",
} as const;

/** Full-bleed com foto do escritório e trechos reais do Google. */
export const FRASE = {
  poetico: "Por trás de cada processo existe uma história.",
  apoio: "E ela merece ser ouvida com atenção.",
  fotoAlt: "Recepção da Advocacia Valdo Gomes vista do corredor",
  citacoes: [
    { texto: "a atenção e o cuidado durante todo o atendimento fizeram toda a diferença", autor: "Claudia Amorim" },
    { texto: "atendimento e estrutura de qualidade, profissionais preparados", autor: "Gustavo Almeida" },
    { texto: "várias informações e muitas questões resolvidas", autor: "Helia Oliveira" },
  ],
  nota: "Trechos de avaliações publicadas no Perfil da Empresa no Google.",
} as const;

export const DIFERENCIAIS = {
  rotulo: "Como é o atendimento",
  itens: [
    {
      icone: "conversa",
      titulo: "Personalizado",
      descricao: "Cada caso é analisado a partir da história de quem chega, sem respostas prontas.",
    },
    {
      icone: "inventario",
      titulo: "Humanizado",
      descricao:
        "Você é recebido com escuta, paciência e explicações em linguagem simples, do primeiro contato ao fim do processo.",
    },
    {
      icone: "relogio",
      titulo: "Comprometido",
      descricao: "Acompanhamento próximo e retorno sobre o andamento do seu caso sempre que precisar.",
    },
  ],
} as const;

export const PROCESSO = {
  id: "atendimento",
  rotulo: "Como funciona o atendimento",
  titulo: "Do primeiro contato ao acompanhamento do seu caso",
  lead: "Saber o que vem pela frente traz tranquilidade. Este é o caminho de um atendimento no escritório.",
  passos: [
    {
      titulo: "Primeiro contato",
      descricao:
        "Pelo WhatsApp, por telefone ou pessoalmente. Você conta o que aconteceu e tira as primeiras dúvidas.",
    },
    {
      titulo: "Análise do caso",
      descricao:
        "Avaliamos a situação e os documentos, como carteira de trabalho, contracheques, extrato do INSS e laudos, conforme o caso.",
    },
    {
      titulo: "Orientação clara",
      descricao:
        "Explicamos os caminhos possíveis, os prazos e o que cada um exige, em linguagem simples, para você decidir com segurança.",
    },
    {
      titulo: "Acompanhamento",
      descricao: "Acompanhamos cada etapa do processo e mantemos você informado sobre o andamento.",
    },
  ],
  nota: "O tempo de cada caso depende do tipo de ação e do andamento na Justiça ou no INSS. No primeiro atendimento, explicamos o que esperar.",
  cta: "Falar sobre o meu caso",
} as const;

export type Pergunta = {
  readonly id: string;
  readonly pergunta: string;
  readonly resposta: string;
};

export const PERGUNTAS = {
  id: "perguntas",
  rotulo: "Perguntas frequentes",
  titulo: "Dúvidas comuns de quem nos procura",
  lead: "Se a sua pergunta não estiver aqui, envie pelo WhatsApp. A equipe responde com atenção e sem compromisso de contratação.",
  cta: "Enviar minha dúvida",
  itens: [
    {
      id: "sem-carteira",
      pergunta: "Trabalhei sem carteira assinada. Tenho direitos?",
      resposta:
        "Em geral, sim. Quando existe relação de emprego (trabalho pessoal, frequente, com subordinação e salário), a lei garante direitos mesmo sem registro, como o reconhecimento do vínculo, FGTS, férias e 13º salário. Cada caso depende das provas, como mensagens, testemunhas e comprovantes de pagamento.",
    },
    {
      id: "prazo-trabalhista",
      pergunta: "Qual o prazo para entrar com uma ação trabalhista?",
      resposta:
        "A ação deve ser proposta em até 2 anos depois do fim do contrato de trabalho, e é possível cobrar os direitos dos últimos 5 anos. Por isso vale buscar orientação assim que sair do emprego.",
    },
    {
      id: "inss-negou",
      pergunta: "O INSS negou meu benefício. O que fazer?",
      resposta:
        "É possível recorrer na via administrativa ou buscar o benefício na Justiça, conforme o caso. Analisamos a carta de indeferimento, o extrato de contribuições (CNIS) e os laudos para indicar o caminho mais adequado.",
    },
    {
      id: "bpc",
      pergunta: "O que é o BPC/LOAS?",
      resposta:
        "É um benefício assistencial de um salário mínimo para a pessoa idosa a partir de 65 anos ou para a pessoa com deficiência, em família de baixa renda. Não exige contribuição ao INSS. Os critérios de renda e a documentação são analisados caso a caso.",
    },
    {
      id: "documentos",
      pergunta: "Quais documentos levar ao primeiro atendimento?",
      resposta:
        "Documento com foto, CPF e comprovante de residência. Conforme o assunto: carteira de trabalho, contracheques e termo de rescisão (trabalhista); extrato do CNIS, laudos e cartas do INSS (previdenciário); contratos, faturas e comprovantes (cível e consumidor). Se faltar algo, orientamos como conseguir.",
    },
    {
      id: "online",
      pergunta: "Vocês atendem fora de Resende?",
      resposta:
        "Sim. Além das duas unidades em Resende-RJ, atendemos online pessoas de todo o Brasil, por WhatsApp e videochamada. Os documentos podem ser enviados em formato digital.",
    },
    {
      id: "custo",
      pergunta: "Quanto custa?",
      resposta:
        "Os honorários dependem do tipo e da complexidade da causa e seguem a tabela da OAB. Tudo é explicado com transparência no primeiro atendimento.",
    },
  ] satisfies readonly Pergunta[],
} as const;

export const CONTATO_SECAO = {
  id: "contato",
  rotulo: "Contato",
  lead: "Conte brevemente o que aconteceu. A equipe responde em horário comercial e indica o melhor caminho para o seu atendimento.",
  cta: ACOES.whatsapp,
} as const;

export const RODAPE = {
  aviso:
    "Conteúdo de caráter exclusivamente informativo, em conformidade com o Código de Ética e Disciplina da OAB e o Provimento 205/2021. As informações deste site não substituem a análise individual de cada caso.",
  direitos: "Todos os direitos reservados.",
  navTitulo: "Mapa do site",
} as const;

/** Galeria do escritório (no lugar dos vídeos da Luciene). Fotos do Perfil no Google. */
export const GALERIA = {
  id: "estrutura",
  rotulo: "Nosso espaço",
  titulo: "Um escritório pensado para receber você bem",
  lead: "Recepção confortável, salas de atendimento e de reunião para conversar com calma sobre o seu caso.",
  instagramTitulo: "Acompanhe no Instagram",
  instagramTexto: "Direitos trabalhistas, previdenciários e do consumidor explicados em linguagem simples.",
  instagramCta: "Seguir no Instagram",
  fotos: [
    { chave: "fachada", alt: "Fachada do escritório com o letreiro Advocacia" },
    { chave: "recepcao", alt: "Recepção com teto de madeira e o logo VG na parede" },
    { chave: "reuniao", alt: "Sala de reunião com mesa ampla e janelas" },
    { chave: "espera", alt: "Corredor com poltronas de espera e quadros" },
    { chave: "reuniao2", alt: "Sala de reunião vista da entrada" },
  ],
} as const;

export type Avaliacao = {
  /** Nome do arquivo em src/assets/avaliacoes. */
  readonly foto: string;
  readonly nome: string;
  /** Texto verbatim do Google. Trechos cortados levam [...]. */
  readonly texto: string;
  readonly data: string;
};

/**
 * 15 avaliações reais do Perfil no Google, coletadas em 02/10/2026 (de 60
 * carregadas). Seleção pelo Provimento 205/2021: ficaram de fora as que
 * falam em "sempre ganhamos", "vitória conquistada" ou "o melhor da cidade".
 * Prioridade para quem tem foto de perfil real. Duas aparecem em trecho.
 */
export const AVALIACOES = {
  id: "avaliacoes",
  rotulo: "Avaliações no Google",
  titulo: "O que dizem as pessoas atendidas",
  nota: "4,9",
  total: 67,
  resumo: "67 avaliações no Google",
  verTodas: "Ler as 67 avaliações no Google",
  resumoTitulo: "Avaliação no Google",
  resumoTexto: "Nota dada por clientes do escritório no Perfil da Empresa no Google.",
  via: "Avaliação no Google",
  itens: [
    {
      foto: "anderson-santos",
      nome: "Anderson Santos",
      data: "setembro de 2026",
      texto:
        "Dr. Valdo e demais integrantes da sua equipe, sempre me auxiliando nos processos trabalhistas por mais de vinte anos. Muito obrigado!",
    },
    {
      foto: "adriana-maia",
      nome: "Adriana Maia",
      data: "setembro de 2026",
      texto:
        "Estou muito satisfeita com o atendimento prestado pelo escritório. Desde o início, fui atendida com atenção, respeito e profissionalismo. Sempre que precisei, tive retorno e esclarecimentos sobre as questões relacionadas ao meu caso, o que me trouxe segurança e tranquilidade durante todo o processo. [...] Sou muito grata por todo o cuidado e profissionalismo. Com certeza, recomendo o escritório!",
    },
    {
      foto: "miriellen-dal-col",
      nome: "Miriellen Dal-Col",
      data: "setembro de 2026",
      texto:
        "Ótimo escritório de advocacia! Fui muito bem atendida, com profissionalismo, atenção e tudo bem explicado, sem enrolação. A equipe entende do assunto, é comprometida e passa bastante confiança em todo o processo. Recomendo de verdade o trabalho deles!",
    },
    {
      foto: "william-oliveira",
      nome: "William Oliveira",
      data: "setembro de 2026",
      texto:
        "São muito atenciosos no atendimento, ficam o tempo que precisar para tirar minhas dúvidas. Ótimos advogados!",
    },
    {
      foto: "jonathan-veronese",
      nome: "Jonathan Veronese",
      data: "setembro de 2026",
      texto:
        "Ótimo advogado. Profissional de extrema confiança, transparente e com um atendimento excelente que faz toda a diferença.",
    },
    {
      foto: "cleyton-oliveira",
      nome: "Cleyton Oliveira",
      data: "setembro de 2026",
      texto:
        "Excelente escritório de advocacia. Sempre fui muito bem atendido, com profissionalismo, atenção e transparência. Demonstram conhecimento, comprometimento e realmente passam segurança ao cliente. Recomendo o trabalho de toda a equipe!",
    },
    {
      foto: "soyanne-silva",
      nome: "Soyanne Silva",
      data: "setembro de 2026",
      texto:
        "Fui muito bem atendida desde o primeiro contato, com muita educação, simpatia e atenção. [...] É muito bom ser recebido por alguém que transmite tanta gentileza e disposição em ajudar. [...] Super recomendo!",
    },
    {
      foto: "adriana-castro",
      nome: "Adriana Castro",
      data: "setembro de 2026",
      texto:
        "Super profissional! O Dr. Valdo Gomes é um advogado extremamente competente, ético e atencioso. Conduziu meu caso com maestria e transparência. Recomendo muito o seu trabalho!",
    },
    {
      foto: "nadia-lima",
      nome: "Nadia Barão Lima",
      data: "setembro de 2026",
      texto:
        "Advogados qualificados, muito prestativos, que nos passam segurança e fazem questão de esclarecer todas as dúvidas. Excelente!",
    },
    {
      foto: "luciana-gomes",
      nome: "Luciana Gomes",
      data: "setembro de 2026",
      texto:
        "Excepcional o atendimento! Desde o atendimento da secretária até a finalização do meu processo. Super satisfeita! Indico o escritório Advocacia Valdo Gomes e com certeza voltarei caso precise.",
    },
    {
      foto: "leonardo-marques",
      nome: "Leonardo Marques",
      data: "setembro de 2026",
      texto: "Atendimento cordial e objetivo. Clareza nas informações sobre o acompanhamento dos processos. Recomendo.",
    },
    {
      foto: "andrea-marques",
      nome: "Andrea Marques",
      data: "setembro de 2026",
      texto: "Excelente profissional, postura íntegra e honesta.",
    },
    {
      foto: "bia-souza",
      nome: "Bia Souza",
      data: "setembro de 2026",
      texto: "Excelentes profissionais, extremamente atenciosos e competentes, nota mil!",
    },
    {
      foto: "jessica-bernardo",
      nome: "Jéssica Bernardo",
      data: "setembro de 2026",
      texto: "Excelente equipe, ótimo atendimento Sr Valter e Dr Gabriel. Obrigada.",
    },
    {
      foto: "luciana-bento",
      nome: "Luciana Bento",
      data: "setembro de 2026",
      texto:
        "[...] Comprometimento, responsabilidade e muita integridade!!! Super recomendo Dr. Valdo Gomes, e sua equipe [...] Gratidão sempre.",
    },
  ] satisfies readonly Avaliacao[],
} as const;

/** O lugar da "Localização" do Cabana: as duas unidades, cada uma com o seu mapa. */
export const ESCRITORIO = {
  id: "escritorio",
  rotulo: "Unidades",
  titulo: "Duas unidades em Resende. E online para todo o Brasil.",
  lead: "Escolha a unidade mais perto de você ou fale pelo WhatsApp para ser atendido online, de onde estiver.",
  mapaTitulo: "Mapa da unidade",
  mapaAbrir: "Abrir no Google Maps",
  horario: CONTATO.horario,
  telefonesRotulo: "Telefones",
  nota: "Atendimento com atenção e sem pressa, presencial ou online.",
} as const;

export const FINAL = {
  titulo: "Vamos conversar sobre o seu caso?",
  cta: "Conversar pelo WhatsApp",
  fotoAlt: "Sala de reunião da Advocacia Valdo Gomes",
} as const;

export const FLUTUANTE = {
  rotulo: "Conversar com a Advocacia Valdo Gomes pelo WhatsApp",
  dica: "Fale com a equipe",
} as const;

/** Pré-agendamento: o formulário monta a mensagem e abre o WhatsApp. */
export const AGENDAR = {
  id: "agendar",
  rotulo: "Pré-agendamento",
  titulo: "Pré-agende o seu atendimento",
  lead: "Escolha o assunto e onde prefere ser atendido. A mensagem chega pronta no WhatsApp do escritório, e a equipe confirma o melhor horário com você.",
  passosTitulo: "Como funciona",
  passos: [
    { titulo: "Você preenche", texto: "Nome, assunto, unidade e o melhor período. Leva menos de um minuto." },
    { titulo: "O WhatsApp abre", texto: "A mensagem aparece pronta no seu WhatsApp. É só tocar em enviar." },
    { titulo: "A equipe responde", texto: "Em horário comercial, confirmamos o atendimento e tiramos as primeiras dúvidas." },
  ],
  horario: CONTATO.horario,
  privacidade: "Nenhum dado fica salvo no site: tudo vai direto para o seu WhatsApp. Sem compromisso de contratação.",
  campos: {
    nome: "Seu nome",
    nomePlaceholder: "Como podemos te chamar?",
    nomeErro: "Conte seu nome para a equipe saber com quem está falando.",
    assunto: "Assunto",
    formato: "Onde prefere ser atendido",
    periodo: "Melhor período",
    mensagem: "Quer adiantar algo? (opcional)",
    mensagemPlaceholder: "Por exemplo: trabalhei 3 anos sem carteira e fui dispensado no mês passado.",
  },
  assuntos: ["Trabalhista", "Previdenciário (INSS)", "BPC/LOAS", "Cível", "Consumidor", "Outro assunto"],
  formatos: ["Unidade Centro", "Unidade Cidade Alegria", "Online"],
  periodos: ["Manhã", "Tarde", "Tanto faz"],
  enviar: "Enviar pelo WhatsApp",
  /** Monta o texto que vai para o WhatsApp. O detalhe só entra se escrito. */
  mensagem(dados: {
    readonly nome: string;
    readonly assunto: string;
    readonly formato: string;
    readonly periodo: string;
    readonly detalhe: string;
  }): string {
    const detalhe = dados.detalhe.trim();
    return [
      "Olá! Vim pelo site da Advocacia Valdo Gomes e gostaria de pré-agendar um atendimento.",
      "",
      `Nome: ${dados.nome.trim() || "..."}`,
      `Assunto: ${dados.assunto}`,
      `Atendimento: ${dados.formato}`,
      `Melhor período: ${dados.periodo}`,
      ...(detalhe ? ["", detalhe] : []),
    ].join("\n");
  },
  link(texto: string): string {
    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  },
} as const;
