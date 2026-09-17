from pathlib import Path
from docx import Document
root=Path('C:/Users/Joshua/OneDrive/Documents/Kultivate')
build=root/'tmp/c01l01-v2'
f=build/'build_deck.mjs'
s=f.read_text(encoding='utf-8')
s=s.replace("base(6,'Dari muncul di search sampai peluang yang cocok'", "base(6,'Dari muncul di search\\nsampai peluang yang cocok'")
s=s.replace("finalPath:path.join(out,'C01L01_Teaching_Slides_v2.pptx')", "finalPath:path.join(dir,'C01L01_Teaching_Slides_v2_checked.pptx')")
f.write_text(s,encoding='utf-8')
out=root/'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14'
f=out/'C01L01_Slide_Planning_dan_Quality_Check_v2.docx'
d=Document(f)
for p in d.paragraphs:
 if p.text.startswith('On-slide content: Empat momen pencarian'):
  for r in p.runs:r.text=r.text.replace('dan buktinya / Act', 'dan buktinya / 04 / Act')
 if p.text.startswith('On-slide content: Dari muncul di search sampai'):
  for r in p.runs:r.text=r.text.replace('Dari muncul di search sampai peluang', 'Dari muncul di search / sampai peluang')
d.save(f)
print('Balanced slide 6 headline and matched planning text.')
