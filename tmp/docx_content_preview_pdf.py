from pathlib import Path
import sys

from docx import Document
from docx.document import Document as DocumentType
from docx.table import Table as DocxTable
from docx.text.paragraph import Paragraph as DocxParagraph
from docx.oxml.ns import qn
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    LongTable,
    PageTemplate,
    Paragraph,
    Spacer,
    TableStyle,
)


def iter_blocks(parent):
    parent_elm = parent.element.body if isinstance(parent, DocumentType) else parent._tc
    for child in parent_elm.iterchildren():
        if child.tag == qn("w:p"):
            yield DocxParagraph(child, parent)
        elif child.tag == qn("w:tbl"):
            yield DocxTable(child, parent)


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#64727D"))
    canvas.drawCentredString(letter[0] / 2, 0.34 * inch, f"Kultivate Learn  |  Draft v0.1  |  {doc.page}")
    canvas.restoreState()


def build(source, output):
    docx = Document(source)
    styles = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=13.2,
        textColor=colors.black,
        spaceAfter=6,
    )
    title = ParagraphStyle("Title", parent=body, fontName="Helvetica-Bold", fontSize=28, leading=31, spaceAfter=12)
    h1 = ParagraphStyle("H1", parent=body, fontName="Helvetica-Bold", fontSize=17, leading=20, spaceBefore=12, spaceAfter=7)
    h2 = ParagraphStyle("H2", parent=body, fontName="Helvetica-Bold", fontSize=13, leading=16, spaceBefore=9, spaceAfter=5)
    bullet = ParagraphStyle("Bullet", parent=body, leftIndent=14, firstLineIndent=-10, bulletIndent=0, spaceAfter=4)
    small = ParagraphStyle("Small", parent=body, fontSize=8.7, leading=11)
    header = ParagraphStyle("CellHeader", parent=small, fontName="Helvetica-Bold", textColor=colors.white)

    preview = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.62 * inch,
    )
    frame = Frame(preview.leftMargin, preview.bottomMargin, preview.width, preview.height, id="normal")
    preview.addPageTemplates(PageTemplate(id="main", frames=[frame], onPage=footer))

    story = []
    table_index = 0
    for block in iter_blocks(docx):
        if isinstance(block, DocxParagraph):
            text = block.text.strip()
            if not text:
                continue
            style_name = block.style.name if block.style is not None else "Normal"
            if style_name == "Title":
                story.append(Paragraph(escape(text), title))
            elif style_name == "Heading 1":
                story.append(Paragraph(escape(text), h1))
            elif style_name in ("Heading 2", "Heading 3"):
                story.append(Paragraph(escape(text), h2))
            elif style_name.startswith("List Bullet"):
                story.append(Paragraph(escape(text), bullet, bulletText="•"))
            elif style_name.startswith("List Number"):
                story.append(Paragraph(escape(text), bullet, bulletText="-"))
            else:
                story.append(Paragraph(escape(text), body))
        else:
            table_index += 1
            data = []
            for row_index, row in enumerate(block.rows):
                row_data = []
                for cell in row.cells:
                    value = "<br/>".join(escape(line.strip()) for line in cell.text.splitlines() if line.strip())
                    row_data.append(Paragraph(value or " ", header if row_index == 0 else small))
                data.append(row_data)
            grid_cols = block._tbl.tblGrid.gridCol_lst
            if grid_cols:
                raw = [int(col.get(qn("w:w"))) for col in grid_cols]
                total = sum(raw) or 1
                widths = [preview.width * value / total for value in raw]
            else:
                widths = [preview.width / len(data[0])] * len(data[0])
            table = LongTable(data, colWidths=widths, repeatRows=1, hAlign="CENTER")
            commands = [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#102A3A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.45, colors.HexColor("#D9D9D9")),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5.5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5.5),
                ("TOPPADDING", (0, 0), (-1, -1), 5.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5.5),
            ]
            for row_index in range(2, len(data), 2):
                commands.append(("BACKGROUND", (0, row_index), (-1, row_index), colors.HexColor("#F3F5F7")))
            table.setStyle(TableStyle(commands))
            story.append(Spacer(1, 3))
            story.append(table)
            story.append(Spacer(1, 8))

    preview.build(story)
    print(output)


if __name__ == "__main__":
    build(Path(sys.argv[1]), Path(sys.argv[2]))
