/**
 * CIPRI — Visual Artist & Filmmaker
 * Edit PROJECTS, CONTACT, and CONFIG below.
 */

'use strict';

// =============================================================================
/** Add as many URLs as you want per category — they cycle during the auto presentation. */
const PROJECTS = [
  {
    id: 'testing1',//not displayed
    category: 'Car Videography',//Displayed on top of the title
    title: 'A night out in Constanta',//Big text Title
    description: 'This short montage shows the true wonders of the Constanta city in Romania. It shows the wonders of car enthusiasts.',//Description below title
    type: 'youtube',//Type
    media: 'https://youtu.be/KfnDJxuzy_M?t=10',//Link
    // youtubeStart: 45,  // optional: seconds, "1m30", or use ?t=45 on the URL
    images: [
      //'https://images.unsplash.com/photo-1487958449943-2429e8be8627?w=1920&q=85',
      //'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85',
    ],
  },
  {
    id: 'artistic',
    category: 'Artistic',
    title: 'Chromatic Silence',
    description: 'Fine-art photography exploring light, texture, and negative space.',
    type: 'image',
    media: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=85',
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&q=85',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=85',
    ],
  },
  {
    id: 'event',
    category: 'Event',
    title: 'Pulse & Ceremony',
    description: 'Weddings, festivals, and live performance captured with cinematic rhythm.',
    type: 'youtube',
    media: 'https://youtu.be/QF7jhiKabMA?t=15',
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=85',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=85',
    ],
  },
  {
    id: 'street',
    category: 'Street',
    title: 'Urban Frequency',
    description: 'Candid city narratives — neon, rain, and strangers in motion.',
    type: 'image',
    media: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=85',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=85',
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=85',
      'https://images.unsplash.com/photo-1519501025264-65baa15e8539?w=1920&q=85',
    ],
  },
  {
    id: 'architectural',
    category: 'Architectural',
    title: 'Structural Light',
    description: 'Architecture and interiors framed with geometric precision.',
    type: 'youtube',
    media: 'https://youtu.be/oWZhconmblA',
    youtubeStart: 200, // 3:00 — skip intro (or use media: '...?t=180')
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8627?w=1920&q=85',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85',
    ],
  },
  {
    id: 'portrait',
    category: 'Portrait',
    title: 'Human Frame',
    description: 'Editorial portraits for artists, founders, and creative professionals.',
    type: 'image',
    media: 'https://images.unsplash.com/photo-1554048612-b6a482b17f66?w=1920&q=85',
    images: [
      'https://images.unsplash.com/photo-1554048612-b6a482b17f66?w=1920&q=85',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1920&q=85',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=85',
    ],
  },
];

const SEQUENCE_FPS = 23.976;
const SEQUENCE_DURATION_TC = '00:00:27:17';

const CONTACT = {
  tagline: 'Open for commissions · ESAD & industry roles',
  email: 'hello@cipri.visual',
  phone: '+351 900 000 000',
  instagram: 'https://instagram.com/',
  youtube: 'https://youtube.com/',
};

const MOBILE_PRELOADER_MQ = '(max-width: 900px)';

// =============================================================================
// ⏱ TIMING (milliseconds) — edit these to tune the whole site
// =============================================================================
const TIMING = {
  // —— Preloaders ——
  preloaderDesktop: 3600,
  preloaderMobile: 3200,
  preloaderZoomDesktop: 950,
  preloaderZoomMobile: 780,

  // —— Hero (home slideshow) ——
  heroSlide: 5800,
  heroLiquidFx: 1200,

  // —— Enter Experience — transition (dip before / move / dip after) ——
  presentationFxBefore: 320,
  presentationSlideMove: 880,
  presentationFxAfter: 360,

  // —— Enter Experience — how long each slide stays on screen ——
  /** Still image projects with only one photo */
  presentationImageMin: 5000,
  /** Extra time per photo when a project has images: [] */
  presentationImagePerPhoto: 1800,
  presentationImageGalleryBuffer: 600,
  /** YouTube embed projects — usually longer so the clip can play */
  presentationYoutube: 14000,
  /** Final contact / pitch slide */
  presentationPitch: 9000,
  /** How fast gallery photos cycle inside one image project */
  presentationGalleryInterval: 1800,

  /** After the pitch slide, jump back to project 1? */
  presentationLoop: false,
};

/** Internal map — keep using CONFIG.* in code below */
const CONFIG = {
  preloaderMs: TIMING.preloaderDesktop,
  mobilePreloaderMs: TIMING.preloaderMobile,
  zoomMs: TIMING.preloaderZoomDesktop,
  mobileZoomMs: TIMING.preloaderZoomMobile,
  heroIntervalMs: TIMING.heroSlide,
  moshMs: TIMING.heroLiquidFx,
  deckFxPreMs: TIMING.presentationFxBefore,
  deckMoveMs: TIMING.presentationSlideMove,
  deckFxPostMs: TIMING.presentationFxAfter,
  deckHoldMs: TIMING.presentationImageMin,
  deckGalleryMs: TIMING.presentationGalleryInterval,
  deckYoutubeHoldMs: TIMING.presentationYoutube,
  deckPitchHoldMs: TIMING.presentationPitch,
  deckLoop: TIMING.presentationLoop,
  deckImagePerPhotoMs: TIMING.presentationImagePerPhoto,
  deckImageGalleryBufferMs: TIMING.presentationImageGalleryBuffer,
};

