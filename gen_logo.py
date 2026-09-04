from PIL import Image, ImageDraw, ImageFont

SIZE = 512
img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

cx, cy = SIZE // 2, SIZE // 2

def shield_points(cx, cy, w, h, top_w):
    points = []
    points.append((cx, cy - h // 2))
    points.append((cx + top_w // 2, cy - h // 2 + h // 8))
    points.append((cx + top_w // 2, cy + h // 6))
    points.append((cx + top_w // 4, cy + h // 3))
    points.append((cx, cy + h // 2))
    points.append((cx - top_w // 4, cy + h // 3))
    points.append((cx - top_w // 2, cy + h // 6))
    points.append((cx - top_w // 2, cy - h // 2 + h // 8))
    return points

outer_color = (74, 158, 154)
main_color = (90, 175, 168)
inner_color = (135, 210, 205)
highlight_color = (160, 225, 220)

pts = shield_points(cx, cy, 420, 440, 380)
draw.polygon(pts, fill=outer_color)

pts = shield_points(cx, cy, 390, 415, 355)
draw.polygon(pts, fill=main_color)

pts = shield_points(cx, cy, 340, 370, 310)
draw.polygon(pts, fill=inner_color)

pts = shield_points(cx, cy - 20, 300, 200, 270)
draw.polygon(pts, fill=highlight_color)

overlay = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
overlay_draw = ImageDraw.Draw(overlay)
pts = shield_points(cx, cy - 20, 300, 200, 270)
overlay_draw.polygon(pts, fill=(*highlight_color, 40))
img = Image.alpha_composite(img, overlay)
draw = ImageDraw.Draw(img)

# Find a font that works
import os
font_paths = [
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/arial.ttf", 
    "C:/Windows/Fonts/calibrib.ttf",
    "C:/Windows/Fonts/segoeui.ttf",
    "C:/Windows/Fonts/verdanab.ttf",
    "C:/Windows/Fonts/tahoma.ttf",
    "C:/Windows/Fonts/tahomabd.ttf",
]

font = None
for fp in font_paths:
    if os.path.exists(fp):
        font = ImageFont.truetype(fp, 200)
        print(f"Using font: {fp}")
        break

if font is None:
    font = ImageFont.load_default()
    print("Using default font")

bbox = draw.textbbox((0, 0), "N", font=font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
tx = cx - tw // 2
ty = cy - th // 2 - 25

# Shadow
draw.text((tx + 3, ty + 3), "N", fill=(0, 0, 0, 50), font=font)
# Main N
draw.text((tx, ty), "N", fill=(255, 255, 255), font=font)

img.save(r"C:\Users\Robso\OneDrive\Desktop\dev\nxstore\logo.png", "PNG")
print("Done!")
