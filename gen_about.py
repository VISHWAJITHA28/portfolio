"""
Draws the About section's image: an editor with a model graph over it.

WHY DRAWN AND NOT A STOCK PHOTO
    Every stock "AI coding" photo is the same blue-tinted hands-on-keyboard
    shot, and it would be the one piece of the page that came from somewhere
    else. This is built from the same parts as the project covers, in the same
    restrained palette, so it belongs to the page.

WHAT IS IN IT
    An editor pane holding real-shaped code — indentation that steps in and
    out, comment lines, string and keyword colour — with a small graph of
    nodes and edges sitting over the lower half, the way a model diagram sits
    over the code that builds it. Nothing says a word, because legible fake
    code invites reading and this is a texture, not a listing.

    Output is 4:5 to match the aspect ratio the About card is laid out at.
"""

import math
import random
from PIL import Image, ImageDraw, ImageFilter

W, H = 1200, 1500
OUT = "src/assets/images/ai-coding.png"

# Near-monochrome, with the marks' iridescence as the only colour. Anything
# more and this fights the cream page it sits on.
GROUND = (16, 17, 21)
PANE = (23, 25, 31)
CHROME = (31, 34, 42)
GUTTER = (58, 62, 74)
TEXT = (150, 157, 172)
DIM = (86, 92, 106)
KEY = (150, 122, 235)
STR = (108, 190, 200)
FN = (222, 216, 205)
ACCENT = (140, 108, 245)
CYAN = (60, 200, 225)

random.seed(11)


def rounded(draw, box, r, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


img = Image.new("RGB", (W, H), GROUND)
d = ImageDraw.Draw(img)

# ── a soft pool of light behind the pane, so the panel is not floating on a
#    perfectly flat field ────────────────────────────────────────────────────
glow = Image.new("RGB", (W, H), GROUND)
gd = ImageDraw.Draw(glow)
gd.ellipse((-160, -240, W + 160, 780), fill=(34, 30, 56))
gd.ellipse((260, 900, W + 320, H + 300), fill=(20, 34, 42))
img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(150)), 0.85)
d = ImageDraw.Draw(img)

# ── the editor pane ────────────────────────────────────────────────────────
PX, PY, PW = 84, 150, W - 168
PH = 1010
rounded(d, (PX, PY, PX + PW, PY + PH), 22, fill=PANE)
rounded(d, (PX, PY, PX + PW, PY + 62), 22, fill=CHROME)
d.rectangle((PX, PY + 40, PX + PW, PY + 62), fill=CHROME)

# window dots
for i, c in enumerate([(96, 100, 112), (78, 82, 94), (66, 70, 82)]):
    cx = PX + 30 + i * 24
    d.ellipse((cx - 7, PY + 24, cx + 7, PY + 38), fill=c)

# a tab, so the chrome reads as an editor rather than a plain bar
rounded(d, (PX + 132, PY + 14, PX + 344, PY + 62), 8, fill=PANE)
d.rectangle((PX + 132, PY + 46, PX + 344, PY + 62), fill=PANE)

# ── code ───────────────────────────────────────────────────────────────────
# Each line is a list of (width, colour) runs. Indentation steps in and out
# the way real code does; a flat left margin is the giveaway on fake code.
LINE_H = 34
TOP = PY + 96
GX = PX + 34          # gutter numbers
CX = PX + 96          # code starts

LINES = [
    (0, [(70, KEY), (150, FN)]),
    (0, [(58, KEY), (196, STR)]),
    (0, []),
    (0, [(46, DIM), (230, DIM)]),
    (0, [(80, KEY), (128, FN), (44, TEXT)]),
    (1, [(104, TEXT), (62, KEY), (150, STR)]),
    (1, [(88, TEXT), (176, TEXT)]),
    (2, [(66, KEY), (120, FN), (90, TEXT)]),
    (2, [(140, STR), (58, TEXT)]),
    (1, []),
    (1, [(72, KEY), (208, FN)]),
    (0, []),
    (0, [(52, DIM), (188, DIM)]),
    (0, [(94, KEY), (146, FN), (68, TEXT)]),
    (1, [(118, TEXT), (74, STR)]),
    (1, [(86, TEXT), (132, FN), (52, TEXT)]),
    (2, [(160, STR)]),
    (1, [(64, KEY), (196, TEXT)]),
    (0, []),
    (0, [(78, KEY), (162, FN), (56, TEXT)]),
    (1, [(126, TEXT), (98, STR), (40, TEXT)]),
    (1, [(102, TEXT), (150, TEXT)]),
    (2, [(88, KEY), (118, FN)]),
    (1, [(140, TEXT), (66, STR)]),
    (0, []),
    (0, [(60, DIM), (214, DIM)]),
]

for i, (indent, runs) in enumerate(LINES):
    y = TOP + i * LINE_H
    if y > PY + PH - 60:
        break
    # line number
    d.rectangle((GX, y + 11, GX + 20, y + 17), fill=GUTTER)
    x = CX + indent * 34
    for w, colour in runs:
        d.rounded_rectangle((x, y + 8, x + w, y + 21), radius=6, fill=colour)
        x += w + 16

# the caret, on the last written line
d.rectangle((CX + 34, TOP + 23 * LINE_H + 5, CX + 37, TOP + 23 * LINE_H + 25), fill=FN)

# ── the model graph, laid over the lower half ──────────────────────────────
# Drawn on its own layer and composited, so the whole graph is translucent
# together — drawing it directly with alpha would let overlapping edges stack
# into solid lines.
net = Image.new("RGBA", (W, H), (0, 0, 0, 0))
nd = ImageDraw.Draw(net)

LAYERS = [4, 6, 5, 3]
X0, X1 = 190, W - 190
Y0, Y1 = 940, 1360
nodes = []
for li, count in enumerate(LAYERS):
    x = X0 + (X1 - X0) * li / (len(LAYERS) - 1)
    span = (Y1 - Y0) * (count / max(LAYERS))
    top = (Y0 + Y1) / 2 - span / 2
    col = []
    for n in range(count):
        y = top + (span * n / max(count - 1, 1))
        col.append((x, y))
    nodes.append(col)

for li in range(len(nodes) - 1):
    for a in nodes[li]:
        for b in nodes[li + 1]:
            # Thin, and not every edge at full strength: a fully connected
            # graph drawn evenly reads as a grid, not a network.
            w = random.random()
            nd.line([a, b], fill=(150, 160, 190, int(26 + w * 46)), width=1)

for li, col in enumerate(nodes):
    for (x, y) in col:
        t = li / (len(nodes) - 1)
        c = tuple(int(ACCENT[k] + (CYAN[k] - ACCENT[k]) * t) for k in range(3))
        nd.ellipse((x - 15, y - 15, x + 15, y + 15), fill=c + (36,))
        nd.ellipse((x - 7, y - 7, x + 7, y + 7), fill=c + (235,))

img = Image.alpha_composite(img.convert("RGBA"), net).convert("RGB")
d = ImageDraw.Draw(img)

# ── grain, so it sits with the paper texture on the rest of the page ───────
noise = Image.effect_noise((W, H), 26).convert("L")
img = Image.composite(img, Image.new("RGB", (W, H), (255, 255, 255)), noise.point(lambda v: 255 - int(v * 0.06)))

img.save(OUT)
print(f"wrote {OUT} at {W}x{H}")
