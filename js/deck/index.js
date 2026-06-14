import { PROJECTS } from '../config/projects.js';
import { CONTACT } from '../config/contact.js';
import { CONFIG, FALLBACK_HERO, MOBILE_PRELOADER_MQ, PERF } from '../config/timing.js';
import { projectImages, allPortfolioImages } from '../data/portfolio.js';
import { heroImageUrl } from '../core/images.js';
import { els, state } from '../core/state.js';
import {
  debounce,
  isDeckMobile,
  isPageActive,
  pad,
  reducedMotion,
  youtubeEmbed,
  youtubeStartForProject,
} from '../core/utils.js';
import { stopHeroSlideshow, startHeroSlideshow } from '../hero/index.js';

export function buildDeckMedia(p) {
  if (p.type === 'youtube') {
    const start = youtubeStartForProject(p);
    const embed = youtubeEmbed(p.media, start);
    return `<div class="deck-yt-slot" data-embed="${embed}" data-title="${p.title.replace(/"/g, '&quot;')}"></div>`;
  }
  const imgs = projectImages(p);
  const list = imgs.length ? imgs : [p.media || FALLBACK_HERO];
  return `<div class="deck-gallery" data-count="${list.length}">
    ${list.map((src, i) => `<div class="deck-gallery-slide${i === 0 ? ' is-on' : ''}" data-idx="${i}" style="background-image:url('${heroImageUrl(src)}')" role="img" aria-label="${p.title} — ${i + 1} of ${list.length}"></div>`).join('')}
  </div>`;
}

export function renderDeck() {
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

  const allImgs = allPortfolioImages();
  let shuffledImgs = [...allImgs].sort(() => Math.random() - 0.5);
  let finalImgs = [];
  while (finalImgs.length < 90) {
    finalImgs = finalImgs.concat(shuffledImgs);
  }
  finalImgs = finalImgs.slice(0, 90);
  
  for (let i = 1; i < finalImgs.length; i++) {
    if (finalImgs[i] === finalImgs[i - 1] && i + 1 < finalImgs.length) {
      const temp = finalImgs[i];
      finalImgs[i] = finalImgs[i + 1];
      finalImgs[i + 1] = temp;
    }
  }

  const tilesHtml = finalImgs.map((src, i) => {
    const left = (i * (100 / 90)) + (Math.random() * 2 - 1); 
    const size = 100 + Math.random() * 140;
    const duration = 15 + Math.random() * 30;
    const delay = -(Math.random() * 50).toFixed(2);
    return `<div class="matrix-tile" style="background-image:url('${src}'); left:${left}%; width:${size}px; animation-duration:${duration}s; animation-delay:${delay}s;"></div>`;
  }).join('');

  const pitchSlide = `
    <article class="deck-slide deck-slide--pitch scene-matrix" data-index="${PROJECTS.length}" data-type="pitch" data-category="Contact">
      <div class="matrix-bg" aria-hidden="true">
        <div class="matrix-collage">
          ${tilesHtml}
        </div>
        <div class="matrix-vignette"></div>
      </div>
      <div class="matrix-contact">
        <p class="tagline">${CONTACT.tagline}</p>
        <h2 class="font-display">LET'S CREATE</h2>
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
      `<button type="button" class="deck-dot${i === 0 ? ' is-on' : ''}" data-goto="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');
    els.deckDots.querySelectorAll('.deck-dot').forEach((dot) => {
      dot.addEventListener('click', () => goToDeckSlide(Number(dot.dataset.goto), true));
    });
  }

  syncDeckSlideMetrics();
}

export function getActiveDeckSlide() {
  return els.deckTrack?.children[state.deckIndex] || null;
}

export function updateDeckUI() {
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

  if (els.deckPrev) els.deckPrev.disabled = state.deckIndex <= 0;
  if (els.deckNext) els.deckNext.disabled = state.deckIndex >= state.deckCount - 1;

  syncDeckYoutubeMounts();
}

