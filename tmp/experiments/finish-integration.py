from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]/'website'
p=ROOT/'src/components/contact/ContactSuccessModal.astro';t=p.read_text(encoding='utf-8');t=t.replace("const allowedServices = new Set(['seo', 'web-services']);","const allowedServices = new Set(Array.from(form?.querySelectorAll<HTMLOptionElement>('#service option') ?? []).map(option => option.value).filter(Boolean));");p.write_text(t,encoding='utf-8',newline='\n')
p=ROOT/'src/components/home/ServicesGrid.astro';t=p.read_text(encoding='utf-8');t=t.replace('background:linear-gradient(180deg,transparent,#bbd5e6 11%,#e4f1f7 25%,#a3c6df 77%,transparent);','mask-image:linear-gradient(180deg,transparent,#000 90px,#000 calc(100% - 90px),transparent); background:linear-gradient(180deg,transparent,#bed8e8 90px,#e4f1f7 260px,#a3c6df calc(100% - 150px),transparent);');p.write_text(t,encoding='utf-8',newline='\n')
print('Updated contact prefill and mobile gradient falloff.')
