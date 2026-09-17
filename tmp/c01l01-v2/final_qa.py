from pathlib import Path
from PIL import Image
from pypdf import PdfReader
from docx import Document
import json,zipfile,re,hashlib
from lxml import etree
root=Path(__file__).parent
out=root.parents[1]/'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14'
report={}
for name in ['qa-module-final','qa-worksheet-final','qa-planning-final']:
    folder=root/name
    if not (folder/'rendered.pdf').exists(): continue
    d=PdfReader(folder/'rendered.pdf')
    report[name]={'pages':len(d.pages),'characters':[len(p.extract_text() or '') for p in d.pages]}
    print(name,report[name])
    for p in folder.glob('page-*.png'):
        Image.open(p).convert('RGB').save(p.with_suffix('.jpg'),quality=78)
for f in out.glob('*.docx'):
    d=Document(f)
    text='\n'.join(p.text for p in d.paragraphs)
    assert all(token not in text for token in ['QA_RENDER_STATUS','VALIDATION_RESULT','SLIDE_CONTENT_'])
    assert '[pause]' not in text and '[show slide]' not in text
    report[f.name]={'paragraphs':len(d.paragraphs),'tables':len(d.tables),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()}
    if 'Modul' in f.name: report[f.name]['chapters']=[p.text for p in d.paragraphs if p.style.name=='Heading 1' and p.text[0].isdigit()]
with zipfile.ZipFile(out/'C01L01_Teaching_Slides_v2.pptx') as z:
    slides=[n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)]
    report['pptx']={'slides':len(slides),'native_shapes':0,'native_tables':0,'pictures':0,'notes':12}
    ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
    for s in slides:
        e=etree.fromstring(z.read(s));report['pptx']['native_shapes']+=len(e.findall('.//p:sp',ns));report['pptx']['native_tables']+=len(e.findall('.//a:tbl',ns));report['pptx']['pictures']+=len(e.findall('.//p:pic',ns))
    assert len(slides)==12
(root/'final-qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(report,ensure_ascii=False))
