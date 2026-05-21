import { PROJECTS } from '../config/projects.js';
import { FALLBACK_HERO } from '../config/timing.js';
import { heroImageUrl } from '../core/images.js';

export function projectImages(p) {
  if (p.images?.length) return p.images;
  if (p.type === 'image' && p.media) return [p.media];
  return [];
}

export function allPortfolioImages() {
  const urls = [];
  PROJECTS.forEach((p) => projectImages(p).forEach((u) => urls.push(heroImageUrl(u))));
  return urls.length ? urls : [heroImageUrl(FALLBACK_HERO)];
}

export const HERO_SLIDES = allPortfolioImages();

export function heroImages() {
  return HERO_SLIDES.length ? HERO_SLIDES : [FALLBACK_HERO];
}
