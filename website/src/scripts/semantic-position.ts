const STORAGE_KEY = 'kultivate:language-position';
const MAX_AGE_MS = 30_000;

interface PositionSnapshot {
  targetPath: string;
  scrollKey?: string;
  sectionProgress?: number;
  documentProgress: number;
  createdAt: number;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const getMarker = () => Math.min(180, window.innerHeight * 0.24);

const getSemanticSections = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-key]'))
    .filter((section) => section.offsetHeight > 0);

const selectCurrentSection = (sections: HTMLElement[], marker: number) => {
  const containing = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  });

  if (containing) return containing;

  return sections
    .map((section) => ({ section, distance: Math.abs(section.getBoundingClientRect().top - marker) }))
    .sort((a, b) => a.distance - b.distance)[0]?.section;
};

const savePosition = (link: HTMLAnchorElement) => {
  const targetPath = new URL(link.href, window.location.href).pathname;
  const marker = getMarker();
  const sections = getSemanticSections();
  const section = selectCurrentSection(sections, marker);
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

  const snapshot: PositionSnapshot = {
    targetPath,
    documentProgress: clamp(window.scrollY / maxScroll),
    createdAt: Date.now(),
  };

  if (section) {
    const rect = section.getBoundingClientRect();
    snapshot.scrollKey = section.dataset.scrollKey;
    snapshot.sectionProgress = clamp((marker - rect.top) / Math.max(rect.height, 1));
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Navigation must continue even if storage is unavailable.
  }
};

const readSnapshot = (): PositionSnapshot | null => {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    if (!stored) return null;

    const snapshot = JSON.parse(stored) as PositionSnapshot;
    if (snapshot.targetPath !== window.location.pathname) return null;
    if (Date.now() - snapshot.createdAt > MAX_AGE_MS) return null;
    return snapshot;
  } catch {
    return null;
  }
};

const restorePosition = (snapshot: PositionSnapshot) => {
  const applyPosition = () => {
    const marker = getMarker();
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    const matchingSection = snapshot.scrollKey
      ? getSemanticSections().find((section) => section.dataset.scrollKey === snapshot.scrollKey)
      : undefined;

    const target = matchingSection && typeof snapshot.sectionProgress === 'number'
      ? window.scrollY
        + matchingSection.getBoundingClientRect().top
        + matchingSection.offsetHeight * snapshot.sectionProgress
        - marker
      : maxScroll * snapshot.documentProgress;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: Math.min(maxScroll, Math.max(0, target)), behavior: 'auto' });
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });
  };

  requestAnimationFrame(() => requestAnimationFrame(applyPosition));

  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => requestAnimationFrame(applyPosition), { once: true });
  }
};

export const initSemanticLanguagePosition = () => {
  document.querySelectorAll<HTMLAnchorElement>('[data-language-switch]').forEach((link) => {
    if (link.dataset.positionReady === 'true') return;
    link.dataset.positionReady = 'true';
    link.addEventListener('click', () => savePosition(link));
  });

  const snapshot = readSnapshot();
  if (snapshot) restorePosition(snapshot);
};
