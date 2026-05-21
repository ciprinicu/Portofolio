import { stopPreloaderLoop } from './loop.js';
import { zoomIntoProgram } from './transition.js';

/**
 * Assets ready — kick off the cinematic zoom transition.
 * Desktop: zooms into the Premiere program monitor → hero.
 * (Mobile has its own mobileZoomReveal path in mobile.js.)
 */
export function completePreloader() {
  stopPreloaderLoop();
  zoomIntoProgram();
}
