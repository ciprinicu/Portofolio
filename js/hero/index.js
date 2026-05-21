import { CONFIG } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { heroImageUrl } from '../core/images.js';
import { els, state } from '../core/state.js';
import { isPageActive, reducedMotion } from '../core/utils.js';

export function setSlideBg(el, url) {
  if (el) el.style.backgroundImage = `url("${heroImageUrl(url)}")`;
}

export function animateLiquid(intensity = 85) {
  if (reducedMotion() || !isPageActive() || !els.turbulence || !els.displacement) return Promise.resolve();

  const turb = els.turbulence;
  const disp = els.displacement;
  const dur = CONFIG.moshMs;
  const start = performance.now();

  return new Promise((resolve) => {
    function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      const wave = Math.sin(t * Math.PI);
      disp.setAttribute('scale', String(wave * intensity));
      turb.setAttribute('baseFrequency', String(0.006 + wave * 0.028));
      if (t < 1) requestAnimationFrame(frame);
      else {
        disp.setAttribute('scale', '0');
        resolve();
      }
    }
    requestAnimationFrame(frame);
  });
}

export async function transitionHero(nextIdx) {
  const out = state.activeLayer === 'a' ? els.slideA : els.slideB;
  const inn = state.activeLayer === 'a' ? els.slideB : els.slideA;
  const url = heroImages()[nextIdx];

  setSlideBg(inn, url);
  inn.classList.add('is-morphing-in');
  out.classList.add('is-morphing', 'is-morphing-out');
  await animateLiquid(90);

  out.classList.remove('slide-active', 'is-morphing', 'is-morphing-out');
  inn.classList.remove('is-morphing-in');
  inn.classList.add('slide-active');
  state.activeLayer = state.activeLayer === 'a' ? 'b' : 'a';
  state.heroIndex = nextIdx;

  if (els.heroProgress) {
    els.heroProgress.style.width = `${((nextIdx + 1) / heroImages().length) * 100}%`;
  }
}

export function startHeroSlideshow() {
  const slides = heroImages();
  state.heroIndex = 0;
  state.activeLayer = 'a';
  setSlideBg(els.slideA, slides[0]);
  els.slideA?.classList.add('slide-active');
  els.slideB?.classList.remove('slide-active', 'is-morphing-in', 'is-morphing-out', 'is-morphing');
  if (els.heroProgress) els.heroProgress.style.width = `${(1 / slides.length) * 100}%`;

  stopHeroSlideshow();
  state.heroTimer = setInterval(() => {
    if (!isPageActive() || els.hero?.classList.contains('hidden')) return;
    transitionHero((state.heroIndex + 1) % slides.length);
  }, CONFIG.heroIntervalMs);
}

export function stopHeroSlideshow() {
  if (state.heroTimer) clearInterval(state.heroTimer);
  state.heroTimer = null;
}