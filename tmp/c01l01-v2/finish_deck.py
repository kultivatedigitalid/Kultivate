from pathlib import Path
root=Path('C:/Users/Joshua/OneDrive/Documents/Kultivate')
b=root/'tmp/c01l01-v2'
f=b/'build_deck.mjs';s=f.read_text(encoding='utf-8').replace("finalPath:path.join(dir,'C01L01_Teaching_Slides_v2_checked.pptx')","finalPath:path.join(dir,'checked-delivery/C01L01_Teaching_Slides_v2.pptx')")
f.write_text(s,encoding='utf-8')
head=s[:s.index("const plan=")]
tail=s[s.index('const {finalizePresentation}='):]
(b/'finalize_only.mjs').write_text(head+"await fs.mkdir(path.join(dir,'checked-delivery'),{recursive:true});\nconst candidate=path.join(dir,'candidate.pptx');\n"+tail,encoding='utf-8')
print('Finalizer target prepared.')