const FALLBACK_HERO = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85';

function projectImages(p) {
  if (p.images?.length) return p.images;
  if (p.type === 'image' && p.media) return [p.media];
  return [];
}

function allPortfolioImages() {
  const urls = [];
  PROJECTS.forEach((p) => projectImages(p).forEach((u) => urls.push(u)));
  return urls.length ? urls : [FALLBACK_HERO];
}

const HERO_SLIDES = allPortfolioImages();
const COLLAGE_IMAGES = [
  ...allPortfolioImages(),
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=600&q=80',
];

// =============================================================================
const $ = (sel, ctx = document) => ctx.querySelector(sel);

const state = {
  preloaderRunning: false,
  preloaderRaf: null,
  zoomFallbackTimer: null,
  metersRaf: null,
  previewTimer: null,
  sourceTimer: null,
  previewIdx: 0,
  previewLayer: 'a',
  sourceIdx: 0,
  sourceLayer: 'a',
  loadStart: 0,
  loadDuration: 0,
  loadPct: 0,
  preloaderMode: 'desktop',
  mobileGrade: { exposure: 0, contrast: 0, highlights: 0, shadows: 0, saturation: 0 },
  mobileSliderChannels: null,
  heroTimer: null,
  heroIndex: 0,
  activeLayer: 'a',
  deckIndex: 0,
  deckCount: 0,
  deckTransitioning: false,
  deckAutoplay: false,
  deckPaused: false,
  deckAutoplayTimer: null,
  galleryTimer: null,
  galleryIdx: 0,
  deckViewportW: 0,
  deckViewportH: 0,
};

const els = {};

