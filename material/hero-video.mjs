/**
 * Confere o vídeo do topo com movimento liberado: se carregou, se está
 * tocando e em que resolução; captura o topo e o hover dos botões.
 *   node material/hero-video.mjs <url> <pasta>
 */
import puppeteer from "puppeteer-core";

const [URL = "http://localhost:5244/", SAIDA = "material", MOVIMENTO = "no-preference"] = process.argv.slice(2);
const navegador = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--autoplay-policy=no-user-gesture-required"] });
for (const [nome, largura, altura] of [["desktop", 1440, 900], ["celular", 390, 844]]) {
  const pagina = await navegador.newPage();
  await pagina.setViewport({ width: largura, height: altura, deviceScaleFactor: 1 });
  await pagina.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: MOVIMENTO }]);
  await pagina.goto(URL, { waitUntil: "networkidle2", timeout: 120000 });
  await pagina.waitForFunction(() => { const v = document.querySelector("#topo video"); return v && v.currentTime > 2.5; }, { timeout: 60000 }).catch(() => {});
  const video = await pagina.evaluate(() => {
    const v = document.querySelector("#topo video");
    return v && { src: v.currentSrc.split("/").slice(-2).join("/"), tocando: !v.paused, tempo: +v.currentTime.toFixed(1), resolucao: `${v.videoWidth}x${v.videoHeight}`, opacidade: getComputedStyle(v).opacity, mudo: v.muted };
  });
  await new Promise((r) => setTimeout(r, 1200));
  await pagina.screenshot({ path: `${SAIDA}/${nome}-topo.png` });
  if (nome === "desktop") {
    const botao = await pagina.$("#topo a.btn-ouro");
    await botao.hover();
    await new Promise((r) => setTimeout(r, 900));
    const caixa = await botao.boundingBox();
    await pagina.screenshot({ path: `${SAIDA}/botoes-hover.png`, clip: { x: caixa.x - 20, y: caixa.y - 20, width: 620, height: caixa.height + 40 } });
  }
  // confere o loop: depois de passar dos 10 s, o tempo tem de ter voltado ao começo
  await new Promise((r) => setTimeout(r, 9000));
  const loop = await pagina.evaluate(() => { const v = document.querySelector("#topo video"); return v && { loop: v.loop, tempo: +v.currentTime.toFixed(1), tocando: !v.paused }; });
  console.log(nome, JSON.stringify(video), "depois de 9 s:", JSON.stringify(loop));
  await pagina.close();
}
await navegador.close();
