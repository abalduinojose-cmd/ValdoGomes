/**
 * Screenshot de seções específicas em desktop e celular.
 *   node material/partes.mjs <url> <pasta> <seletor> [seletor...]
 */
import puppeteer from "puppeteer-core";

const [URL = "http://localhost:5242/", SAIDA = "material", ...seletores] = process.argv.slice(2);
const navegador = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
for (const [nome, largura, altura] of [["desktop", 1440, 900], ["celular", 390, 844]]) {
  const pagina = await navegador.newPage();
  await pagina.setViewport({ width: largura, height: altura, deviceScaleFactor: 1 });
  await pagina.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await pagina.goto(URL, { waitUntil: "networkidle0", timeout: 120000 });
  for (const [i, seletor] of seletores.entries()) {
    const el = await pagina.$(seletor);
    if (!el) { console.log("não achou", seletor); continue; }
    await el.scrollIntoView();
    // espera as imagens da seção terminarem (o dev gera a variante grande na hora)
    await pagina
      .waitForFunction((n) => [...n.querySelectorAll("img")].every((i) => i.complete && i.naturalWidth > 0), { timeout: 60000 }, el)
      .catch(() => console.log("imagens ainda carregando em", seletor));
    await new Promise((r) => setTimeout(r, 400));
    await el.screenshot({ path: `${SAIDA}/${nome}-parte${i}.png` });
  }
  await pagina.close();
}
await navegador.close();