function cacheElements() {
  Object.assign(els, {
    preloader: $('#preloader'),
    preloaderDesktop: $('#preloader-desktop'),
    preloaderMobile: $('#preloader-mobile'),
    lrPhoto: $('#lr-photo'),
    lrCanvas: $('#lr-canvas'),
    lrPct: $('#lr-pct'),
    lrStatus: $('#lr-status'),
    lrMeta: $('#lr-meta'),
    lrFillExposure: $('#lr-fill-exposure'),
    lrThumbExposure: $('#lr-thumb-exposure'),
    lrValExposure: $('#lr-val-exposure'),
    lrFillContrast: $('#lr-fill-contrast'),
    lrThumbContrast: $('#lr-thumb-contrast'),
    lrValContrast: $('#lr-val-contrast'),
    lrFillHighlights: $('#lr-fill-highlights'),
    lrThumbHighlights: $('#lr-thumb-highlights'),
    lrValHighlights: $('#lr-val-highlights'),
    lrFillShadows: $('#lr-fill-shadows'),
    lrThumbShadows: $('#lr-thumb-shadows'),
    lrValShadows: $('#lr-val-shadows'),
    lrFillSaturation: $('#lr-fill-saturation'),
    lrThumbSaturation: $('#lr-thumb-saturation'),
    lrValSaturation: $('#lr-val-saturation'),
    ppChrome: $('#pp-chrome'),
    playhead: $('#playhead'),
    timecode: $('#timecode'),
    programTc: $('#program-tc'),
    programDur: $('#program-dur'),
    programPanel: $('#program-panel'),
    ppPreviewA: $('#pp-preview-a'),
    ppPreviewB: $('#pp-preview-b'),
    ppSourceA: $('#pp-source-a'),
    ppSourceB: $('#pp-source-b'),
    sourceTc: $('#source-tc'),
    sourceScrub: $('#source-scrub'),
    programScrub: $('#program-scrub'),
    mediaBin: $('#media-bin'),
    mediaList: $('#media-list'),
    mainClip: $('#main-clip'),
    ppTracks: $('#pp-tracks'),
    timelineRuler: $('#timeline-ruler'),
    timelineArea: $('#timeline-area'),
    audioMeters: $('#audio-meters'),
    resetPreloader: $('#reset-preloader'),
    hero: $('#hero'),
    slideA: $('#slide-a'),
    slideB: $('#slide-b'),
    heroProgress: $('#hero-progress-bar'),
    enterExperience: $('#enter-experience'),
    quickContact: $('#quick-contact'),
    journey: $('#journey'),
    deckViewport: $('#deck-viewport'),
    deckTrack: $('#deck-track'),
    deckFx: $('#deck-fx'),
    deckFxReel: $('#deck-fx-reel'),
    deckPause: $('#deck-pause'),
    deckSequenceFill: $('#deck-sequence-fill'),
    deckDots: $('#deck-dots'),
    journeyIndex: $('#journey-index'),
    journeyCategory: $('#journey-category'),
    journeyGallery: $('#journey-gallery'),
    exitJourney: $('#exit-journey'),
    drawer: $('#contact-drawer'),
    drawerContent: $('#drawer-content'),
    drawerClose: $('#drawer-close'),
    turbulence: $('#turbulence'),
    displacement: $('#displacement'),
  });
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function getYouTubeId(url) {
  if (!url) return '';
  const m = String(url).match(/(?:youtu\.be\/|embed\/|v=)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : url.length === 11 ? url : '';
}

/**
 * Start offset in seconds. Accepts:
 * - number: 90
 * - string: "90", "1m30", "1m30s", "2h15m"
 * - URL with ?t=90 or ?t=1m30s (also read from media link)
 */
function parseYoutubeStart(value) {
  if (value == null || value === '') return 0;
  if (typeof value === 'number' && value >= 0) return Math.floor(value);

  let s = String(value).trim();
  const fromUrl = s.match(/[?&#]t=([^&#]+)/i);
  if (fromUrl) s = decodeURIComponent(fromUrl[1]);

  if (/^\d+$/.test(s)) return parseInt(s, 10);

  let total = 0;
  const hours = s.match(/(\d+)h/i);
  const mins = s.match(/(\d+)m/i);
  const secs = s.match(/(\d+)s/i);
  if (hours) total += parseInt(hours[1], 10) * 3600;
  if (mins) total += parseInt(mins[1], 10) * 60;
  if (secs) total += parseInt(secs[1], 10);
  if (total > 0) return total;

  const leadingNum = s.match(/^(\d+)/);
  return leadingNum ? parseInt(leadingNum[1], 10) : 0;
}

function youtubeStartForProject(p) {
  if (p.youtubeStart != null) return parseYoutubeStart(p.youtubeStart);
  return parseYoutubeStart(p.media);
}

function youtubeEmbed(url, startSeconds = 0) {
  const id = getYouTubeId(url);
  if (!id) return '';
  const start = Math.max(0, Math.floor(startSeconds));
  const q = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: id,
    controls: '0',
    disablekb: '1',
    fs: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    iv_load_policy: '3',
    cc_load_policy: '0',
    enablejsapi: '0',
  });
  if (start > 0) q.set('start', String(start));
  return `https://www.youtube-nocookie.com/embed/${id}?${q}`;
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isMobilePreloader() {
  return window.matchMedia(MOBILE_PRELOADER_MQ).matches;
}

function isDeckMobile() {
  return window.matchMedia(MOBILE_PRELOADER_MQ).matches;
}

const LR_MOBILE_SLIDERS = [
  { key: 'exposure', fill: 'lrFillExposure', thumb: 'lrThumbExposure', val: 'lrValExposure' },
  { key: 'contrast', fill: 'lrFillContrast', thumb: 'lrThumbContrast', val: 'lrValContrast' },
  { key: 'highlights', fill: 'lrFillHighlights', thumb: 'lrThumbHighlights', val: 'lrValHighlights' },
  { key: 'shadows', fill: 'lrFillShadows', thumb: 'lrThumbShadows', val: 'lrValShadows' },
  { key: 'saturation', fill: 'lrFillSaturation', thumb: 'lrThumbSaturation', val: 'lrValSaturation' },
];

const LR_FINAL_GRADE = {
  exposure: 0.94,
  contrast: 0.9,
  highlights: 0.78,
  shadows: 0.72,
  saturation: 0.96,
};

function heroImages() {
  return HERO_SLIDES.length ? HERO_SLIDES : [FALLBACK_HERO];
}

/** Synced timecode from load progress 0–100 (23.976 fps, ~28s sequence) */
function formatTimecodeFromProgress(pct) {
  const totalFrames = Math.floor(28 * SEQUENCE_FPS);
  const frame = Math.floor((pct / 100) * totalFrames);
  const ff = Math.floor(frame % SEQUENCE_FPS);
  const totalSec = Math.floor(frame / SEQUENCE_FPS);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(ff)}`;
}

function formatTimecodeLive(elapsedMs, durationMs) {
  const pct = durationMs ? Math.min(elapsedMs / durationMs, 1) : 0;
  return formatTimecodeFromProgress(pct * 100);
}

function formatSourceTimecode(pct) {
  const totalFrames = Math.floor(8.5 * SEQUENCE_FPS);
  const frame = Math.floor((pct / 100) * totalFrames);
  const ff = Math.floor(frame % SEQUENCE_FPS);
  const totalSec = Math.floor(frame / SEQUENCE_FPS);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  return `${pad(m)}:${pad(s)}:${pad(ff)}`;
}

// =============================================================================
// Mobile develop — flat RAW → graded (random independent sliders)
// =============================================================================
function mobileDevelopFilter(grade) {
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

function setLrSliderUI(slider, t) {
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

function applyMobileGradeToPhoto() {
  if (els.lrPhoto) els.lrPhoto.style.filter = mobileDevelopFilter();
}

function highlightActiveLrSlider(activeKey) {
  document.querySelectorAll('.lr-slider').forEach((row) => {
    row.classList.toggle('is-active', row.dataset.slider === activeKey);
  });
}

// =============================================================================
// PRELOADER — High-fidelity Premiere Pro
// =============================================================================
function buildTimelineRuler() {
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

function buildMediaBin() {
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

function setMonitorSlide(target, url, layer) {
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

function highlightBinIndex(idx) {
  els.mediaBin?.querySelectorAll('.pp-bin-item').forEach((item, i) => {
    item.classList.toggle('is-active', i === idx % 6);
  });
  els.mediaList?.querySelectorAll('.pp-list-row:not(.folder):not(.seq)').forEach((row, i) => {
    row.classList.toggle('is-active', i === idx % 5);
  });
}

function startPreviewSlideshow() {
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
    const next = (state.previewIdx + 1) % slides.length;
    const layer = state.previewLayer === 'a' ? 'b' : 'a';
    setMonitorSlide('program', slides[next], layer);
    state.previewIdx = next;
    state.previewLayer = layer;
    highlightBinIndex(next);
  }, 850);

  if (state.sourceTimer) clearInterval(state.sourceTimer);
  state.sourceTimer = setInterval(() => {
    const next = (state.sourceIdx + 2) % slides.length;
    const layer = state.sourceLayer === 'a' ? 'b' : 'a';
    setMonitorSlide('source', slides[next], layer);
    state.sourceIdx = next;
    state.sourceLayer = layer;
  }, 1100);
}

function stopPreviewSlideshow() {
  if (state.previewTimer) clearInterval(state.previewTimer);
  if (state.sourceTimer) clearInterval(state.sourceTimer);
  state.previewTimer = null;
  state.sourceTimer = null;
}

function getPlayheadMax() {
  return els.ppTracks ? Math.max(els.ppTracks.clientWidth - 12, 80) : 300;
}

function updatePreloaderUI(pct, elapsedMs) {
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

function startAudioMeters() {
  const canvas = els.audioMeters;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const SEGMENTS = 32;
  const BOTTOM = 6;
  const TOP = 4;

  function resize() {
    const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: rect.width, h: rect.height };
  }

  /** Segments rise from bottom (−∞) toward top (0 dB) */
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
    const { w, h } = resize();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, w, h);

    const pct = state.loadPct / 100;
    const bounce = 0.12 + Math.sin(now * 0.014) * 0.1 + Math.sin(now * 0.031) * 0.06;
    const basePeak = 0.22 + pct * 0.72 + bounce;
    const barW = Math.max(8, (w - 14) / 2);
    const meterH = h - BOTTOM - TOP;
    const channels = [
      { x: 5, peak: Math.min(1, basePeak * (0.88 + Math.sin(now * 0.019) * 0.22)) },
      { x: 5 + barW + 5, peak: Math.min(1, basePeak * (0.84 + Math.cos(now * 0.017) * 0.24)) },
    ];

    channels.forEach((ch) => drawChannel(ch.x, barW, ch.peak, meterH, h));

    state.metersRaf = requestAnimationFrame(draw);
  }

  state.metersRaf = requestAnimationFrame(draw);
}

function stopAudioMeters() {
  if (state.metersRaf) cancelAnimationFrame(state.metersRaf);
  state.metersRaf = null;
}

function stopPreloaderLoop() {
  if (state.preloaderRaf) cancelAnimationFrame(state.preloaderRaf);
  state.preloaderRaf = null;
  stopAudioMeters();
  stopPreviewSlideshow();
  stopMobilePreloaderLoop();
}

// =============================================================================
// MOBILE PRELOADER — Lightroom Mobile (random independent sliders)
// =============================================================================
function stopMobilePreloaderLoop() {
  if (state.preloaderRaf) cancelAnimationFrame(state.preloaderRaf);
  state.preloaderRaf = null;
  state.mobileSliderChannels = null;
}

function initMobileSliderChannels() {
  state.mobileSliderChannels = LR_MOBILE_SLIDERS.map((s) => ({
    ...s,
    value: 0.28 + Math.random() * 0.12,
    target: Math.random() * 0.35,
  }));
}

function retargetMobileSliders(master) {
  state.mobileSliderChannels?.forEach((ch) => {
    const final = LR_FINAL_GRADE[ch.key];
    const jitter = (Math.random() - 0.5) * 0.42 * (1 - master);
    const drift = Math.random() * (1 - master * 0.7);
    ch.target = Math.max(0, Math.min(1, drift * 0.55 + final * master * 0.45 + jitter + master * final * 0.35));
  });
}

function runMobileRandomDevelop() {
  initMobileSliderChannels();
  const duration = reducedMotion() ? 1200 : CONFIG.mobilePreloaderMs;
  const start = performance.now();
  let lastRetarget = 0;

  function frame(now) {
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
    if (els.lrMeta) els.lrMeta.textContent = t < 0.15 ? 'RAW · Before' : 'CIPRI · After';
    if (els.lrStatus) {
      els.lrStatus.textContent = t < 0.2 ? 'Loading RAW…' : t < 0.92 ? 'Developing…' : 'Export complete';
    }

    if (t < 1) {
      state.preloaderRaf = requestAnimationFrame(frame);
    } else {
      Object.assign(state.mobileGrade, LR_FINAL_GRADE);
      LR_MOBILE_SLIDERS.forEach((s) => setLrSliderUI(s, LR_FINAL_GRADE[s.key]));
      applyMobileGradeToPhoto();
      stopMobilePreloaderLoop();
      mobileZoomReveal();
    }
  }

  state.preloaderRaf = requestAnimationFrame(frame);
}

function mobileZoomReveal() {
  const canvas = els.lrCanvas;
  if (!canvas) {
    revealSite();
    return;
  }

  if (els.lrMeta) els.lrMeta.textContent = 'CIPRI · After';
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

function runMobilePreloader() {
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
    els.lrPhoto.style.backgroundImage = `url("${img}")`;
    els.lrPhoto.style.filter = mobileDevelopFilter(state.mobileGrade);
  }
  LR_MOBILE_SLIDERS.forEach((s) => setLrSliderUI(s, 0));
  if (els.lrPct) els.lrPct.textContent = '0%';
  if (els.lrStatus) els.lrStatus.textContent = 'Loading RAW…';
  if (els.lrMeta) els.lrMeta.textContent = 'RAW · Before';

  runMobileRandomDevelop();
}

function runDesktopPreloader() {
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

function runPreloader() {
  if (isMobilePreloader()) runMobilePreloader();
  else runDesktopPreloader();
}

function clearZoomTimer() {
  if (state.zoomFallbackTimer) {
    clearTimeout(state.zoomFallbackTimer);
    state.zoomFallbackTimer = null;
  }
}

/** Sync hero with whichever preloader preview was active */
function handoffPreviewToHero() {
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

function finishZoomTransition() {
  clearZoomTimer();
  els.programPanel?.removeEventListener('transitionend', onZoomTransitionEnd);
  revealSite();
}

function onZoomTransitionEnd(e) {
  if (e.propertyName !== 'transform') return;
  finishZoomTransition();
}

function zoomIntoProgram() {
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

function revealSite() {
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

function resetPreloader() {
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

// =============================================================================
// HERO — Cargo liquid
// =============================================================================
function setSlideBg(el, url) {
  if (el) el.style.backgroundImage = `url("${url}")`;
}

function animateLiquid(intensity = 85) {
  if (reducedMotion() || !els.turbulence || !els.displacement) return Promise.resolve();

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

async function transitionHero(nextIdx) {
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

function startHeroSlideshow() {
  const slides = heroImages();
  state.heroIndex = 0;
  state.activeLayer = 'a';
  setSlideBg(els.slideA, slides[0]);
  els.slideA?.classList.add('slide-active');
  els.slideB?.classList.remove('slide-active', 'is-morphing-in', 'is-morphing-out', 'is-morphing');
  if (els.heroProgress) els.heroProgress.style.width = `${(1 / slides.length) * 100}%`;

  stopHeroSlideshow();
  state.heroTimer = setInterval(() => {
    transitionHero((state.heroIndex + 1) % slides.length);
  }, CONFIG.heroIntervalMs);
}

function stopHeroSlideshow() {
  if (state.heroTimer) clearInterval(state.heroTimer);
  state.heroTimer = null;
}

// =============================================================================
// PRESENTATION DECK — auto sequence, gallery cycling, film transitions
// =============================================================================
function buildDeckMedia(p) {
  if (p.type === 'youtube') {
    const start = youtubeStartForProject(p);
    return `<iframe class="deck-yt-frame" src="${youtubeEmbed(p.media, start)}" title="${p.title}" tabindex="-1" allow="autoplay; encrypted-media" loading="eager"></iframe>`;
  }
  const imgs = projectImages(p);
  const list = imgs.length ? imgs : [p.media || FALLBACK_HERO];
  return `<div class="deck-gallery" data-count="${list.length}">
    ${list.map((src, i) => `<div class="deck-gallery-slide${i === 0 ? ' is-on' : ''}" data-idx="${i}" style="background-image:url('${src}')" role="img" aria-label="${p.title} — ${i + 1} of ${list.length}"></div>`).join('')}
  </div>`;
}

function renderDeck() {
  if (!els.deckTrack) return;

  const projectSlides = PROJECTS.map(
    (p, i) => {
      const imgCount = p.type === 'youtube' ? 0 : projectImages(p).length || 1;
      return `
    <article class="deck-slide deck-slide--${p.type}" data-index="${i}" data-type="${p.type}" data-category="${p.category}" data-images="${imgCount}">
      <div class="deck-media deck-media--cinema">${buildDeckMedia(p)}</div>
      <div class="deck-copy">
        <span class="deck-cat">${p.category}</span>
        <h2 class="deck-title font-display">${p.title}</h2>
        <p class="deck-desc">${p.description}</p>
      </div>
    </article>`;
    }
  ).join('');

  const pitchSlide = `
    <article class="deck-slide deck-slide--pitch" data-index="${PROJECTS.length}" data-type="pitch" data-category="Contact">
      <div class="pitch-bg" aria-hidden="true"></div>
      <div class="pitch-inner">
        <p class="pitch-tagline">${CONTACT.tagline}</p>
        <h2 class="pitch-headline font-display">LET'S CREATE</h2>
        <p class="pitch-sub">Available for commissions, ESAD placements &amp; industry roles.</p>
        <div class="pitch-grid">
          <a class="pitch-card" href="mailto:${CONTACT.email}">
            <span class="label">Email</span><span class="value">${CONTACT.email}</span>
          </a>
          <a class="pitch-card" href="tel:${CONTACT.phone.replace(/\s/g, '')}">
            <span class="label">Phone</span><span class="value">${CONTACT.phone}</span>
          </a>
        </div>
        <div class="social-row">
          <a class="social-btn" href="${CONTACT.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg>
            <span>Instagram</span>
          </a>
          <a class="social-btn" href="${CONTACT.youtube}" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.5V8.5l5.5 3.5L10 15.5z"/></svg>
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </article>`;

  els.deckTrack.innerHTML = projectSlides + pitchSlide;
  state.deckCount = PROJECTS.length + 1;

  if (els.deckDots) {
    els.deckDots.innerHTML = Array.from({ length: state.deckCount }, (_, i) =>
      `<span class="deck-dot${i === 0 ? ' is-on' : ''}" data-idx="${i}" aria-hidden="true"></span>`
    ).join('');
  }

  syncDeckSlideMetrics();
}

function getActiveDeckSlide() {
  return els.deckTrack?.children[state.deckIndex] || null;
}

function updateDeckUI() {
  const slide = getActiveDeckSlide();
  const cat = slide?.dataset?.category || '—';
  if (els.journeyIndex) els.journeyIndex.textContent = pad(state.deckIndex + 1);
  if (els.journeyCategory) els.journeyCategory.textContent = cat;

  const gallery = slide?.querySelector('.deck-gallery');
  const imgTotal = gallery ? gallery.querySelectorAll('.deck-gallery-slide').length : 0;
  if (els.journeyGallery) {
    if (imgTotal > 1) {
      els.journeyGallery.classList.remove('hidden');
      els.journeyGallery.textContent = `${state.galleryIdx + 1}/${imgTotal}`;
    } else {
      els.journeyGallery.classList.add('hidden');
    }
  }

  els.deckTrack?.querySelectorAll('.deck-slide').forEach((s, i) => {
    s.classList.toggle('is-active', i === state.deckIndex);
  });
  els.deckDots?.querySelectorAll('.deck-dot').forEach((d, i) => {
    d.classList.toggle('is-on', i === state.deckIndex);
  });
  els.journey?.classList.toggle('is-pitch', slide?.dataset?.type === 'pitch');

  if (els.deckSequenceFill && state.deckCount > 1) {
    els.deckSequenceFill.style.width = `${((state.deckIndex + 1) / state.deckCount) * 100}%`;
  }
}

function syncDeckSlideMetrics() {
  if (!els.deckViewport || !els.deckTrack) return;

  const w = els.deckViewport.clientWidth;
  const h = els.deckViewport.clientHeight;
  state.deckViewportW = w;
  state.deckViewportH = h;

  const vertical = isDeckMobile();
  els.deckTrack.style.flexDirection = vertical ? 'column' : 'row';

  els.deckTrack.querySelectorAll('.deck-slide').forEach((slide) => {
    slide.style.width = `${w}px`;
    slide.style.height = `${h}px`;
    slide.style.flex = `0 0 ${vertical ? h : w}px`;
  });

  applyDeckTransform(state.deckIndex, false);
}

function applyDeckTransform(index, animate) {
  if (!els.deckTrack) return;
  const vertical = isDeckMobile();
  const w = state.deckViewportW || els.deckViewport?.clientWidth || window.innerWidth;
  const h = state.deckViewportH || els.deckViewport?.clientHeight || window.innerHeight;
  const offset = vertical ? -index * h : -index * w;

  els.deckTrack.style.transition = animate && !reducedMotion()
    ? `transform ${CONFIG.deckMoveMs}ms cubic-bezier(0.76, 0, 0.24, 1)`
    : 'none';
  els.deckTrack.style.transform = vertical
    ? `translate3d(0, ${offset}px, 0)`
    : `translate3d(${offset}px, 0, 0)`;
}

function setDeckPosition(index, animate) {
  state.deckIndex = index;
  applyDeckTransform(index, animate);
  updateDeckUI();
}

function clearDeckFx() {
  const reel = els.deckFxReel;
  if (reel) {
    reel.classList.remove('is-active');
    reel.style.opacity = '0';
    reel.style.transition = '';
  }
  els.deckTrack?.classList.remove('is-moving');
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function animateReelOpacity(from, to, ms) {
  const reel = els.deckFxReel;
  if (!reel || ms <= 0) return Promise.resolve();

  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / ms, 1);
      const eased = easeInOutQuad(t);
      reel.style.opacity = String(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

function waitDeckMove() {
  return new Promise((resolve) => {
    if (!els.deckTrack || reducedMotion()) {
      resolve();
      return;
    }
    const done = () => {
      els.deckTrack.removeEventListener('transitionend', onEnd);
      resolve();
    };
    const onEnd = (e) => {
      if (e.target === els.deckTrack && e.propertyName === 'transform') done();
    };
    els.deckTrack.addEventListener('transitionend', onEnd);
    setTimeout(done, CONFIG.deckMoveMs + 80);
  });
}

async function playDeckReelTransition(nextIndex) {
  if (reducedMotion()) {
    setDeckPosition(nextIndex, false);
    return;
  }

  const reel = els.deckFxReel;
  if (!reel) {
    setDeckPosition(nextIndex, true);
    await waitDeckMove();
    return;
  }

  clearDeckFx();
  reel.classList.add('is-active');
  reel.style.transition = 'none';
  reel.style.opacity = '0';

  const peak = 0.38;
  const dip = 0.22;

  await animateReelOpacity(0, peak, CONFIG.deckFxPreMs);

  setDeckPosition(nextIndex, true);
  const moveHalf = Math.floor(CONFIG.deckMoveMs * 0.55);
  const moveRest = CONFIG.deckMoveMs - moveHalf;

  await Promise.all([
    waitDeckMove(),
    animateReelOpacity(peak, dip, moveHalf),
  ]);

  await animateReelOpacity(dip, peak * 0.55, moveRest);
  await animateReelOpacity(peak * 0.55, 0, CONFIG.deckFxPostMs);

  reel.classList.remove('is-active');
  reel.style.opacity = '0';
}

function stopGalleryCycle() {
  if (state.galleryTimer) clearInterval(state.galleryTimer);
  state.galleryTimer = null;
}

function startGalleryCycle() {
  stopGalleryCycle();
  const slide = getActiveDeckSlide();
  const gallery = slide?.querySelector('.deck-gallery');
  if (!gallery) return;

  const frames = gallery.querySelectorAll('.deck-gallery-slide');
  if (frames.length <= 1) return;

  state.galleryIdx = 0;
  frames.forEach((f, i) => f.classList.toggle('is-on', i === 0));
  updateDeckUI();

  state.galleryTimer = setInterval(() => {
    if (state.deckPaused || state.deckTransitioning) return;
    frames[state.galleryIdx]?.classList.remove('is-on');
    state.galleryIdx = (state.galleryIdx + 1) % frames.length;
    frames[state.galleryIdx]?.classList.add('is-on');
    updateDeckUI();
  }, CONFIG.deckGalleryMs);
}

function slideHoldDuration(slide) {
  if (!slide) return CONFIG.deckHoldMs;
  if (slide.dataset.type === 'pitch') return CONFIG.deckPitchHoldMs;
  if (slide.dataset.type === 'youtube') return CONFIG.deckYoutubeHoldMs;
  const count = Number(slide.dataset.images) || 1;
  if (count <= 1) return CONFIG.deckHoldMs;
  return Math.max(
    CONFIG.deckHoldMs,
    count * CONFIG.deckImagePerPhotoMs + CONFIG.deckImageGalleryBufferMs
  );
}

function stopDeckAutoplay() {
  if (state.deckAutoplayTimer) clearTimeout(state.deckAutoplayTimer);
  state.deckAutoplayTimer = null;
  state.deckAutoplay = false;
}

function scheduleDeckAutoplay() {
  stopDeckAutoplay();
  if (state.deckPaused || state.deckTransitioning || !els.journey || els.journey.classList.contains('hidden')) {
    return;
  }

  state.deckAutoplay = true;
  const slide = getActiveDeckSlide();
  const hold = slideHoldDuration(slide);

  state.deckAutoplayTimer = setTimeout(async () => {
    if (state.deckPaused || state.deckTransitioning) return;

    if (state.deckIndex >= state.deckCount - 1) {
      if (CONFIG.deckLoop) {
        await goToDeckSlide(0, true);
        scheduleDeckAutoplay();
      }
      return;
    }

    await goToDeckSlide(state.deckIndex + 1, true);
    scheduleDeckAutoplay();
  }, hold);
}

async function goToDeckSlide(index, animate = true) {
  if (state.deckTransitioning || !state.deckCount) return;
  const next = Math.max(0, Math.min(index, state.deckCount - 1));
  if (next === state.deckIndex && animate) return;

  stopDeckAutoplay();
  stopGalleryCycle();
  state.deckTransitioning = true;

  if (animate) await playDeckReelTransition(next);
  else setDeckPosition(next, false);

  state.deckTransitioning = false;
  startGalleryCycle();
  updateDeckUI();

  if (!state.deckPaused && els.journey && !els.journey.classList.contains('hidden')) {
    scheduleDeckAutoplay();
  }
}

function toggleDeckPause() {
  state.deckPaused = !state.deckPaused;
  els.deckPause?.setAttribute('aria-pressed', String(state.deckPaused));
  els.deckPause.textContent = state.deckPaused ? 'Play' : 'Pause';
  els.journey?.classList.toggle('is-paused', state.deckPaused);

  if (state.deckPaused) {
    stopDeckAutoplay();
    stopGalleryCycle();
  } else {
    startGalleryCycle();
    scheduleDeckAutoplay();
  }
}

function initDeckInput() {
  els.deckPause?.addEventListener('click', toggleDeckPause);

  const onResize = () => {
    if (els.journey?.classList.contains('hidden')) return;
    syncDeckSlideMetrics();
  };
  window.addEventListener('resize', onResize);
  window.matchMedia(MOBILE_PRELOADER_MQ).addEventListener('change', onResize);
}

function enterJourney() {
  stopHeroSlideshow();
  els.hero?.classList.add('hidden');
  els.journey?.classList.remove('hidden', 'is-paused');
  document.body.classList.add('journey-open');
  els.journey?.classList.add('is-playing');

  state.deckIndex = 0;
  state.deckPaused = false;
  state.galleryIdx = 0;
  if (els.deckPause) {
    els.deckPause.setAttribute('aria-pressed', 'false');
    els.deckPause.textContent = 'Pause';
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      syncDeckSlideMetrics();
      setDeckPosition(0, false);
      startGalleryCycle();
      scheduleDeckAutoplay();
    });
  });
}

function exitJourney() {
  stopDeckAutoplay();
  stopGalleryCycle();
  clearDeckFx();
  els.journey?.classList.add('hidden');
  els.journey?.classList.remove('is-playing', 'is-paused');
  document.body.classList.remove('journey-open');
  els.hero?.classList.remove('hidden');
  state.deckIndex = 0;
  state.deckPaused = false;
  setDeckPosition(0, false);
  startHeroSlideshow();
}

// =============================================================================
// Contact drawer
// =============================================================================
function renderDrawer() {
  if (!els.drawerContent) return;
  els.drawerContent.innerHTML = `
    <div class="matrix-contact" style="position:relative;padding:0">
      <p class="tagline">${CONTACT.tagline}</p>
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:2.25rem">CONTACT</h2>
      <div class="pitch-grid" style="margin-top:1.5rem">
        <a class="pitch-card" href="mailto:${CONTACT.email}">
          <span class="label">Email</span><span class="value">${CONTACT.email}</span>
        </a>
        <a class="pitch-card" href="tel:${CONTACT.phone.replace(/\s/g, '')}">
          <span class="label">Phone</span><span class="value">${CONTACT.phone}</span>
        </a>
      </div>
      <div class="social-row" style="margin-top:1.25rem;justify-content:center">
        <a class="social-btn" href="${CONTACT.instagram}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
        <a class="social-btn" href="${CONTACT.youtube}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.5V8.5l5.5 3.5L10 15.5z"/></svg></a>
      </div>
    </div>`;
}

function openDrawer() {
  els.drawer?.classList.add('is-open');
  els.drawer?.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  els.drawer?.classList.remove('is-open');
  els.drawer?.setAttribute('aria-hidden', 'true');
}

function initInput() {
  document.addEventListener('keydown', (e) => {
    if (els.journey?.classList.contains('hidden')) return;
    if (e.key === 'Escape') exitJourney();
    if (e.key === ' ') {
      e.preventDefault();
      toggleDeckPause();
    }
  });
}

function init() {
  cacheElements();
  renderDeck();
  renderDrawer();
  initDeckInput();

  els.resetPreloader?.addEventListener('click', resetPreloader);
  els.enterExperience?.addEventListener('click', enterJourney);
  els.quickContact?.addEventListener('click', openDrawer);
  els.drawerClose?.addEventListener('click', closeDrawer);
  els.drawer?.addEventListener('click', (e) => { if (e.target === els.drawer) closeDrawer(); });
  els.exitJourney?.addEventListener('click', exitJourney);

  initInput();
  runPreloader();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
