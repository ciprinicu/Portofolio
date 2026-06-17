import { heroImages } from '../data/portfolio.js';
import { heroImageUrl } from '../core/images.js';
import { els, state } from '../core/state.js';
import { trackSiteLoad } from './load-gate.js';
import { stopPreloaderLoop } from './loop.js';
import { reducedMotion } from '../core/utils.js';
import { clearZoomTimer, revealSite, finishZoomTransition } from './transition.js';
import { CONFIG } from '../config/timing.js';

export const LR_MOBILE_SLIDERS = [
  { key: 'exposure', fill: 'lrFillExposure', thumb: 'lrThumbExposure', val: 'lrValExposure' },
  { key: 'contrast', fill: 'lrFillContrast', thumb: 'lrThumbContrast', val: 'lrValContrast' },
  { key: 'highlights', fill: 'lrFillHighlights', thumb: 'lrThumbHighlights', val: 'lrValHighlights' },
  { key: 'shadows', fill: 'lrFillShadows', thumb: 'lrThumbShadows', val: 'lrValShadows' },
  { key: 'saturation', fill: 'lrFillSaturation', thumb: 'lrThumbSaturation', val: 'lrValSaturation' },
];

export const LR_FINAL_GRADE = {
  exposure: 0.94,
  contrast: 0.9,
  highlights: 0.78,
  shadows: 0.72,
  saturation: 0.96,
};

export function mobileDevelopFilter(grade) {
  const g = grade || state.mobileGrade;
  const exp = g.exposure ?? 0;
  const con = g.contrast ?? 0;
  const hi = g.highlights ?? 0;
  const sh = g.shadows ?? 0;
  const sat = g.saturation ?? 0;
  const brightness = 0.34 + exp * 0.52 + hi * 0.14 + sh * 0.1;
  const contrast = 0.48 + con * 0.42 + hi * 0.08;
  const saturate = 0.22 + sat * 0.78;
  return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
}

export function setLrSliderUI(slider, t) {
  const pos = 8 + t * 84;
  const fill = els[slider.fill];
  const thumb = els[slider.thumb];
  const val = els[slider.val];
  if (fill) fill.style.width = `${pos}%`;
  if (thumb) thumb.style.left = `${pos}%`;
  if (!val) return;
  const labels = {
    exposure: () => (t >= 0.92 ? '+1.12' : `+${(t * 1.12).toFixed(2)}`),
    contrast: () => String(Math.round(-18 + t * 58)),
    highlights: () => String(Math.round(-72 + t * 118)),
    shadows: () => String(Math.round(-48 + t * 88)),
    saturation: () => String(Math.round(8 + t * 92)),
  };
  val.textContent = labels[slider.key] ? labels[slider.key]() : String(Math.round(t * 100));
}

export function applyMobileGradeToPhoto() {
  if (els.lrPhoto) els.lrPhoto.style.filter = mobileDevelopFilter();
}

export function highlightActiveLrSlider(activeKey) {
  document.querySelectorAll('.lr-slider').forEach((row) => {
    row.classList.toggle('is-active', row.dataset.slider === activeKey);
  });
}
export function stopMobilePreloaderLoop() {
  if (state.preloaderRaf) cancelAnimationFrame(state.preloaderRaf);
  state.preloaderRaf = null;
  state.mobileSliderChannels = null;
}

export function initMobileSliderChannels() {
  state.mobileSliderChannels = LR_MOBILE_SLIDERS.map((s) => ({
    ...s,
    value: 0.28 + Math.random() * 0.12,
    target: Math.random() * 0.35,
  }));
}

export function retargetMobileSliders(master) {
  state.mobileSliderChannels?.forEach((ch) => {
    const final = LR_FINAL_GRADE[ch.key];
    const jitter = (Math.random() - 0.5) * 0.42 * (1 - master);
    const drift = Math.random() * (1 - master * 0.7);
    ch.target = Math.max(0, Math.min(1, drift * 0.55 + final * master * 0.45 + jitter + master * final * 0.35));
  });
}

