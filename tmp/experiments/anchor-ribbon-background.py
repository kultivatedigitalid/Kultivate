from pathlib import Path

root = Path('website')
p = root / 'src/components/shared/SiteAtmosphere.tsx'
text = p.read_text(encoding='utf-8')
text = text.replace('type Backdrop = { top: number; height: number; fields: Field[] };', '''type Backdrop = { top: number; height: number; pageHeight: number; tileHeight: number; fields: Field[] };

function RibbonTile({ top, height }: { top: number; height: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [nearby, setNearby] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    // Keep document-anchored repeats while limiting live WebGL surfaces.
    const observer = new IntersectionObserver(([entry]) => {
      setNearby(entry.isIntersecting);
    }, { rootMargin: '150px 0px' });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={host} className="atmosphere-tile" style={{ top, height }}>
    {nearby && <div className="shader-frame">
      <PredictiveArcCanvas variant="ribbon-field" speed={1.00} pointerAmount={1.00}
        smoothing={0.035} hue={0} saturation={1.00} brightness={1.00} opacity={1.00} />
    </div>}
  </div>;
}''')
old = '''      root.current?.querySelector('.ribbon-field')?.dispatchEvent(new PointerEvent('pointermove', {
        clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType,
      }));'''
new = '''      root.current?.querySelectorAll<HTMLElement>('.ribbon-field').forEach(field => {
        const bounds = field.getBoundingClientRect();
        if (event.clientY < bounds.top || event.clientY > bounds.bottom) return;
        field.dispatchEvent(new PointerEvent('pointermove', {
          clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType,
        }));
      });'''
assert old in text
text = text.replace(old, new)
text = text.replace('const next = { top: mainBounds.top + scrollY, height: mainBounds.height, fields };', '''const next = { top: mainBounds.top + scrollY, height: mainBounds.height,
        pageHeight: document.body.getBoundingClientRect().height,
        tileHeight: Math.max(900, Math.min(1440, innerWidth * 0.875)), fields };''')
text = text.replace('resize.observe(main);', 'resize.observe(main);\n    resize.observe(document.body);')
text = text.replace('  const moving = ready && active && !reduced && !paused;', '''  const moving = ready && active && !reduced && !paused;
  const tileHeight = backdrop?.tileHeight ?? 900;
  const tileStep = tileHeight * 0.8;
  const overlap = tileHeight - tileStep;
  const tileCount = Math.ceil(((backdrop?.pageHeight ?? 0) + overlap) / tileStep);''')
old = '''    <div ref={root} className="site-atmosphere" aria-hidden="true" data-atmosphere-active={moving}>
      {moving && <div className="shader-frame">
        <PredictiveArcCanvas variant="ribbon-field" speed={1.00} pointerAmount={1.00}
          smoothing={0.035} hue={0} saturation={1.00} brightness={1.00} opacity={1.00} />
      </div>}
    </div>'''
new = '''    <div ref={root} className="site-atmosphere" aria-hidden="true" data-atmosphere-active={moving}
      style={{ height: backdrop?.pageHeight ?? 0 }}>
      {moving && Array.from({ length: tileCount }, (_, index) =>
        <RibbonTile key={index} top={index * tileStep - overlap} height={tileHeight} />)}
    </div>'''
assert old in text
text = text.replace(old,new)
p.write_text(text,encoding='utf-8',newline='\n')
p = root / 'src/styles/atmosphere.css'
text = p.read_text(encoding='utf-8')
text = text.replace('fixed original ThreeUI (1)', 'document-anchored ThreeUI repeats (1)')
text = text.replace('.site-atmosphere { position:fixed; inset:0;', '.site-atmosphere { position:absolute; top:0; left:0; width:100%;')
text = text.replace('.site-atmosphere .shader-frame { width:100%; height:100%; }', '''.site-atmosphere .shader-frame { width:100%; height:100%; }
.atmosphere-tile { position:absolute; left:0; width:100%;
  mask-image:linear-gradient(180deg,transparent,#000 20%,#000 80%,transparent); }''')
p.write_text(text,encoding='utf-8',newline='\n')
print('Ribbon background anchored to the document with overlapping repeats.')
