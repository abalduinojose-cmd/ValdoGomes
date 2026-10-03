/**
 * Confere a prévia publicada (ou servida localmente na subpasta): lista
 * respostas >= 400, imagens quebradas e erros de console.
 *   node material/previa.mjs <url>
 */
import puppeteer from "puppeteer-core";

const URL = process.argv[2] ?? "http://localhost:5250/ValdoGomes/";
const navegador = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const pagina = await navegador.newPage();
const falhas = [];
const erros = [];
pagina.on("response", (r) => r.status() >= 400 && falhas.push(`${r.status()} ${r.url()}`));
pagina.on("pageerror", (e) => erros.push(String(e)));
pagina.on("console", (m) => m.type() === "error" && erros.push(m.text()));
await pagina.setViewport({ width: 1440, height: 900 });
await pagina.goto(URL, { waitUntil: "networkidle0", timeout: 120000 });
const total = await pagina.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 800) {
  await pagina.evaluate((v) => window.scrollTo(0, v), y);
  await new Promise((r) => setTimeout(r, 120));
}
await new Promise((r) => setTimeout(r, 1500));
const info = await pagina.evaluate(() => ({
  imagens: document.images.length,
  quebradas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
  status: document.querySelector("#topo [aria-live]")?.textContent,
  og: document.querySelector('meta[property="og:image"]')?.content,
}));
console.log(JSON.stringify({ falhas, erros, ...info }, null, 1));
await navegador.close();
