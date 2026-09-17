from pathlib import Path
from PIL import Image
from pypdf import PdfReader
import json
root=Path(__file__).parent
for name in ['qa-module','qa-worksheet','qa-planning']:
    folder=root/name
    if not (folder/'rendered.pdf').exists(): continue
    d=PdfReader(folder/'rendered.pdf')
    print(name,'PAGES',len(d.pages))
    for i,page in enumerate(d.pages):
        txt=page.extract_text() or ''
        print(i+1,len(txt),repr(txt[-170:]))
    for p in folder.glob('page-*.png'):
        im=Image.open(p).convert('RGB'); im.save(p.with_suffix('.jpg'),quality=78)
