from pathlib import Path
from docx import Document
from docx.shared import Pt,RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
root=Path(r'C:\Users\Joshua\OneDrive\Documents\Kultivate\outputs\Kultivate_Learn_C01L01_Sample_2026-09-14')
for file in root.glob('*.docx'):
    d=Document(file)
    for el in d.styles._element.iter(qn('w:pBdr')):
        el.getparent().remove(el)
    for el in d._element.iter(qn('w:pBdr')):
        el.getparent().remove(el)
    # Keep each source title with its explanation.
    for pp in d.paragraphs:
        if pp._p.find(qn('w:hyperlink')) is not None:
            pp.paragraph_format.keep_with_next=True
        if pp.text=='Referensi dan catatan sumber':
            pp.paragraph_format.page_break_before=True
        if pp.text=='QA_RENDER_STATUS':
            pp.text='Pemeriksaan 14 September 2026: deck final terdiri dari 12 slide dan lolos validasi struktur, geometri, font, serta import ulang. Seluruh slide final dirender dan dibandingkan dengan pratinjau yang ditinjau. Teks, tabel, dan diagram tetap editable. Dokumen dirender melalui Microsoft Word dari salinan sementara lokal, lalu diperiksa sebagai gambar halaman. Pemeriksaan visual mencakup teks, tabel, ruang isian, page break, referensi, dan kesesuaian label contoh. Tidak ada speaker script. Deck belum diuji lewat penayangan langsung di aplikasi PowerPoint.'
        if pp.text.startswith('Hasil pemeriksaan file dan render final dicatat di bawah'):
            pp.text='Pemeriksaan dilakukan pada file yang diserahkan. Catatan ini merupakan bagian quality check sample, bukan bagian slide pengajaran.'
    for t in d.tables:
        for row in t.rows:
            for c in row.cells:
                if c.text=='Compare/Validate':
                    c.text='Compare/\nValidate'
                    for r in c.paragraphs[0].runs:
                        r.font.name='Arial'; r.font.size=Pt(9.5)
    # Consistent, simple running page numbers. Brand/status live once in the title block.
    for sec in d.sections:
        for pp in sec.header.paragraphs: pp.clear()
        for pp in sec.footer.paragraphs: pp.clear()
        pp=sec.footer.paragraphs[0]; pp.alignment=WD_ALIGN_PARAGRAPH.RIGHT
        pp.paragraph_format.tab_stops.clear_all()
        pp.add_run('Kultivate Learn    ')
        fld=OxmlElement('w:fldSimple'); fld.set(qn('w:instr'),'PAGE'); pp._p.append(fld)
        for r in pp.runs: r.font.name='Arial'; r.font.size=Pt(8); r.font.color.rgb=RGBColor(0,0,0)
    new=d.paragraphs[0].insert_paragraph_before('KULTIVATE LEARN   /   C01L01   /   SAMPLE UNTUK PERSETUJUAN   /   14 SEPTEMBER 2026')
    new.paragraph_format.space_after=Pt(12)
    for r in new.runs: r.font.name='Arial';r.font.size=Pt(8);r.font.color.rgb=RGBColor(0,0,0)
    if 'Planning' in file.name:
        for pp in d.paragraphs:
            for br in list(pp._p.iter(qn('w:br'))):
                if br.get(qn('w:type'))=='page': br.getparent().remove(br)
            if pp.text.startswith(('Slide ','Purpose:','On-slide content:','Suggested visual:','Source:')):
                pp.paragraph_format.keep_with_next=True
        # Match the actual editable table and on-slide formulation.
        for pp in d.paragraphs:
            if pp.text.startswith('Suggested visual: Empat baris berurutan'):
                pp.text='Suggested visual: Tabel native empat baris berisi momen dan pertanyaan pembeli. Elemen dapat diedit.'
    d.save(file)
    print(file.name)
