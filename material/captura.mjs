/**
 * Capturas de verificação em faixas (desktop e celular) + métricas:
 * estouro horizontal, erros de console, h1/h2.
 *   node material/captura.mjs [url] [pasta-saida]
 */
import puppeteer from "puppeteer-core";

const URL = process.argv[2] ?? "http://localhost:5242/";
const SAIDA = process.argv[3] ?? "material/capturas";
const navegador = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});

for (const [nome, largura, altura] of [
  ["desktop", 1440, 900],
  ["celular", 390, 844],
]) {
  const pagina = await navegador.newPage();
  const erros = [];
  pagina.on("pageerror", (e) => erros.push(String(e)));
  pagina.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  await pagina.setViewport({ width: largura, height: altura, deviceScaleFactor: 1 });
  await pagina.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await pagina.goto(URL, { waitUntil: "networkidle0", timeout: 180000 });
  const total = await pagina.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < total; y += altura) {
    await pagina.evaluate((v) => window.scrollTo(0, v), y);
    await new Promise((r) => setTimeout(r, 350));
    await pagina.screenshot({ path: `${SAIDA}/${nome}-${String(i++).padStart(2, "0")}.png` });
  }
  const metricas = await pagina.evaluate(() => ({
    largura: document.documentElement.scrollWidth,
    h1: [...document.querySelectorAll("h1")].length,
    h2: [...document.querySelectorAll("h2")].map((h) => h.textContent.slice(0, 40)),
  }));
  console.log(nome, total, JSON.stringify(metricas), erros.slice(0, 5));
  await pagina.close();
}
await navegador.close();
