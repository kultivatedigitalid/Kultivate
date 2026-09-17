from pathlib import Path
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph
import json

root=Path(r'C:\Users\Joshua\Downloads')
dest=Path(r'C:\Users\Joshua\OneDrive\Documents\Kultivate\tmp\c01l01-build\sources')
dest.mkdir(parents=True,exist_ok=True)
names=['Kultivate_Learn_Content_Planning_36_Lessons.docx','Kultivate_Learn_Content_Production_Master_Prompt.docx','Kultivate_Learn_Free_Course_Content_and_Consultation_Funnel_Plan_2026-09-09.docx','Kultivate_Research_Hormozi_Neil_Patel_Trust_Explanation_Framework.docx','KULTIVATE_Audit_Ekosistem_Alex_Hormozi.docx']
for name in names:
    p=root/name
    d=Document(p)
    lines=[]
    for b in d.iter_inner_content():
        if isinstance(b,Paragraph) and b.text.strip(): lines.append(f'[{b.style.name}] {b.text}')
        elif isinstance(b,Table):
            lines.append('[TABLE]')
            for row in b.rows: lines.append(' | '.join(c.text.replace('\n',' / ') for c in row.cells))
    txt='\n'.join(lines)
    (dest/(p.stem+'.txt')).write_text(txt,encoding='utf-8')
    print(name,len(txt),len(lines))
