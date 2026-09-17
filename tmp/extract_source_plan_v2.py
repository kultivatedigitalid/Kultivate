import sys
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

sys.stdout.reconfigure(encoding="utf-8")
path = r"C:\Users\Joshua\Downloads\Kultivate_Learn_Free_Course_Content_and_Consultation_Funnel_Plan_2026-09-09.docx"
document = Document(path)

for item in document.iter_inner_content():
    if isinstance(item, Paragraph):
        text = item.text.strip()
        if text:
            print(f"[{item.style.name}] {text}")
    elif isinstance(item, Table):
        print("[TABLE]")
        for row in item.rows:
            print(" | ".join(cell.text.strip().replace("\n", " / ") for cell in row.cells))
