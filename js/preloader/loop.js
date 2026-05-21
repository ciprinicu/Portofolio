import { state } from '../core/state.js';
import { stopMobilePreloaderLoop } from './mobile.js';

export function stopPreloaderLoop() {
  if (state.preloaderRaf) cancelAnimationFrame(state.preloaderRaf);
  state.preloaderRaf = null;

  if (state.metersRaf) cancelAnimationFrame(state.metersRaf);
  state.metersRaf = null;

  if (state.previewTimer) clearInterval(state.previewTimer);
  if (state.sourceTimer) clearInterval(state.sourceTimer);
  state.previewTimer = null;
  state.sourceTimer = null;

  stopMobilePreloaderLoop();
}
