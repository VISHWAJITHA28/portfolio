"""Project cover images.

Each cover draws what the project actually is: a benzene ring lattice for the
molecular screening pipeline, a ward facade for the hospital platform, a
ribcage under a scan line for the diagnostic tool. Abstract gradients would
have been quicker and would have told a visitor nothing.

Drawn rather than screenshotted, because there are no deployed UIs to
photograph and a fabricated screenshot would be worse than an honest drawing.

Palette is the site's: cream ground, near-black ink, one warm accent per card
so the grid does not turn into a rainbow.
"""

from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1200, 900          # 4:3, matching the card media box
CREAM = (250, 247, 243)
INK = (17, 17, 17)
GREY = (153, 153, 153)


def font(size, bold=False):
    for name in (
        "C:/Windows/Fonts/seguisb.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def base(tint):
    im = Image.new("RGB", (W, H), CREAM)
    d = ImageDraw.Draw(im, "RGBA")
    # A soft wash of the card's accent, so the grid reads as a set with
    # variation rather than seven identical cream rectangles.
    d.ellipse([-W * 0.25, -H * 0.4, W * 0.75, H * 0.6], fill=(*tint, 46))
    d.ellipse([W * 0.45, H * 0.45, W * 1.3, H * 1.5], fill=(*tint, 32))
    return im, d


def caption(d, text):
    d.text((60, H - 92), text, font=font(38, True), fill=INK)


# ── hexagon helper, used by the chemistry cover ──────────────────────────
def hexagon(cx, cy, r, rot=0.0):
    return [
        (cx + r * math.cos(rot + i * math.pi / 3),
         cy + r * math.sin(rot + i * math.pi / 3))
        for i in range(6)
    ]


def molecules(d, tint):
    """Three rings joined by bonds, with substituents.

    Earlier this drew FUSED rings, using an offset computed for pointy-top
    hexagons while drawing flat-top ones — so they overlapped instead of
    sharing edges. Separate rings joined by explicit bonds are both correct
    and far more legible at card size.
    """
    r = 105
    centres = [(300, 400), (600, 400), (900, 400)]

    for i, (cx, cy) in enumerate(centres):
        pts = hexagon(cx, cy, r)                 # rot=0: pointy left and right
        d.line(pts + [pts[0]], fill=INK, width=8, joint="curve")

        # Alternating inner lines mark the aromatic double bonds.
        for j in (0, 2, 4):
            a, b = pts[j], pts[(j + 1) % 6]
            mx, my = (a[0] + b[0]) / 2 - cx, (a[1] + b[1]) / 2 - cy
            n = math.hypot(mx, my) or 1
            off = 19
            d.line([(a[0] - mx / n * off, a[1] - my / n * off),
                    (b[0] - mx / n * off, b[1] - my / n * off)],
                   fill=INK, width=5)

        # Bond to the next ring: vertex 0 is the right-hand point, vertex 3
        # the left-hand one, so the join is horizontal and symmetric.
        if i < len(centres) - 1:
            d.line([pts[0], (centres[i + 1][0] - r, cy)], fill=INK, width=8)

    # Substituents, so it reads as a compound rather than a pattern.
    left = hexagon(*centres[0], r)[3]
    d.line([left, (left[0] - 66, left[1])], fill=INK, width=8)
    d.text((left[0] - 148, left[1] - 26), "HO", font=font(44, True), fill=INK)

    top = hexagon(*centres[1], r)[4]
    d.line([top, (top[0], top[1] - 66)], fill=INK, width=8)
    d.text((top[0] - 16, top[1] - 124), "N", font=font(44, True), fill=INK)

    right = hexagon(*centres[2], r)[0]
    d.line([right, (right[0] + 66, right[1])], fill=INK, width=8)
    d.text((right[0] + 80, right[1] - 26), "OH", font=font(44, True), fill=INK)

    caption(d, "Molecular screening")


def hospital(d, tint):
    """A ward facade: floors, lit windows, and a cross above the entrance."""
    x0, y0, x1 = 250, 210, 950
    ground = 700

    d.rectangle([x0, y0, x1, ground], outline=INK, width=8)

    # floors
    for f in range(1, 4):
        y = y0 + f * (ground - y0) / 4
        d.line([(x0, y), (x1, y)], fill=INK, width=5)

    # windows, a few lit
    lit = {(0, 1), (1, 3), (2, 0), (2, 4), (3, 2)}
    for f in range(4):
        for c in range(5):
            wx = x0 + 42 + c * 128
            wy = y0 + 34 + f * (ground - y0) / 4
            box = [wx, wy, wx + 74, wy + 62]
            if (f, c) in lit:
                d.rectangle(box, fill=(*tint, 190), outline=INK, width=4)
            else:
                d.rectangle(box, outline=INK, width=4)

    # entrance
    d.rectangle([(x0 + x1) / 2 - 62, ground - 118, (x0 + x1) / 2 + 62, ground],
                outline=INK, width=7)

    # the cross, above the roof
    cx, cy, arm, th = (x0 + x1) / 2, y0 - 74, 46, 17
    d.rectangle([cx - th, cy - arm, cx + th, cy + arm], fill=INK)
    d.rectangle([cx - arm, cy - th, cx + arm, cy + th], fill=INK)

    d.line([(120, ground), (1080, ground)], fill=INK, width=8)
    caption(d, "Hospital platform")


def ribcage(d, tint):
    """A chest under a scan line — the diagnostic tool's actual subject."""
    cx, cy = W // 2, 420
    d.line([(cx, cy - 210), (cx, cy + 150)], fill=INK, width=9)   # spine

    for i in range(7):
        y = cy - 175 + i * 52
        spread = 150 + i * 38 - (i * i * 3)
        for side in (-1, 1):
            d.arc([cx + side * spread - abs(spread), y - 40,
                   cx + side * spread + abs(spread), y + 92],
                  200 if side < 0 else 340,
                  340 if side < 0 else 480,
                  fill=INK, width=7)

    # the scan line, and its readout ticks
    sy = cy + 96
    d.line([(150, sy), (W - 150, sy)], fill=(*tint, 255), width=8)
    for x in range(170, W - 150, 30):
        h = 10 + int(30 * abs(math.sin(x / 61.0)))
        d.line([(x, sy - h), (x, sy)], fill=(*tint, 170), width=4)

    caption(d, "Diagnostic support")


def papers(d, tint):
    """Stacked pages with one citation picked out."""
    for i in range(3):
        x, y = 300 + i * 44, 200 + i * 30
        d.rounded_rectangle([x, y, x + 560, y + 470], radius=16,
                            fill=CREAM, outline=INK, width=7)
    x, y = 388, 260
    for r in range(9):
        w = 400 if r % 3 else 250
        col = (*tint, 235) if r == 4 else GREY
        d.rounded_rectangle([x + 34, y + 44 + r * 42, x + 34 + w, y + 62 + r * 42],
                            radius=8, fill=col)
    caption(d, "Cited retrieval")


def figure_chart(d, tint):
    """A rising line with the endpoint marked."""
    pts = [(230 + i * 82, 560 - int(250 * (i / 9) ** 0.85)) for i in range(10)]
    d.line([(200, 600), (W - 200, 600)], fill=GREY, width=5)
    d.line(pts, fill=INK, width=10, joint="curve")
    for p in pts:
        d.ellipse([p[0] - 9, p[1] - 9, p[0] + 9, p[1] + 9], fill=CREAM, outline=INK, width=5)
    lx, ly = pts[-1]
    d.ellipse([lx - 22, ly - 22, lx + 22, ly + 22], fill=(*tint, 255))
    caption(d, "Adaptive training")


def gauge(d, tint):
    """A score dial, because the output of both DeFi projects is one number."""
    cx, cy, r = W // 2, 520, 240
    d.arc([cx - r, cy - r, cx + r, cy + r], 180, 360, fill=GREY, width=34)
    d.arc([cx - r, cy - r, cx + r, cy + r], 180, 288, fill=(*tint, 255), width=34)
    d.text((cx - 118, cy - 150), "742", font=font(118, True), fill=INK)
    d.text((cx - 46, cy - 24), "/ 1000", font=font(34), fill=GREY)
    caption(d, "Credit scoring")


def network(d, tint):
    """Wallets as nodes, sized by exposure, all wired to one hub."""
    import random
    random.seed(11)
    hub = (W // 2, 420)
    nodes = [(random.randint(230, 970), random.randint(180, 640)) for _ in range(15)]
    for n in nodes:
        d.line([hub, n], fill=GREY, width=4)
    for i, n in enumerate(nodes):
        r = random.Random(i).randint(13, 30)
        fill = (*tint, 255) if i % 3 == 0 else CREAM
        d.ellipse([n[0] - r, n[1] - r, n[0] + r, n[1] + r], fill=fill, outline=INK, width=5)
    d.ellipse([hub[0] - 40, hub[1] - 40, hub[0] + 40, hub[1] + 40], fill=INK)
    caption(d, "On-chain risk")


SPECS = [
    ("mock01.png", (196, 122, 66),  molecules,    "AI Drug Discovery"),
    ("mock02.png", (108, 138, 176), ribcage,      "Diagnostic Support"),
    ("mock03.png", (132, 148, 122), papers,       "MedResearch"),
    ("mock04.png", (126, 158, 132), figure_chart, "Fitness Plans"),
    ("mock05.png", (198, 156, 84),  gauge,        "Credit Scoring"),
    ("mock06.png", (168, 124, 150), network,      "Wallet Risk"),
    ("mock07.png", (110, 146, 178), hospital,     "Ve Lyra"),
]

for name, tint, draw_fn, label in SPECS:
    im, d = base(tint)
    draw_fn(d, tint)
    im.save(f"src/assets/images/{name}")
    print(f"  {name}  {label}")
