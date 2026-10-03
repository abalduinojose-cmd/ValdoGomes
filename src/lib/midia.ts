/**
 * Imports estáticos das imagens. O next/image tira daqui largura, altura e
 * o blur de carregamento, então nenhuma foto causa layout shift.
 *
 * Fotos: Perfil da Empresa no Google (baixadas em midia/fotos e copiadas para
 * src/assets/fotos). Mapas: npm run mapa. Avatares: npm run avatares.
 */
import type { StaticImageData } from "next/image";

import fachada from "@/assets/fotos/fachada.jpg";
import recepcao from "@/assets/fotos/recepcao.jpg";
import recepcaoCorredor from "@/assets/fotos/recepcao-corredor.jpg";
import reuniao from "@/assets/fotos/reuniao.jpg";
import reuniao2 from "@/assets/fotos/reuniao-2.jpg";
import espera from "@/assets/fotos/espera.jpg";
import espera2 from "@/assets/fotos/espera-2.jpg";
import mapaCentro from "@/assets/mapa/centro.jpg";
import mapaAlegria from "@/assets/mapa/alegria.jpg";
import adrianaCastro from "@/assets/avaliacoes/adriana-castro.jpg";
import adrianaMaia from "@/assets/avaliacoes/adriana-maia.jpg";
import andersonSantos from "@/assets/avaliacoes/anderson-santos.jpg";
import andreaMarques from "@/assets/avaliacoes/andrea-marques.jpg";
import biaSouza from "@/assets/avaliacoes/bia-souza.jpg";
import cleytonOliveira from "@/assets/avaliacoes/cleyton-oliveira.jpg";
import jessicaBernardo from "@/assets/avaliacoes/jessica-bernardo.jpg";
import jonathanVeronese from "@/assets/avaliacoes/jonathan-veronese.jpg";
import leonardoMarques from "@/assets/avaliacoes/leonardo-marques.jpg";
import lucianaBento from "@/assets/avaliacoes/luciana-bento.jpg";
import lucianaGomes from "@/assets/avaliacoes/luciana-gomes.jpg";
import miriellenDalCol from "@/assets/avaliacoes/miriellen-dal-col.jpg";
import nadiaLima from "@/assets/avaliacoes/nadia-lima.jpg";
import soyanneSilva from "@/assets/avaliacoes/soyanne-silva.jpg";
import williamOliveira from "@/assets/avaliacoes/william-oliveira.jpg";

export const FOTOS = { fachada, recepcao, recepcaoCorredor, reuniao, reuniao2, espera, espera2 } as const;

/** Galeria: a chave do site-config aponta para a foto. */
export const GALERIA_FOTOS: Record<string, StaticImageData> = {
  fachada,
  recepcao,
  reuniao,
  espera,
  reuniao2,
};

export const MAPAS: Record<"centro" | "alegria", StaticImageData> = {
  centro: mapaCentro,
  alegria: mapaAlegria,
};

export const AVATARES: Record<string, StaticImageData> = {
  "adriana-castro": adrianaCastro,
  "adriana-maia": adrianaMaia,
  "anderson-santos": andersonSantos,
  "andrea-marques": andreaMarques,
  "bia-souza": biaSouza,
  "cleyton-oliveira": cleytonOliveira,
  "jessica-bernardo": jessicaBernardo,
  "jonathan-veronese": jonathanVeronese,
  "leonardo-marques": leonardoMarques,
  "luciana-bento": lucianaBento,
  "luciana-gomes": lucianaGomes,
  "miriellen-dal-col": miriellenDalCol,
  "nadia-lima": nadiaLima,
  "soyanne-silva": soyanneSilva,
  "william-oliveira": williamOliveira,
};
