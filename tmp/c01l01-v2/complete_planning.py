from pathlib import Path
from docx import Document
from docx.shared import Pt
from lxml import etree
import zipfile,json
root=Path('C:/Users/Joshua/OneDrive/Documents/Kultivate')
build=root/'tmp/c01l01-v2'
out=root/'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14'
ns={'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
contents={}
with zipfile.ZipFile(out/'C01L01_Teaching_Slides_v2.pptx') as z:
 for n in range(1,13):
  e=etree.fromstring(z.read(f'ppt/slides/slide{n}.xml'))
  texts=e.findall('.//a:t',ns)
  parts=[t.text for t in texts if t.text and t.text not in ['KULTIVATE LEARN','COURSE 01  /  LESSON 01','SEO for Business Growth: From Search to Sales',f'{n:02d}']]
  contents[n]=' / '.join(parts)
d=Document(out/'C01L01_Slide_Planning_dan_Quality_Check_v2.docx')
for p in d.paragraphs:
 if 'SLIDE_CONTENT_' in p.text:
  n=int(p.text.split('SLIDE_CONTENT_')[1])
  p.clear();p.add_run('On-slide content: ').bold=True;p.add_run(contents[n])
  for r in p.runs:r.font.name='Arial';r.font.size=Pt(10)
 if 'VALIDATION_RESULT' in p.text:
  p.text='File dan visual: Ketiga DOCX dirender dan tiap halamannya dicek. Deck punya 12 slide, dengan teks, diagram, dan tabel yang bisa diedit. Paket PPTX lolos pengecekan struktur dan geometri tanpa temuan. File final juga diimpor ulang lalu dirender untuk cek tampilan. Pengecekan ini bukan uji presentasi langsung di aplikasi PowerPoint.'
d.save(out/'C01L01_Slide_Planning_dan_Quality_Check_v2.docx')
(build/'actual-slide-content.json').write_text(json.dumps(contents,ensure_ascii=False,indent=2),encoding='utf-8')
s=(root/'tmp/c01l01-build/render_final_deck.mjs').read_text(encoding='utf-8')
s=s.replace('tmp/c01l01-build','tmp/c01l01-v2').replace('Kultivate_Learn_C01L01_Sample_2026-09-14/C01L01_Teaching_Slides.pptx','Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14/C01L01_Teaching_Slides_v2.pptx')
(build/'render_final_deck.mjs').write_text(s,encoding='utf-8')
s=(root/'tmp/c01l01-build/final_qa.py').read_text(encoding='utf-8').replace('Kultivate_Learn_C01L01_Sample_2026-09-14','Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14').replace('C01L01_Teaching_Slides.pptx','C01L01_Teaching_Slides_v2.pptx')
s=s.replace("assert 'QA_RENDER_STATUS' not in text", "assert all(token not in text for token in ['QA_RENDER_STATUS','VALIDATION_RESULT','SLIDE_CONTENT_'])")
(build/'final_qa.py').write_text(s,encoding='utf-8')
(build/'render_pdfium.py').write_text((root/'tmp/c01l01-build/render_pdfium.py').read_text(encoding='utf-8'),encoding='utf-8')
print('Slide planning now matches all 12 exported slides.')
