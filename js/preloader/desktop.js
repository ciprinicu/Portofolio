import { CONFIG, PERF, SEQUENCE_DURATION_TC, SEQUENCE_FPS } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { els, state } from '../core/state.js';
import { formatSourceTimecode, formatTimecodeFromProgress, isPageActive, pad, reducedMotion } from '../core/utils.js';
import { stopPreloaderLoop } from './loop.js';
import { zoomIntoProgram } from './transition.js';

export function buildTimelineRuler() {
  if (!els.timelineRuler) return;
  els.timelineRuler.innerHTML = '';
  const marks = ['00:00:00:00', '', '00:00:07:08', '', '00:00:14:23', '', '00:00:21:15', '', '00:00:27:17'];
  marks.forEach((label) => {
    const tick = document.createElement('span');
    tick.className = 'pp-ruler-tick';
    if (label) tick.textContent = label;
    els.timelineRuler.appendChild(tick);
  });
}

export function buildMediaBin() {
  const imgs = heroImages();
  if (els.mediaBin) {
    els.mediaBin.innerHTML = imgs
      .slice(0, 6)
      .map(
        (src, i) => `
      <div class="pp-bin-item${i === 0 ? ' is-active' : ''}" data-idx="${i}" style="background-image:url('${src}')">
        <span class="pp-badge">${(2 + Math.random() * 8).toFixed(1)}s</span>
        <span>CLIP_${pad(i + 1)}.mxf</span>
      </div>`
      )
      .join('');
  }

  if (els.mediaList) {
    const rows = [
      `<div class="pp-list-row folder"><span class="name">Camino Fuente</span><span>—</span><span>—</span></div>`,
      ...imgs.slice(0, 5).map(
        (src, i) => `
        <div class="pp-list-row${i === 0 ? ' is-active' : ''}" data-idx="${i}">
          <span class="name">Camino Fuente Cam ${i + 1}.mp4</span>
          <span>${SEQUENCE_FPS} fps</span>
          <span>00:00:0${i}:02</span>
        </div>`
      ),
      `<div class="pp-list-row seq"><span class="name">Lesson</span><span>${SEQUENCE_FPS} fps</span><span>00:00:00:00</span></div>`,
    ];
    els.mediaList.innerHTML = rows.join('');
  }
}

export function setMonitorSlide(target, url, layer) {
  const map = {
    program: { a: els.ppPreviewA, b: els.ppPreviewB },
    source: { a: els.ppSourceA, b: els.ppSourceB },
  };
  const el = map[target]?.[layer];
  if (el) {
    el.style.backgroundImage = `url("${url}")`;
    el.classList.add('is-on');
  }
  const otherLayer = layer === 'a' ? 'b' : 'a';
  map[target]?.[otherLayer]?.classList.remove('is-on');
}

export function highlightBinIndex(idx) {
  els.mediaBin?.querySelectorAll('.pp-bin-item').forEach((item, i) => {
    item.classList.toggle('is-active', i === idx % 6);
  });
  els.mediaList?.querySelectorAll('.pp-list-row:not(.folder):not(.seq)').forEach((row, i) => {
    row.classList.toggle('is-active', i === idx % 5);
  });
}

export function startPreviewSlideshow() {
  const slides = heroImages();
  if (!slides.length) return;
  state.previewIdx = 0;
  state.sourceIdx = 0;
  state.previewLayer = 'a';
  state.sourceLayer = 'a';
  setMonitorSlide('program', slides[0], 'a');
  setMonitorSlide('source', slides[slides.length > 1 ? 1 : 0], 'a');
  highlightBinIndex(0);

  if (state.previewTimer) clearInterval(state.previewTimer);
  state.previewTimer = setInterval(() => {
    if (!state.preloaderRunning || !isPageActive()) return;
    const next = (state.previewIdx + 1) % slides.length;
    const layer = state.previewLayer === 'a' ? 'b' : 'a';
    setMonitorSlide('program', slides[next], layer);
    state.previewIdx = next;
    state.previewLayer = layer;
    highlightBinIndex(next);
  }, 900);

  if (state.sourceTimer) clearInterval(state.sourceTimer);
  state.sourceTimer = setInterval(() => {
    if (!state.preloaderRunning || !isPageActive()) return;
    const next = (state.sourceIdx + 2) % slides.length;
    const layer = state.sourceLayer === 'a' ? 'b' : 'a';
    setMonitorSlide('source', slides[next], layer);
    state.sourceIdx = next;
    state.sourceLayer = layer;
  }, 1150);
}

export function stopPreviewSlideshow() {
  if (state.previewTimer) clearInterval(state.previewTimer);
  if (state.sourceTimer) clearInterval(state.sourceTimer);
  state.previewTimer = null;
  state.sourceTimer = null;
}