export function syncDeckYoutubeMounts() {
  if (!els.deckTrack) return;
  els.deckTrack.querySelectorAll('.deck-slide--youtube').forEach((slide) => {
    const slot = slide.querySelector('.deck-yt-slot');
    if (!slot) return;
    if (Number(slide.dataset.index) === state.deckIndex) {
      if (!slot.querySelector('iframe')) {
        const title = slot.dataset.title || 'Video';
        slot.innerHTML = `<iframe class="deck-yt-frame" src="${slot.dataset.embed}" title="${title}" tabindex="-1" allow="autoplay; encrypted-media" loading="lazy"></iframe>`;
      }
    } else if (slot.innerHTML) {
      slot.innerHTML = '';
    }
  });
}

export function syncDeckSlideMetrics() {
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

export function applyDeckTransform(index, animate) {
  if (!els.deckTrack) return;
  const vertical = isDeckMobile();
  const w = state.deckViewportW || els.deckViewport?.clientWidth || window.innerWidth;
  const h = state.deckViewportH || els.deckViewport?.clientHeight || window.innerHeight;
  const offset = vertical ? -index * h : -index * w;

  const moving = animate && !reducedMotion();
  els.deckTrack.style.transition = moving
    ? `transform ${CONFIG.deckMoveMs}ms cubic-bezier(0.76, 0, 0.24, 1)`
    : 'none';
  els.deckTrack.classList.toggle('is-moving', moving);
  els.deckTrack.style.transform = vertical
    ? `translate3d(0, ${offset}px, 0)`
    : `translate3d(${offset}px, 0, 0)`;
  if (!moving) els.deckTrack.classList.remove('is-moving');
}

export function setDeckPosition(index, animate) {
  state.deckIndex = index;
  applyDeckTransform(index, animate);
  updateDeckUI();
}

export function clearDeckFx() {
  PERF.reelAnimCancel += 1;
  const reel = els.deckFxReel;
  if (reel) {
    reel.classList.remove('is-active');
    reel.style.opacity = '0';
    reel.style.transition = '';
  }
  els.deckTrack?.classList.remove('is-moving');
}

export function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function animateReelOpacity(from, to, ms, gen) {
  const reel = els.deckFxReel;
  if (!reel || ms <= 0) return Promise.resolve();

  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now) => {
      if (gen !== PERF.reelAnimCancel) {
        resolve();
        return;
      }
      const t = Math.min((now - start) / ms, 1);
      const eased = easeInOutQuad(t);
      reel.style.opacity = String(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

export function waitDeckMove() {
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

export async function playDeckReelTransition(nextIndex) {
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
  const gen = PERF.reelAnimCancel;
  reel.classList.add('is-active');
  reel.style.transition = 'none';
  reel.style.opacity = '0';

  const peak = 0.38;
  const dip = 0.22;

  await animateReelOpacity(0, peak, CONFIG.deckFxPreMs, gen);
  if (gen !== PERF.reelAnimCancel) return;

  setDeckPosition(nextIndex, true);
  const moveHalf = Math.floor(CONFIG.deckMoveMs * 0.55);
  const moveRest = CONFIG.deckMoveMs - moveHalf;

  await Promise.all([
    waitDeckMove(),
    animateReelOpacity(peak, dip, moveHalf, gen),
  ]);
  if (gen !== PERF.reelAnimCancel) return;

  await animateReelOpacity(dip, peak * 0.55, moveRest, gen);
  await animateReelOpacity(peak * 0.55, 0, CONFIG.deckFxPostMs, gen);

  if (gen === PERF.reelAnimCancel) {
    reel.classList.remove('is-active');
    reel.style.opacity = '0';
  }
}

export function stopGalleryCycle() {
  if (state.galleryTimer) clearInterval(state.galleryTimer);
  state.galleryTimer = null;
}

export function startGalleryCycle() {
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
    if (!isPageActive() || state.deckPaused || state.deckTransitioning) return;
    frames[state.galleryIdx]?.classList.remove('is-on');
    state.galleryIdx = (state.galleryIdx + 1) % frames.length;
    frames[state.galleryIdx]?.classList.add('is-on');
    updateDeckUI();
  }, CONFIG.deckGalleryMs);
}

export function slideHoldDuration(slide) {
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

export function stopDeckAutoplay() {
  if (state.deckAutoplayTimer) clearTimeout(state.deckAutoplayTimer);
  state.deckAutoplayTimer = null;
  state.deckAutoplay = false;
}

export function scheduleDeckAutoplay() {
  stopDeckAutoplay();
  if (state.deckPaused || state.deckTransitioning || !els.journey || els.journey.classList.contains('hidden')) {
    return;
  }

  state.deckAutoplay = true;
  const slide = getActiveDeckSlide();
  const hold = slideHoldDuration(slide);

  state.deckAutoplayTimer = setTimeout(async () => {
    if (!isPageActive() || state.deckPaused || state.deckTransitioning) return;

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

export async function goToDeckSlide(index, animate = true) {
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

export async function deckStep(delta) {
  if (state.deckTransitioning || !state.deckCount) return;
  const next = state.deckIndex + delta;
  if (next < 0 || next >= state.deckCount) return;
  await goToDeckSlide(next, true);
}

export function toggleDeckPause() {
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

export function initDeckInput() {
  if (state.deckInputReady) return;
  state.deckInputReady = true;

  els.deckPause?.addEventListener('click', toggleDeckPause);
  els.deckPrev?.addEventListener('click', () => deckStep(-1));
  els.deckNext?.addEventListener('click', () => deckStep(1));

  const vp = els.deckViewport;
  if (vp) {
    vp.addEventListener(
      'wheel',
      (e) => {
        if (els.journey?.classList.contains('hidden')) return;
        const absX = Math.abs(e.deltaX);
        const absY = Math.abs(e.deltaY);
        if (absX < 14 && absY < 14) return;
        if (isDeckMobile() && absY <= absX) return;
        if (!isDeckMobile() && absX <= absY * 0.6) return;
        e.preventDefault();
        if (e.deltaX > 0 || e.deltaY > 0) deckStep(1);
        else deckStep(-1);
      },
      { passive: false }
    );

    vp.addEventListener(
      'touchstart',
      (e) => {
        state.touchStartX = e.changedTouches[0].clientX;
        state.touchStartY = e.changedTouches[0].clientY;
      },
      { passive: true }
    );

    vp.addEventListener(
      'touchend',
      (e) => {
        if (els.journey?.classList.contains('hidden')) return;
        const dx = e.changedTouches[0].clientX - state.touchStartX;
        const dy = e.changedTouches[0].clientY - state.touchStartY;
        if (isDeckMobile()) {
          if (Math.abs(dy) < 52 || Math.abs(dy) < Math.abs(dx)) return;
          if (dy < 0) deckStep(1);
          else deckStep(-1);
        } else {
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          if (dx < 0) deckStep(1);
          else deckStep(-1);
        }
      },
      { passive: true }
    );
  }

  const onResize = debounce(() => {
    if (els.journey?.classList.contains('hidden')) return;
    syncDeckSlideMetrics();
  }, PERF.resizeDebounceMs);
  window.addEventListener('resize', onResize);
  window.matchMedia(MOBILE_PRELOADER_MQ).addEventListener('change', onResize);
}

export function initPageVisibility() {
  document.addEventListener('visibilitychange', () => {
    if (isPageActive()) {
      if (!els.hero?.classList.contains('hidden')) startHeroSlideshow();
      if (!els.journey?.classList.contains('hidden') && !state.deckPaused) {
        startGalleryCycle();
        scheduleDeckAutoplay();
      }
      return;
    }
    stopDeckAutoplay();
    stopGalleryCycle();
    stopHeroSlideshow();
    stopAudioMeters();
  });
}

export function enterJourney() {
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

export function exitJourney() {
  stopDeckAutoplay();
  stopGalleryCycle();
  els.deckTrack?.querySelectorAll('.deck-yt-slot').forEach((slot) => { slot.innerHTML = ''; });
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

export function initInput() {
  document.addEventListener('keydown', (e) => {
    if (els.journey?.classList.contains('hidden')) return;
    if (e.key === 'Escape') exitJourney();
    if (e.key === ' ') {
      e.preventDefault();
      toggleDeckPause();
    }
    if (e.key === 'ArrowRight') deckStep(1);
    if (e.key === 'ArrowLeft') deckStep(-1);
  });
}