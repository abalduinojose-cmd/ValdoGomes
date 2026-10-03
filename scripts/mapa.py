"""
Mapas estáticos das duas unidades na identidade do site: mosaico de tiles do
OpenStreetMap em zoom de rua (17), centrado em cada endereço e recolorido
como mapa noturno: quadras em preto, prédios em vinho escuro, ruas em
dourado apagado, vias principais em dourado e os nomes em creme.

Coordenadas pelo Nominatim (OSM). O OSM não tem a numeração dessas ruas,
então o centro é a própria rua; o link "Abrir no Google Maps" leva ao
endereço exato.

O pino NÃO é assado aqui: a UI desenha o marcador no centro exato.
Exige o crédito visível "© OpenStreetMap" onde o mapa aparecer.
Imagem local: zero requisição de terceiro e zero cookie na página.

    python scripts/mapa.py
"""
import io
import math
import time
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image

UNIDADES = {
    "centro": (-22.4686695, -44.4480245),  # Rua Doutor Luiz Barreto, 68
    "alegria": (-22.4827150, -44.4960290),  # Rua das Palmeiras, 455 (Cidade Alegria)
}
Z = 17
W, H, T = 1200, 900, 256
PASTA = Path(__file__).resolve().parent.parent / "src" / "assets" / "mapa"

def cor(hexa: str) -> np.ndarray:
    return np.array([int(hexa[i : i + 2], 16) for i in (1, 3, 5)]) / 255


def gerar(nome: str, LAT: float, LNG: float) -> None:
    n = 2**Z
    xf = (LNG + 180) / 360 * n
    lr = math.radians(LAT)
    yf = (1 - math.log(math.tan(lr) + 1 / math.cos(lr)) / math.pi) / 2 * n
    x0, y0 = math.floor(xf - W / 2 / T) - 1, math.floor(yf - H / 2 / T) - 1
    x1, y1 = math.floor(xf + W / 2 / T) + 1, math.floor(yf + H / 2 / T) + 1

    mosaico = Image.new("RGB", ((x1 - x0 + 1) * T, (y1 - y0 + 1) * T))
    for x in range(x0, x1 + 1):
        for y in range(y0, y1 + 1):
            req = urllib.request.Request(
                f"https://tile.openstreetmap.org/{Z}/{x}/{y}.png",
                headers={"User-Agent": "ValdoGomesSite/1.0 (mapa estatico, geracao unica)"},
            )
            tile = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=30).read())).convert("RGB")
            mosaico.paste(tile, ((x - x0) * T, (y - y0) * T))
            time.sleep(0.1)

    px, py = round((xf - x0) * T), round((yf - y0) * T)
    img = mosaico.crop((px - W // 2, py - H // 2, px + W // 2, py + H // 2))

    a = np.asarray(img).astype(float) / 255
    R, G, B = a[..., 0], a[..., 1], a[..., 2]
    L = 0.2126 * R + 0.7152 * G + 0.0722 * B


    # Rampa invertida: a tinta do OSM (texto, contorno) vira champagne; a quadra
    # vira o preto quente do site; os prédios ficam um tom acima do chão.
    champagne, predio, chao = cor("#e9d6c4"), cor("#3a1416"), cor("#0e0b0d")
    t = np.clip((L - 0.35) / 0.6, 0, 1)[..., None]
    base = np.where(t < 0.8, champagne + (predio - champagne) * (t / 0.8), predio + (chao - predio) * ((t - 0.8) / 0.2))

    # Via local (branca no OSM) em bronze apagado; via principal (amarelo e
    # laranja no OSM: R alto, B baixo) em ouro.
    branca = np.clip((L - 0.962) / 0.038, 0, 1)[..., None]
    quente = (np.clip((R - 0.93) / 0.07, 0, 1) * np.clip((0.86 - B) / 0.15, 0, 1) * (G > 0.72))[..., None]
    rua, ouro = cor("#5c4537"), cor("#cfa58d")
    saida = base * (1 - branca) + rua * branca
    saida = saida * (1 - quente) + ouro * quente

    # Verde e água viram tons escuros próprios, para o olho achar o rio e as praças.
    verde = ((G - R) > 0.06) & ((G - B) > 0.06)
    agua = (B - R) > 0.12
    saida[verde] = saida[verde] * 0.35 + cor("#161a10") * 0.65
    saida[agua] = saida[agua] * 0.25 + cor("#0c1418") * 0.75

    PASTA.mkdir(parents=True, exist_ok=True)
    destino = PASTA / f"{nome}.jpg"
    Image.fromarray((np.clip(saida, 0, 1) * 255).astype("uint8")).save(destino, quality=84, optimize=True, progressive=True)
    print("mapa salvo", destino.name, W, H)


for nome, (lat, lng) in UNIDADES.items():
    gerar(nome, lat, lng)
