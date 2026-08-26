"""Generate project thumbnails.

The template ships with screenshots of the original author's work. These are
replacements: a browser chrome frame around an abstract graphic that says
something true about each project's shape — a molecular graph for the drug
screening pipeline, a scan sweep for the diagnostic tool, and so on.

Drawn rather than photographed, because there are no deployed UIs to
screenshot and a fake screenshot would be worse than an honest abstraction.
"""

from PIL import Image, ImageDraw, ImageFont
import math
import random

W, H = 1200, 750
CHROME = 46

BG_TOP = (14, 18, 28)
BG_BOT = (22, 28, 42)
CHROME_BG = (30, 36, 50)


def font(size, bold=False):
    for name in (
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def base(accent):
    im = Image.new("RGB", (W, H), BG_TOP)
    d = ImageDraw.Draw(im)

    # vertical gradient ground
    for y in range(H):
        t = y / H
        d.line(
            [(0, y), (W, y)],
            fill=(
                int(BG_TOP[0] + (BG_BOT[0] - BG_TOP[0]) * t),
                int(BG_TOP[1] + (BG_BOT[1] - BG_TOP[1]) * t),
                int(BG_TOP[2] + (BG_BOT[2] - BG_TOP[2]) * t),
            ),
        )

    # browser chrome, so each card reads as a running application
    d.rectangle([0, 0, W, CHROME], fill=CHROME_BG)
    for i, c in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        d.ellipse([22 + i * 26, 16, 36 + i * 26, 30], fill=c)
    d.rounded_rectangle([120, 12, W - 24, CHROME - 12], radius=7, fill=(20, 25, 36))
    d.line([(0, CHROME), (W, CHROME)], fill=(50, 60, 80), width=1)
    return im, d


def label(d, title, subtitle, accent):
    d.text((60, H - 150), title, font=font(46, True), fill=(233, 238, 245))
    d.text((60, H - 88), subtitle, font=font(24), fill=accent)


def molecular(d, accent):
    """Nodes joined into a graph — the screening pipeline's shape."""
    random.seed(4)
    pts = [(random.randint(220, 980), random.randint(140, 470)) for _ in range(22)]
    for i, a in enumerate(pts):
        for b in pts[i + 1:]:
            if math.dist(a, b) < 190:
                d.line([a, b], fill=(*accent, 70), width=2)
    for i, (x, y) in enumerate(pts):
        r = 7 if i % 4 else 13
        d.ellipse([x - r, y - r, x + r, y + r], fill=accent if i % 4 == 0 else (120, 200, 235))


def scan(d, accent):
    """A ribcage abstraction under a sweeping scan line."""
    cx, cy = W // 2, 300
    for i in range(9):
        off = i * 30
        d.arc([cx - 250, cy - 170 + off, cx + 250, cy + 40 + off], 200, 340, fill=(90, 130, 175), width=3)
    d.line([(160, 470), (W - 160, 470)], fill=accent, width=4)
    for x in range(160, W - 160, 26):
        d.line([(x, 470), (x, 470 - random.Random(x).randint(6, 42))], fill=(*accent, 160), width=2)


def documents(d, accent):
    """Stacked pages with ruled text and a highlighted citation."""
    for i in range(3):
        x0, y0 = 250 + i * 34, 130 + i * 22
        d.rounded_rectangle([x0, y0, x0 + 480, y0 + 330], radius=10,
                            fill=(32, 40, 56), outline=(64, 78, 100), width=2)
    x0, y0 = 318, 174
    for r in range(9):
        w = 400 if r % 3 else 250
        col = accent if r == 4 else (95, 112, 138)
        d.rounded_rectangle([x0 + 26, y0 + 40 + r * 30, x0 + 26 + w, y0 + 52 + r * 30], radius=5, fill=col)


def chart(d, accent):
    """A rising line with an emphasised endpoint."""
    pts = [(200 + i * 90, 460 - int(150 * (i / 9) ** 0.8) - random.Random(i).randint(0, 45)) for i in range(10)]
    d.line([(200, 470), (W - 200, 470)], fill=(70, 86, 110), width=2)
    for i in range(len(pts) - 1):
        d.line([pts[i], pts[i + 1]], fill=accent, width=5)
    for p in pts:
        d.ellipse([p[0] - 6, p[1] - 6, p[0] + 6, p[1] + 6], fill=(233, 238, 245))
    last = pts[-1]
    d.ellipse([last[0] - 14, last[1] - 14, last[0] + 14, last[1] + 14], outline=accent, width=4)


def gauge(d, accent):
    """A score dial, because the output of both DeFi projects is one number."""
    cx, cy, r = W // 2, 400, 190
    d.arc([cx - r, cy - r, cx + r, cy + r], 180, 360, fill=(58, 72, 94), width=26)
    d.arc([cx - r, cy - r, cx + r, cy + r], 180, 288, fill=accent, width=26)
    d.text((cx - 96, cy - 100), "742", font=font(84, True), fill=(233, 238, 245))
    d.text((cx - 42, cy - 6), "/ 1000", font=font(24), fill=(130, 148, 176))


def network(d, accent):
    """Wallets as nodes, sized by exposure."""
    random.seed(11)
    hub = (W // 2, 300)
    nodes = [(random.randint(230, 970), random.randint(150, 460)) for _ in range(16)]
    for n in nodes:
        d.line([hub, n], fill=(72, 92, 120), width=2)
    for i, n in enumerate(nodes):
        r = random.Random(i).randint(8, 22)
        col = accent if i % 3 == 0 else (108, 190, 225)
        d.ellipse([n[0] - r, n[1] - r, n[0] + r, n[1] + r], fill=col)
    d.ellipse([hub[0] - 32, hub[1] - 32, hub[0] + 32, hub[1] + 32], fill=(233, 238, 245))


SPECS = [
    ("mock01.png", (95, 227, 184), molecular,  "AI Drug Discovery",          "LangGraph  ·  PyTorch  ·  RDKit"),
    ("mock02.png", (108, 198, 240), scan,      "Diagnostic Decision Support", "FastAPI  ·  LLaMA-3  ·  FAISS"),
    ("mock03.png", (150, 165, 250), documents, "MedResearch Agent",          "FastAPI  ·  Gemini  ·  ChromaDB"),
    ("mock04.png", (120, 220, 160), chart,     "Fitness Plan Generator",     "Flask  ·  React  ·  Chart.js"),
    ("mock05.png", (245, 190, 110), gauge,     "DeFi Credit Scoring",        "scikit-learn  ·  pandas"),
    ("mock06.png", (240, 140, 170), network,   "Wallet Risk Scoring",        "Python  ·  The Graph"),
]

for name, accent, draw_fn, title, sub in SPECS:
    im, d = base(accent)
    draw_fn(d, accent)
    label(d, title, sub, accent)
    im.save(f"src/assets/images/{name}")
    print(f"  {name}  {title}")
