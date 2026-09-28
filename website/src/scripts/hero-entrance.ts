// One entrance per mounted hero. Completed scenes use their static SVG state.
export function observeHeroEntrance(root: HTMLElement, create: () => Animation[], ready: Promise<unknown> = Promise.resolve()) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  root.dataset.state = 'waiting';
  let assetsReady = false;
  let visible = false;
  let done = false;
  let disposed = false;
  let frame = 0;
  let animations: Animation[] | undefined;
  const finish = () => {
    if (disposed) return;
    done = true;
    root.dataset.state = 'complete';
    animations?.forEach(animation => animation.cancel());
  };
  const update = () => {
    if (done || disposed) return;
    if (reduced.matches) { finish(); return; }
    const active = assetsReady && visible && !document.hidden && !document.querySelector('.atmosphere-toggle[aria-pressed="true"]');
    if (!active) {
      animations?.forEach(animation => animation.pause());
      if (animations) root.dataset.state = 'paused';
      return;
    }
    if (!animations) {
      animations = create();
      Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
    } else animations.forEach(animation => { if (animation.playState !== 'finished') animation.play(); });
    root.dataset.state = 'running';
  };
  const clicked = (event: MouseEvent) => {
    if (!(event.target instanceof Element) || !event.target.closest('.atmosphere-toggle')) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };
  const observer = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; update(); });
  observer.observe(root);
  document.addEventListener('visibilitychange',update);
  document.addEventListener('click',clicked);
  reduced.addEventListener('change',update);
  ready.then(() => { assetsReady=true; update(); }).catch(finish);
  update();
  return () => {
    disposed=true;
    cancelAnimationFrame(frame);
    animations?.forEach(animation => animation.cancel());
    observer.disconnect();
    document.removeEventListener('visibilitychange',update);
    document.removeEventListener('click',clicked);
    reduced.removeEventListener('change',update);
  };
}
