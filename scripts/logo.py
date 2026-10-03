"""Gera os derivados do logo a partir da arte do cliente.

Arte usada: o logo dourado (VG + VALDO GOMES + ADVOCACIA), que já vem com
fundo transparente. O brilho suave em volta das letras tem alfa baixo; abaixo
de LIMIAR ele é descartado, senão vira uma névoa clara no fundo escuro.

Saídas em src/assets/logo/ (importadas pelo next/image):
  valdo-gomes.png   logo completo (VG + nome + ADVOCACIA)
  marca.png         só o monograma VG, para o cabeçalho e o selo do topo

O selo circular vinho (midia/logo/logo-original.webp) ficou guardado como
material do cliente, mas não é mais usado no site.
"""

from pathlib import Path

import numpy as np
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "midia" / "logo" / "logo-dourado-original.webp"
DESTINO = RAIZ / "src" / "assets" / "logo"
LIMIAR = 40
# Na arte (1254x1254) o VG termina por volta de y=690 e o nome começa em y=725.
CORTE_VG = 705


def limpar(img: Image.Image) -> Image.Image:
    a = np.asarray(img).copy()
    alfa = a[..., 3].astype(np.float64)
    # rampa curta: some o brilho, a borda do ouro continua suave
    a[..., 3] = np.clip((alfa - LIMIAR) / (180 - LIMIAR) * 255, 0, 255).astype(np.uint8)
    return Image.fromarray(a, "RGBA")


def recortar(img: Image.Image, margem: int = 4) -> Image.Image:
    caixa = img.getchannel("A").point(lambda v: 255 if v > 0 else 0).getbbox()
    assert caixa, "logo vazio"
    x0, y0, x1, y1 = caixa
    return img.crop((max(x0 - margem, 0), max(y0 - margem, 0), x1 + margem, y1 + margem))


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    arte = limpar(Image.open(ORIGEM).convert("RGBA"))

    completo = recortar(arte)
    completo.thumbnail((1000, 1000), Image.LANCZOS)
    completo.save(DESTINO / "valdo-gomes.png", optimize=True)

    marca = recortar(arte.crop((0, 0, arte.width, CORTE_VG)))
    marca.thumbnail((360, 360), Image.LANCZOS)
    marca.save(DESTINO / "marca.png", optimize=True)

    for nome in ("valdo-gomes.png", "marca.png"):
        img = Image.open(DESTINO / nome)
        print(nome, img.size, f"{(DESTINO / nome).stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
