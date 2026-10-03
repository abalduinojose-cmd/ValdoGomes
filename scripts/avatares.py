"""Baixa a foto de perfil das 15 avaliações escolhidas do Google.

Coletadas no Chrome em 02/10/2026 (o Apify estava fora). Baixar em vez de
apontar para lh3.googleusercontent.com deixa o site independente do Google.
"""
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image

DESTINO = Path(__file__).resolve().parent.parent / "src" / "assets" / "avaliacoes"

FOTOS = {
    "anderson-santos": "a-/ALV-UjUA0DZOxDxmzguZPpHMgs4_RR5bYXa738KeFkXFE1B9gK21yzkgEw",
    "adriana-maia": "a-/ALV-UjVV_VXoq-P3Uw1ZvIUR3iTeFCQ2AFsdMgg6WS2Ef6K5MzXdQo5cdQ",
    "miriellen-dal-col": "a-/ALV-UjW3tj45VZxDmx2yfzyqg0042y3PkjZ7GVwZRGZ_ueqV-KNkqyyoBA",
    "william-oliveira": "a-/ALV-UjWD3zPjottu31mFGmvyaVjfjVaiPOeZtLRDAPwooBOR0fF9jMTh8w",
    "jonathan-veronese": "a-/ALV-UjX_0fDCuH3MOOsmhlRU8kerxFrAJo-3E9u71VZjh5kz-QyOFXWtCQ",
    "soyanne-silva": "a-/ALV-UjUkf2hk-brlEYY8UbhiurTzXpALDhJJrFY13vpL_OEdJDHkRjVibw",
    "andrea-marques": "a-/ALV-UjUj6PNHwYfBfC6bFqc1r3-K0Sqvoo0AVNrkICRp0AjqpRhSnqhooQ",
    "bia-souza": "a-/ALV-UjWKPKNyJb3NEcXqod6lYzGBjiDTeWzRmFr6YPgWVcsW9YfcRMI5",
    "jessica-bernardo": "a-/ALV-UjVb2uyaRjLPc77Kvnn7jqzJS7-dAT3vXJHXjN7uPMow05pIYpyE",
    "luciana-bento": "a-/ALV-UjWE0BfYRdB_tyXG0JmtzwXUJ7c56KVChrIEJmECct3sSj-2NhrU",
    "cleyton-oliveira": "a-/ALV-UjWWMp15CpNWAwN-WsuQEo7KUrUl7u5ooae2Y3tR-4Fn4ixc6yog",
    "luciana-gomes": "a-/ALV-UjXADPfvS_G-wzSTDKmOAKqrw9i4gxnGkNMA752R4OMsnjKvDwhd",
    "adriana-castro": "a/ACg8ocJ3z5Wcu3LJ3_Rndw64EXol7TJvAB2XPtlea2pOKguPCpOYxA",
    "nadia-lima": "a/ACg8ocLXNXPlcFsnppJBUc_uyedwJBJiLSVBV1PIc5KEIwcXHpkFWg",
    "leonardo-marques": "a/ACg8ocK0Sqgx1EVx_Du96yOXe5WPY63eLb8VI0SY6f2kwmzB0Gv13Q",
}


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    for nome, caminho in FOTOS.items():
        url = f"https://lh3.googleusercontent.com/{caminho}=s160-c-rp-mo-br100"
        dados = urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read()
        Image.open(BytesIO(dados)).convert("RGB").resize((96, 96), Image.LANCZOS).save(
            DESTINO / f"{nome}.jpg", quality=86
        )
        print(nome)


if __name__ == "__main__":
    main()
