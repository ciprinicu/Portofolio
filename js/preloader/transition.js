import { CONFIG } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { els, state } from '../core/state.js';
import { reducedMotion } from '../core/utils.js';
import { setSlideBg, startHeroSlideshow } from '../hero/index.js';

export function clearZoomTimer() {
  if (state.zoomFallbackTimer) {
    clearTimeout(state.zoomFallbackTimer);
    state.zoomFallbackTimer = null;
  }
}

/** Sync hero with whichever preloader preview was active */
export function handoffPreviewToHero() {
  const slides = heroImages();
  const idx = state.preloaderMode === 'mobile' ? 0 : state.previewIdx % slides.length;
  state.heroIndex = idx;
  state.activeLayer = 'a';
  setSlideBg(els.slideA, slides[idx]);
  setSlideBg(els.slideB, slides[(idx + 1) % slides.length]);
  els.slideA?.classList.add('slide-active');
  els.slideB?.classList.remove('slide-active', 'is-morphing', 'is-morphing-in', 'is-morphing-out');
  if (els.heroProgress) {
    els.heroProgress.style.width = `${((idx + 1) / slides.length) * 100}%`;
  }
}

export function finishZoomTransition() {
  clearZoomTimer();
  els.programPanel?.removeEventListener('transitionend', onZoomTransitionEnd);
  revealSite();
}

export function onZoomTransitionEnd(e) {
  if (e.propertyName !== 'transform') return;
  finishZoomTransition();
}

export function zoomIntoProgram() {
  const panel = els.programPanel;
  if (!panel) {
    revealSite();
    return;
  }

  clearZoomTimer();
  els.preloader?.classList.remove('is-revealing', 'is-done');
  els.preloader?.classList.add('is-zooming');

  const rect = panel.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const scale = Math.max(window.innerWidth / w, window.innerHeight / h) * 1.03;
  const tx = window.innerWidth / 2 - (rect.left + w / 2);
  const ty = window.innerHeight / 2 - (rect.top + h / 2);

  panel.classList.add('is-zooming');
  panel.style.top = `${rect.top}px`;
  panel.style.left = `${rect.left}px`;
  panel.style.width = `${w}px`;
  panel.style.height = `${h}px`;
  panel.style.transformOrigin = 'center center';
  panel.style.transform = 'translate3d(0, 0, 0) scale(1)';
  panel.style.transition = 'none';

  if (reducedMotion()) {
    panel.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    requestAnimationFrame(() => finishZoomTransition());
    return;
  }

  panel.removeEventListener('transitionend', onZoomTransitionEnd);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.style.transition = `transform ${CONFIG.zoomMs}ms cubic-bezier(0.65, 0, 0.15, 1)`;
      panel.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    });
  });

  panel.addEventListener('transitionend', onZoomTransitionEnd);
  state.zoomFallbackTimer = setTimeout(finishZoomTransition, CONFIG.zoomMs + 150);
}

export function revealSite() {
  clearZoomTimer();
  handoffPreviewToHero();

  document.body.classList.add('is-ready');
  els.hero?.classList.remove('hidden');
  els.hero?.setAttribute('aria-hidden', 'false');

  els.preloader?.classList.add('is-revealing');

  const cleanup = () => {
    els.preloader?.classList.remove('is-zooming', 'is-revealing');
    els.preloader?.classList.add('is-done', 'hidden');
    els.preloader?.setAttribute('aria-hidden', 'true');

    els.ppChrome?.classList.remove('is-fading-ui');
    if (els.programPanel) {
      els.programPanel.classList.remove('is-zooming');
      els.programPanel.style.cssText = '';
    }
    if (els.lrCanvas) {
      els.lrCanvas.classList.remove('is-zooming');
      els.lrCanvas.style.cssText = '';
    }

    state.preloaderRunning = false;
    try {
      sessionStorage.setItem('cipri:preloader-done', '1');
    } catch {
      /* ignore */
    }
    startHeroSlideshow();
  };

  if (reducedMotion()) {
    cleanup();
    return;
  }

  els.preloader?.addEventListener(
    'transitionend',
    (e) => {
      if (e.target === els.preloader && e.propertyName === 'opacity') cleanup();
    },
    { once: true }
  );

  setTimeout(cleanup, 700);
}