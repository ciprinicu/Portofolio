/** Resize & format hints for remote images (Unsplash). */
export function optimizeImageUrl(url, opts = {}) {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('images.unsplash.com')) return url;

  const preset = opts.preset ?? 'hero';
  const width = opts.width ?? (preset === 'thumb' ? 480 : preset === 'hero' ? 1600 : 1280);
  const quality = opts.quality ?? (preset === 'thumb' ? 68 : 76);

  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    u.searchParams.set('q', String(quality));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
}

export function heroImageUrl(url) {
  return optimizeImageUrl(url, { preset: 'hero' });
}

export function thumbImageUrl(url) {
  return optimizeImageUrl(url, { preset: 'thumb' });
}

export function blurImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.includes('images.unsplash.com')) {
    const u = new URL(url);
    u.searchParams.set('w', '50');
    u.searchParams.set('q', '10');
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  }
  // Local file
  const ext = url.substring(url.lastIndexOf('.'));
  if (!ext || ext.length > 5) return url;
  const base = url.substring(0, url.lastIndexOf('.'));
  return `${base}-thumb${ext}`;
}

const warmed = new Set();

/** Preload/decoding hint — call early for LCP candidates. */
export function preloadImage(url, { high = false } = {}) {
  if (!url || warmed.has(url)) return;
  warmed.add(url);

  if (high && ![...document.querySelectorAll('link[rel="preload"][as="image"]')].some((l) => l.href === url)) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }

  const img = new Image();
  img.decoding = 'async';
  if (high) img.fetchPriority = 'high';
  img.src = url;
}

export function warmLcpImages(urls = []) {
  const list = urls.filter(Boolean);
  if (list[0]) preloadImage(list[0], { high: true });
  if (list[1]) preloadImage(list[1]);
}

/** Resolves when decoded (or on error — never blocks forever). */
export function whenImageLoaded(url) {
  if (!url) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();
    const finish = () => resolve();
    img.onload = finish;
    img.onerror = finish;
    img.decoding = 'async';
    img.src = url;
    if (img.complete && img.naturalWidth > 0) finish();
  });
}

const highResQueue = [];
let activeDownloads = 0;

function processImageDownloadQueue() {
  if (activeDownloads >= 3 || highResQueue.length === 0) return;
  const { el, highUrl } = highResQueue.shift();
  activeDownloads++;

  const img = new Image();
  img.decoding = 'async';
  img.onload = img.onerror = () => {
    activeDownloads--;
    if (img.complete && img.naturalWidth > 0 && el.dataset.loadingUrl === highUrl) {
      el.style.backgroundImage = `url("${highUrl}")`;
      el.classList.remove('is-blur-placeholder');
    }
    processImageDownloadQueue();
  };
  el.dataset.loadingUrl = highUrl;
  img.src = highUrl;
}

export function loadWithBlurPlaceholder(el, rawUrl, isThumb = false) {
  if (!el || !rawUrl) return;
  const blurUrl = blurImageUrl(rawUrl);
  const highUrl = isThumb ? thumbImageUrl(rawUrl) : heroImageUrl(rawUrl);

  // Set blur placeholder first
  if (!el.style.backgroundImage || el.style.backgroundImage === 'none' || el.style.backgroundImage === '') {
    el.style.backgroundImage = `url("${blurUrl}")`;
    el.classList.add('is-blur-placeholder');
  }

  // Queue high res
  highResQueue.push({ el, highUrl });
  processImageDownloadQueue();
}