export function runMobileRandomDevelop() {
  initMobileSliderChannels();
  const duration = reducedMotion() ? 1200 : CONFIG.mobilePreloaderMs;
  const start = performance.now();
  let lastRetarget = 0;
  let _revealScheduled = false;

  // Snap animation to 100% and trigger reveal (called by either the
  // animation loop finishing OR assets loading — whichever wins first).
  function scheduleReveal() {
    if (_revealScheduled) return;
    _revealScheduled = true;
    stopMobilePreloaderLoop();
    Object.assign(state.mobileGrade, LR_FINAL_GRADE);
    LR_MOBILE_SLIDERS.forEach((s) => setLrSliderUI(s, LR_FINAL_GRADE[s.key]));
    applyMobileGradeToPhoto();
    if (els.lrPct) els.lrPct.textContent = '100%';
    if (els.lrMeta) els.lrMeta.textContent = 'CIPRIAN MIHAI NICULAE · After';
    if (els.lrStatus) els.lrStatus.textContent = 'Export complete';
    mobileZoomReveal();
  }

  // Race: assets ready → reveal immediately, no wait for animation.
  trackSiteLoad((pct) => {
    if (_revealScheduled) return;
    state.loadPct = pct;
    if (els.lrPct) els.lrPct.textContent = `${Math.round(pct)}%`;
  }).then(() => {
    if (!state.preloaderRunning) return;
    scheduleReveal();
  });

  function frame(now) {
    if (_revealScheduled) return; // assets already won the race
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const master = 1 - Math.pow(1 - t, 2.05);

    if (elapsed - lastRetarget > 140 + Math.random() * 200) {
      lastRetarget = elapsed;
      retargetMobileSliders(master);
    }

    let liveliest = LR_MOBILE_SLIDERS[0].key;
    let maxDelta = 0;

    state.mobileSliderChannels.forEach((ch) => {
      const delta = ch.target - ch.value;
      if (Math.abs(delta) > maxDelta) {
        maxDelta = Math.abs(delta);
        liveliest = ch.key;
      }
      ch.value += delta * (0.06 + Math.random() * 0.14);
      ch.value += (Math.random() - 0.5) * 0.05 * (1 - master);
      if (t > 0.78) ch.value += (LR_FINAL_GRADE[ch.key] - ch.value) * 0.09;
      ch.value = Math.max(0, Math.min(1, ch.value));
      state.mobileGrade[ch.key] = ch.value;
      setLrSliderUI(ch, ch.value);
    });

    highlightActiveLrSlider(liveliest);
    applyMobileGradeToPhoto();

    state.loadPct = t * 100;
    if (els.lrPct) els.lrPct.textContent = `${Math.round(t * 100)}%`;
    if (els.lrMeta) els.lrMeta.textContent = t < 0.15 ? 'RAW · Before' : 'CIPRIAN MIHAI NICULAE · After';
    if (els.lrStatus) {
      els.lrStatus.textContent = t < 0.2 ? 'Loading RAW…' : t < 0.92 ? 'Developing…' : 'Export complete';
    }

    if (t < 1) {
      state.preloaderRaf = requestAnimationFrame(frame);
    } else {
      // Animation finished before assets — let scheduleReveal take over.
      scheduleReveal();
    }
  }

  state.preloaderRaf = requestAnimationFrame(frame);
}

export function mobileZoomReveal() {
  const canvas = els.lrCanvas;
  if (!canvas) {
    revealSite();
    return;
  }

  if (els.lrMeta) els.lrMeta.textContent = 'CIPRIAN MIHAI NICULAE · After';
  if (els.lrStatus) els.lrStatus.textContent = 'Export complete';
  clearZoomTimer();
  els.preloader?.classList.remove('is-revealing', 'is-done');
  els.preloader?.classList.add('is-zooming');

  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const scale = Math.max(window.innerWidth / w, window.innerHeight / h) * 1.04;
  const tx = window.innerWidth / 2 - (rect.left + w / 2);
  const ty = window.innerHeight / 2 - (rect.top + h / 2);

  canvas.classList.add('is-zooming');
  canvas.style.top = `${rect.top}px`;
  canvas.style.left = `${rect.left}px`;
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  canvas.style.transformOrigin = 'center center';
  canvas.style.transform = 'translate3d(0, 0, 0) scale(1)';
  canvas.style.transition = 'none';

  const onEnd = (e) => {
    if (e.propertyName !== 'transform') return;
    canvas.removeEventListener('transitionend', onEnd);
    finishZoomTransition();
  };

  if (reducedMotion()) {
    canvas.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    requestAnimationFrame(() => finishZoomTransition());
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      canvas.style.transition = `transform ${CONFIG.mobileZoomMs}ms cubic-bezier(0.65, 0, 0.15, 1)`;
      canvas.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    });
  });

  canvas.addEventListener('transitionend', onEnd);
  state.zoomFallbackTimer = setTimeout(finishZoomTransition, CONFIG.mobileZoomMs + 150);
}

export function runMobilePreloader() {
  if (!els.preloader || state.preloaderRunning) return;
  state.preloaderMode = 'mobile';
  state.preloaderRunning = true;
  stopPreloaderLoop();

  els.preloader.classList.remove('is-zooming', 'is-done', 'is-revealing');
  if (els.lrCanvas) {
    els.lrCanvas.classList.remove('is-zooming');
    els.lrCanvas.style.cssText = '';
  }
  if (els.preloaderMobile) els.preloaderMobile.setAttribute('aria-hidden', 'false');

  state.mobileGrade = { exposure: 0, contrast: 0, highlights: 0, shadows: 0, saturation: 0 };
  const img = heroImages()[0];
  if (els.lrPhoto) {
    els.lrPhoto.style.backgroundImage = `url("${heroImageUrl(img)}")`;
    els.lrPhoto.style.filter = mobileDevelopFilter(state.mobileGrade);
  }
  LR_MOBILE_SLIDERS.forEach((s) => setLrSliderUI(s, 0));
  if (els.lrPct) els.lrPct.textContent = '0%';
  if (els.lrStatus) els.lrStatus.textContent = 'Loading RAW…';
  if (els.lrMeta) els.lrMeta.textContent = 'RAW · Before';

  runMobileRandomDevelop();
}