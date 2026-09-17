from pathlib import Path
from docx import Document
root=Path('C:/Users/Joshua/OneDrive/Documents/Kultivate')
f=root/'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14/C01L01_Slide_Planning_dan_Quality_Check_v2.docx'
d=Document(f)
for p in d.paragraphs:
 if p.text=='Quality check sample v2':p.paragraph_format.page_break_before=True
d.save(f)
script=root/'tmp/c01l01-v2/render_documents.ps1'
s=script.read_text(encoding='utf-8')
s=s.replace("$renderDoc.SaveAs2((Join-Path $renderDir 'rendered.pdf'),17)","$renderDoc.ExportAsFixedFormat((Join-Path $renderDir 'rendered.pdf'),17,$false,0,0,1,1,0,$true,$true,0,$true,$true,$true)")
script.write_text(s,encoding='utf-8')
print('Quality check moved to its own page; PDF export uses embedded-font archival mode.')
