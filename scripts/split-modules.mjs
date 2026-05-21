import fs from 'fs';

const src = fs.readFileSync('app.js', 'utf8');
const lines = src.split(/\r?\n/);

function extract(start, end) {
  return lines.slice(start - 1, end).join('\n');
}

function exportify(body) {
  return body
    .replace(/^async function /gm, 'export async function ')
    .replace(/^function /gm, 'export function ');
}

const mobileImports = `import { CONFIG } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { els, state } from '../core/state.js';
import { isPageActive, reducedMotion } from '../core/utils.js';
import { clearZoomTimer, finishZoomTransition, revealSite } from './transition.js';

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

`;

const desktopImports = `import { CONFIG, PERF, SEQUENCE_DURATION_TC, SEQUENCE_FPS } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { els, state } from '../core/state.js';
import { formatSourceTimecode, formatTimecodeFromProgress, isPageActive, pad, reducedMotion } from '../core/utils.js';
import { zoomIntoProgram } from './transition.js';

`;

const transitionImports = `import { CONFIG } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { els, state } from '../core/state.js';
import { reducedMotion } from '../core/utils.js';
import { setSlideBg, startHeroSlideshow } from '../hero/index.js';
import { stopAudioMeters, stopPreviewSlideshow } from './desktop.js';
import { stopMobilePreloaderLoop } from './mobile.js';

`;

const indexImports = `import { els, state } from '../core/state.js';
import { isMobilePreloader } from '../core/utils.js';
import { runDesktopPreloader } from './desktop.js';
import { runMobilePreloader } from './mobile.js';
import { stopPreloaderLoop } from './transition.js';
import {
  clearDeckFx,
  stopDeckAutoplay,
  stopGalleryCycle,
} from '../deck/index.js';
import { stopHeroSlideshow } from '../hero/index.js';

`;

const deckImports = `import { PROJECTS } from '../config/projects.js';
import { CONTACT } from '../config/contact.js';
import { CONFIG, FALLBACK_HERO, MOBILE_PRELOADER_MQ, PERF } from '../config/timing.js';
import { projectImages } from '../data/portfolio.js';
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

`;

const heroImports = `import { CONFIG } from '../config/timing.js';
import { heroImages } from '../data/portfolio.js';
import { els, state } from '../core/state.js';
import { isPageActive, reducedMotion } from '../core/utils.js';

`;

const drawerImports = `import { CONTACT } from '../config/contact.js';
import { els } from '../core/state.js';

`;

fs.mkdirSync('js/preloader', { recursive: true });
fs.mkdirSync('js/deck', { recursive: true });
fs.mkdirSync('js/hero', { recursive: true });

fs.writeFileSync(
  'js/preloader/mobile.js',
  mobileImports + exportify(extract(442, 481)) + '\n' + exportify(extract(695, 852))
);
fs.writeFileSync(
  'js/preloader/desktop.js',
  desktopImports + exportify(extract(486, 683)) + '\n' + exportify(extract(854, 894))
);
fs.writeFileSync(
  'js/preloader/transition.js',
  transitionImports + exportify(extract(684, 690)) + '\n' + exportify(extract(901, 1023))
);
fs.writeFileSync('js/preloader/index.js', indexImports + exportify(extract(896, 899)) + '\n' + exportify(extract(1025, 1051)));
fs.writeFileSync('js/deck/index.js', deckImports + exportify(extract(1129, 1632)));
fs.writeFileSync('js/hero/index.js', heroImports + exportify(extract(1056, 1124)));
fs.writeFileSync('js/drawer.js', drawerImports + exportify(extract(1637, 1679)));

console.log('split ok');
