export function initRevealSystem() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('reveal-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const item = entry.target as HTMLElement;
      requestAnimationFrame(() => {
        item.classList.remove('reveal-pending');
        item.classList.add('reveal-visible');
      });
      observer.unobserve(item);
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12,
  });

  items.forEach((item) => {
    const delay = Number(item.dataset.revealDelay || 0);
    item.style.setProperty('--reveal-delay', `${Math.min(delay, 4) * 70}ms`);

    if (item.getBoundingClientRect().top > window.innerHeight * 0.86) {
      item.classList.add('reveal-pending');
      observer.observe(item);
    } else {
      item.classList.add('reveal-visible');
    }
  });
}
