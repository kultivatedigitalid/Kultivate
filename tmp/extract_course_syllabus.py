import sys
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

sys.stdout.reconfigure(encoding="utf-8")
document = Document(r"C:\Users\Joshua\Downloads\Kultivate_Learn_Free_Course_Content_and_Consultation_Funnel_Plan_2026-09-09.docx")
current_heading = ""

for item in document.iter_inner_content():
    if isinstance(item, Paragraph):
        if item.style.name == "Heading 1" and item.text.strip():
            current_heading = item.text.strip()
        continue
    if not isinstance(item, Table) or not item.rows:
        continue
    headers = [cell.text.strip() for cell in item.rows[0].cells]
    if len(headers) < 2 or headers[0] != "#" or headers[1] != "Lesson":
        continue
    print(f"\nCOURSE: {current_heading}")
    for row in item.rows[1:]:
        cells = [cell.text.strip().replace("\n", " / ") for cell in row.cells]
        print(" | ".join(cells[:3]))
