import { useEffect, useRef, useState } from 'react';
import { PredictiveArcCanvas } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

type Field = { id: number; top: number; height: number; visible: boolean; gallery: boolean };
type Backdrop = { top: number; height: number; pageHeight: number; tileHeight: number; fields: Field[] };

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

  useEffect(() => {
    if (!nearby) return;
    const gl = host.current?.querySelector('canvas')?.getContext('webgl');
    // The original component deletes its resources; release the browser context
    // too when a repeat leaves the viewport, rather than waiting for collection.
    return () => { gl?.getExtension('WEBGL_lose_context')?.loseContext(); };
  }, [nearby]);

  return <div ref={host} className="atmosphere-tile" style={{ top, height }}>
    {nearby && <div className="shader-frame">
      <PredictiveArcCanvas variant="ribbon-field" speed={1.00} pointerAmount={1.00}
        smoothing={0.035} hue={0} saturation={1.00} brightness={1.00} opacity={1.00} />
    </div>}
  </div>;
}

export default function SiteAtmosphere({ locale }: { locale: 'en' | 'id' }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [backdrop, setBackdrop] = useState<Backdrop | null>(null);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(media.matches); setActive(!document.hidden); };
    update();
    const pointer = (event: PointerEvent) => {
      if (!event.isTrusted || event.pointerType === 'touch') return;
      root.current?.querySelectorAll<HTMLElement>('.ribbon-field').forEach(field => {
        const bounds = field.getBoundingClientRect();
        if (event.clientY < bounds.top || event.clientY > bounds.bottom) return;
        field.dispatchEvent(new PointerEvent('pointermove', {
          clientX: event.clientX, clientY: event.clientY, pointerType: event.pointerType,
        }));
      });
    };
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pointermove', pointer, { passive: true });
    return () => {
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pointermove', pointer);
    };
  }, []);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content');
    if (!main) return;
    const targets = Array.from(main.querySelectorAll<HTMLElement>('.light-field, .portfolio-section, .roadmap'));
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mainBounds = main.getBoundingClientRect();
      const bleed = Math.min(300, Math.max(160, innerWidth * 0.2));
      const fields = targets.map((target, id) => {
        const bounds = target.getBoundingClientRect();
        const gallery = target.classList.contains('portfolio-section');
        const spread = gallery ? 0 : bleed;
        const intro = target.querySelector<HTMLElement>('.quiz-intro');
        return { id, gallery, top: bounds.top - mainBounds.top - spread,
          height: bounds.height + spread * 2,
          visible: bounds.height > 0 && !target.hidden && (!intro || !intro.hidden) };
      });
      const next = { top: mainBounds.top + scrollY, height: mainBounds.height,
        pageHeight: document.body.getBoundingClientRect().height,
        tileHeight: Math.max(900, Math.min(1440, innerWidth * 0.875)), fields };
      setBackdrop(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(main);
    resize.observe(document.body);
    targets.forEach(target => resize.observe(target));
    const mutations = new MutationObserver(schedule);
    mutations.observe(main, { subtree: true, attributes: true, attributeFilter: ['hidden', 'data-quiz-state'] });
    window.addEventListener('resize', schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); mutations.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const ready = backdrop !== null;
  useEffect(() => {
    if (ready) document.documentElement.classList.add('atmosphere-ready');
    return () => document.documentElement.classList.remove('atmosphere-ready');
  }, [ready]);

  const moving = ready && active && !reduced && !paused;
  const tileHeight = backdrop?.tileHeight ?? 900;
  const tileStep = tileHeight * 0.8;
  const overlap = tileHeight - tileStep;
  const tileCount = Math.ceil(((backdrop?.pageHeight ?? 0) + overlap) / tileStep);
  return <>
    <div className="site-colors" aria-hidden="true" style={{ top: backdrop?.top ?? 0, height: backdrop?.height ?? 0 }}>
      {backdrop?.fields.map(field => <div key={field.id}
        className={`site-color-field${field.gallery ? ' site-color-field--gallery' : ''}`}
        style={{ top: field.top, height: field.height, opacity: field.visible ? 1 : 0 }} />)}
    </div>
    <div ref={root} className="site-atmosphere" aria-hidden="true" data-atmosphere-active={moving}
      style={{ height: backdrop?.pageHeight ?? 0 }}>
      {moving && Array.from({ length: tileCount }, (_, index) =>
        <RibbonTile key={index} top={index * tileStep - overlap} height={tileHeight} />)}
    </div>
    {!reduced && <button className="atmosphere-toggle" type="button" aria-pressed={paused}
      onClick={() => setPaused(!paused)}>
      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      <span>{locale === 'id' ? 'Jeda animasi latar' : 'Pause background motion'}</span>
    </button>}
  </>;
}
