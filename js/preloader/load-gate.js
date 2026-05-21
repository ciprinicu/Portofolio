import { CONFIG } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { heroImageUrl, whenImageLoaded } from '../core/images.js';

function whenPageReady() {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
}

function whenFontsReady() {
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.catch(() => {});
}

function whenStylesReady() {
  const links = [...document.querySelectorAll('link[rel="stylesheet"]')];
  const pending = links.filter((l) => !l.sheet);
  if (!pending.length) return Promise.resolve();
  return Promise.all(
    pending.map(
      (link) =>
        new Promise((resolve) => {
          link.addEventListener('load', resolve, { once: true });
          link.addEventListener('error', resolve, { once: true });
        })
    )
  );
}

/**
 * Resolves when critical assets are ready. Progress 0–100 for preloader UI only.
 * Does not add artificial delay after load.
 */
export function trackSiteLoad(onProgress) {
  const report = (pct) => {
    const n = Math.min(100, Math.max(0, Math.round(pct)));
    onProgress?.(n);
  };

  const criticalImages = heroImages()
    .slice(0, 2)
    .map((u) => heroImageUrl(u));

  const work = (async () => {
    report(4);
    await whenPageReady();
    report(18);

    await whenStylesReady();
    report(28);

    await whenFontsReady();
    report(42);

    if (!criticalImages.length) {
      report(100);
      return;
    }

    let done = 0;
    const total = criticalImages.length;
    await Promise.all(
      criticalImages.map((url) =>
        whenImageLoaded(url).then(() => {
          done += 1;
          report(42 + (done / total) * 58);
        })
      )
    );
    report(100);
  })();

  const timeout = CONFIG.preloaderMaxWaitMs ?? 25000;
  const timer = new Promise((resolve) => setTimeout(resolve, timeout));

  return Promise.race([work, timer]).then(() => report(100));
}
