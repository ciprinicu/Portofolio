import { els, state } from '../core/state.js';
import { stopPreloaderLoop } from './loop.js';
import { clearZoomTimer, revealSite } from './transition.js';

/** Assets ready — show the site immediately (no zoom / no minimum wait). */
export function completePreloader() {
  stopPreloaderLoop();
  clearZoomTimer();
  revealSite({ instant: true });
  els.preloaderMobile?.setAttribute('aria-hidden', 'true');
}
