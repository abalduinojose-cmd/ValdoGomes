/**
 * Testa o pré-agendamento: envio vazio mostra erro e foca o nome; preenchido,
 * abre o wa.me com a mensagem montada (window.open interceptado).
 *   node material/agendamento.mjs [url]
 */
import puppeteer from "puppeteer-core";

const URL = process.argv[2] ?? "http://localhost:5242/";
const navegador = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const pagina = await navegador.newPage();
await pagina.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await pagina.goto(URL, { waitUntil: "networkidle0", timeout: 120000 });
await pagina.evaluate(() => {
  window.__abertos = [];
  window.open = (u) => (window.__abertos.push(u), {});
});
await pagina.evaluate(() => document.querySelector("#agendar")?.scrollIntoView());
await pagina.click("#agendar button[type=submit]");
const vazio = await pagina.evaluate(() => ({
  erro: document.querySelector("#agendar [role=alert]")?.textContent ?? null,
  foco: document.activeElement?.getAttribute("name"),
  abertos: window.__abertos.length,
}));
await pagina.type("#agendar input[name=nome]", "Maria Souza");
await pagina.evaluate(() => [...document.querySelectorAll("#agendar label")].find((l) => l.textContent.trim() === "Previdenciário (INSS)")?.click());
await pagina.evaluate(() => [...document.querySelectorAll("#agendar label")].find((l) => l.textContent.includes("Cidade Alegria"))?.click());
await pagina.type("#agendar textarea", "Meu auxílio foi negado pelo INSS.");
await pagina.click("#agendar button[type=submit]");
const cheio = await pagina.evaluate(() => window.__abertos[0] ?? null);
const largura = await pagina.evaluate(() => document.documentElement.scrollWidth);
const caixa = await pagina.$("#agendar form");
await caixa.screenshot({ path: process.argv[3] ?? "material/agendamento.png" });
console.log(JSON.stringify({ vazio, largura, link: cheio, texto: cheio ? decodeURIComponent(cheio.split("text=")[1]) : null }, null, 1));
await navegador.close();
