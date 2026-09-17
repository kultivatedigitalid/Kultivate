from pathlib import Path
from PIL import Image


ROOT = Path(r"C:\Users\Joshua\OneDrive\Documents\Kultivate\website\public\assets")
SOURCE = Path(r"C:\Users\Joshua\.codex\generated_images\01a00f82-1d12-7203-bcee-be3448cad2db")

ASSETS = {
    "exec-b4f6c91e-acb3-4c74-838f-e5e096bfb8a9.png": ROOT / "services" / "seo-focus-v3.webp",
    "exec-358d2141-70f6-42bb-b1d2-49fe845bcfae.png": ROOT / "services" / "aeo-geo-answer-v3.webp",
    "exec-b73f6999-3e43-442f-8496-4049768ce6fc.png": ROOT / "services" / "web-foundation-v3.webp",
    "exec-ce5f7798-34ac-41cd-8f54-8313bf88ec87.png": ROOT / "services" / "content-rhythm-v3.webp",
    "exec-f05db375-5a0b-48f8-aac3-852d4208a6f9.png": ROOT / "banners" / "services-v3.webp",
    "exec-c1e7647e-a779-418f-a476-37ceca506f7d.png": ROOT / "about" / "culture-v3.webp",
}

for source_name, destination in ASSETS.items():
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE / source_name) as image:
        image = image.convert("RGB")
        max_width = 1920 if "services-v3" in destination.name or "culture-v3" in destination.name else 1440
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=84, method=6)
    print(f"{destination.relative_to(ROOT)}\t{destination.stat().st_size}")
