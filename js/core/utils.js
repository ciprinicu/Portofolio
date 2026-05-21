import { SEQUENCE_FPS } from '../config/timing.js';

export const $ = (sel, ctx = document) => ctx.querySelector(sel);

export function debounce(fn, wait) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

export function isPageActive() {
  return document.visibilityState === 'visible';
}

export function pad(n) {
  return String(n).padStart(2, '0');
}

export function getYouTubeId(url) {
  if (!url) return '';
  const m = String(url).match(/(?:youtu\.be\/|embed\/|v=)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : url.length === 11 ? url : '';
}

export function parseYoutubeStart(value) {
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

export function youtubeStartForProject(p) {
  if (p.youtubeStart != null) return parseYoutubeStart(p.youtubeStart);
  return parseYoutubeStart(p.media);
}

export function youtubeEmbed(url, startSeconds = 0) {
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

export function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isMobilePreloader() {
  return window.matchMedia('(max-width: 900px)').matches;
}

export function isDeckMobile() {
  return window.matchMedia('(max-width: 900px)').matches;
}

export function formatTimecodeFromProgress(pct) {
  const totalFrames = Math.floor(28 * SEQUENCE_FPS);
  const frame = Math.floor((pct / 100) * totalFrames);
  const ff = Math.floor(frame % SEQUENCE_FPS);
  const totalSec = Math.floor(frame / SEQUENCE_FPS);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  const h = Math.floor(totalSec / 3600);
  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(ff)}`;
}

export function formatTimecodeLive(elapsedMs, durationMs) {
  const pct = durationMs ? Math.min(elapsedMs / durationMs, 1) : 0;
  return formatTimecodeFromProgress(pct * 100);
}

export function formatSourceTimecode(pct) {
  const totalFrames = Math.floor(8.5 * SEQUENCE_FPS);
  const frame = Math.floor((pct / 100) * totalFrames);
  const ff = Math.floor(frame % SEQUENCE_FPS);
  const totalSec = Math.floor(frame / SEQUENCE_FPS);
  const s = totalSec % 60;
  const m = Math.floor(totalSec / 60) % 60;
  return `${pad(m)}:${pad(s)}:${pad(ff)}`;
}
