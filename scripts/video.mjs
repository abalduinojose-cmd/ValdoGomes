/**
 * Prepara o vídeo do topo (tour do escritório, 720x1280, 10 s).
 *
 * Sem recompressão: o vídeo é copiado como está (`-c:v copy`), na qualidade
 * original. Só sai o áudio (vídeo de fundo precisa ser mudo para o navegador
 * deixar tocar sozinho) e o índice vai para o início do arquivo
 * (`+faststart`), para começar a tocar antes de baixar inteiro.
 * O primeiro quadro vira o pôster, que aparece na hora e é o LCP.
 *
 *   npm run video
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const RAIZ = fileURLToPath(new URL("..", import.meta.url));
const ORIGEM = join(RAIZ, "midia", "videos", "hero-original.mp4");
const VIDEO = join(RAIZ, "public", "videos", "hero.mp4");
const POSTER = join(RAIZ, "src", "assets", "fotos", "hero-video.jpg");

mkdirSync(join(RAIZ, "public", "videos"), { recursive: true });
const rodar = (args) => execFileSync(ffmpeg, ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });

rodar(["-i", ORIGEM, "-c:v", "copy", "-an", "-movflags", "+faststart", VIDEO]);
rodar(["-i", ORIGEM, "-frames:v", "1", "-q:v", "2", POSTER]);
console.log("hero.mp4", `${(statSync(VIDEO).size / 1048576).toFixed(1)} MB`, "· pôster", `${Math.round(statSync(POSTER).size / 1024)} KB`);
