from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent

for source in root.glob("*.png"):
    with Image.open(source) as image:
        target_width = min(900, image.width)
        target_height = round(image.height * target_width / image.width)
        resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
        output = root / f"{source.stem}-qa.jpg"
        resized.convert("RGB").save(output, quality=72, optimize=True, progressive=True)
        print(f"{output.name}\t{output.stat().st_size}")
