from pathlib import Path
import pypdfium2 as pdfium
root=Path(__file__).parent
for name in ['qa-module-final','qa-worksheet-final','qa-planning-final']:
    folder=root/name
    pdf=pdfium.PdfDocument(str(folder/'rendered.pdf'))
    for i in range(len(pdf)):
        image=pdf[i].render(scale=110/72).to_pil().convert('RGB')
        image.save(folder/f'verified-{i+1}.jpg',quality=82)
    print(name,len(pdf))
