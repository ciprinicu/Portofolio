import { PERF } from '../config/timing.js';
import { els, state } from '../core/state.js';
import { isMobilePreloader, reducedMotion } from '../core/utils.js';
import { runDesktopPreloader } from './desktop.js';
import { runMobilePreloader } from './mobile.js';
import { clearZoomTimer, revealSite } from './transition.js';
import { stopPreloaderLoop } from './loop.js';
import {
  clearDeckFx,
  stopDeckAutoplay,
  stopGalleryCycle,
} from '../deck/index.js';
import { stopHeroSlideshow } from '../hero/index.js';

function shouldSkipPreloader() {
  if (reducedMotion()) return true;
  if (!PERF.skipPreloaderIfSeen) return false;
  try {
    return sessionStorage.getItem('cipri:preloader-done') === '1';
  } catch {
    return false;
  }
}

/** Return visit or reduced motion — show hero immediately. */
export function quickReveal() {
  stopPreloaderLoop();
  clearZoomTimer();
  revealSite({ instant: true });
  els.preloaderMobile?.setAttribute('aria-hidden', 'true');
}

export function runPreloader() {
  if (shouldSkipPreloader()) {
    quickReveal();
    return;
  }
  if (isMobilePreloader()) runMobilePreloader();
  else runDesktopPreloader();
}
export function resetPreloader() {
  clearZoomTimer();
  stopHeroSlideshow();
  stopDeckAutoplay();
  stopGalleryCycle();
  els.journey?.classList.add('hidden');
  document.body.classList.remove('journey-open', 'is-playing');
  clearDeckFx();
  stopPreloaderLoop();
  els.hero?.classList.add('hidden');
  els.journey?.classList.add('hidden');
  document.body.classList.remove('is-ready', 'journey-open');
  els.preloader?.classList.remove('hidden', 'is-done', 'is-zooming', 'is-revealing');
  els.preloader?.setAttribute('aria-hidden', 'false');
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
  state.deckIndex = 0;
  runPreloader();
}