export function getPlayheadMax() {
  return els.ppTracks ? Math.max(els.ppTracks.clientWidth - 12, 80) : 300;
}

export function updatePreloaderUI(pct, elapsedMs) {
  state.loadPct = pct;
  const maxX = getPlayheadMax();
  const x = (pct / 100) * maxX;

  if (els.playhead) els.playhead.style.left = `${x}px`;
  if (els.mainClip) els.mainClip.style.width = `${Math.max(8, pct * 0.92)}%`;
  if (els.programScrub) els.programScrub.style.width = `${pct}%`;
  if (els.sourceScrub) els.sourceScrub.style.width = `${Math.min(pct * 1.15, 100)}%`;

  const tc = formatTimecodeFromProgress(pct);
  if (els.programTc) els.programTc.textContent = tc;
  if (els.timecode) els.timecode.textContent = tc;
  if (els.sourceTc) els.sourceTc.textContent = formatSourceTimecode(pct * 0.65);
}

export function startAudioMeters() {
  const canvas = els.audioMeters;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const SEGMENTS = 32;
  const BOTTOM = 6;
  const TOP = 4;
  const frameInterval = 1000 / PERF.meterFps;
  let lastFrame = 0;
  let layout = { w: 0, h: 0, dpr: 1 };

  function ensureLayout() {
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const key = `${Math.round(rect.width)}x${Math.round(rect.height)}`;
    if (key === state.meterSizeKey && layout.w) return layout;
    state.meterSizeKey = key;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layout = { w: rect.width, h: rect.height, dpr };
    return layout;
  }

  function drawChannel(x, barW, peak, meterH, canvasH) {
    const lit = Math.max(1, Math.floor(peak * SEGMENTS));
    const segH = meterH / SEGMENTS;
    for (let s = 0; s < lit; s++) {
      const fromBottom = s / SEGMENTS;
      const isYellow = fromBottom > 0.78;
      ctx.fillStyle = isYellow ? 'rgba(245, 213, 71, 0.95)' : 'rgba(61, 220, 132, 0.92)';
      const y = canvasH - BOTTOM - (s + 1) * segH;
      ctx.fillRect(x, y, barW, Math.max(1, segH - 1.5));
    }
  }

  function draw(now) {
    if (!state.preloaderRunning || !isPageActive()) {
      state.metersRaf = null;
      return;
    }
    if (now - lastFrame < frameInterval) {
      state.metersRaf = requestAnimationFrame(draw);
      return;
    }
    lastFrame = now;

    const { w, h } = ensureLayout();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, w, h);

    const pct = state.loadPct / 100;
    const bounce = 0.12 + Math.sin(now * 0.014) * 0.1;
    const basePeak = 0.22 + pct * 0.72 + bounce;
    const barW = Math.max(8, (w - 14) / 2);
    const meterH = h - BOTTOM - TOP;
    drawChannel(5, barW, Math.min(1, basePeak * 0.92), meterH, h);
    drawChannel(5 + barW + 5, barW, Math.min(1, basePeak * 0.88), meterH, h);

    state.metersRaf = requestAnimationFrame(draw);
  }

  state.metersRaf = requestAnimationFrame(draw);
}

export function stopAudioMeters() {
  if (state.metersRaf) cancelAnimationFrame(state.metersRaf);
  state.metersRaf = null;
}

export function runDesktopPreloader() {
  if (!els.preloader || state.preloaderRunning) return;
  state.preloaderMode = 'desktop';
  state.preloaderRunning = true;
  stopPreloaderLoop();

  els.preloader.classList.remove('is-zooming', 'is-done', 'is-revealing');
  if (els.programPanel) {
    els.programPanel.classList.remove('is-zooming');
    els.programPanel.style.cssText = '';
  }
  if (els.preloaderMobile) els.preloaderMobile.setAttribute('aria-hidden', 'true');

  buildTimelineRuler();
  buildMediaBin();
  startPreviewSlideshow();
  startAudioMeters();
  updatePreloaderUI(0, 0);
  if (els.programDur) els.programDur.textContent = SEQUENCE_DURATION_TC;

  state.loadDuration = reducedMotion() ? 900 : CONFIG.preloaderMs;
  state.loadStart = performance.now();

  function tick(now) {
    const elapsed = now - state.loadStart;
    const t = Math.min(elapsed / state.loadDuration, 1);
    const eased = 1 - Math.pow(1 - t, 2.15);
    const pct = eased * 100;

    updatePreloaderUI(pct, elapsed);

    if (t < 1) {
      state.preloaderRaf = requestAnimationFrame(tick);
    } else {
      stopPreloaderLoop();
      zoomIntoProgram();
    }
  }

  state.preloaderRaf = requestAnimationFrame(tick);
}