/** Timings, performance tuning, and sequence metadata (milliseconds unless noted). */
export const MOBILE_PRELOADER_MQ = '(max-width: 900px)';

export const SEQUENCE_FPS = 23.976;
export const SEQUENCE_DURATION_TC = '00:00:27:17';

export const TIMING = {
  /** Safety cap only — preloader hides when assets load, not after this delay */
  preloaderMaxWait: 25000,
  preloaderZoomDesktop: 950,
  preloaderZoomMobile: 780,
  heroSlide: 5800,
  heroLiquidFx: 1200,
  presentationFxBefore: 320,
  presentationSlideMove: 880,
  presentationFxAfter: 360,
  presentationImageMin: 5000,
  presentationImagePerPhoto: 1800,
  presentationImageGalleryBuffer: 600,
  presentationYoutube: 14000,
  presentationPitch: 9000,
  presentationGalleryInterval: 1800,
  presentationLoop: false,
};

export const CONFIG = {
  preloaderMaxWaitMs: TIMING.preloaderMaxWait,
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

export const FALLBACK_HERO =
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=85';

export const PERF = {
  meterFps: 24,
  resizeDebounceMs: 120,
  reelAnimCancel: 0,
  /** Same-tab return visits: skip preloader animation (much better LCP). */
  skipPreloaderIfSeen: true,
};
