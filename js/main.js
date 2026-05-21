/**
 * CIPRI — entry point. Edit content in js/config/ and js/data/.
 */
import { cacheElements } from './core/dom.js';
import { warmLcpImages } from './core/images.js';
import { els } from './core/state.js';
import { heroImages } from './data/portfolio.js';
import { openDrawer, closeDrawer, renderDrawer } from './drawer.js';
import {
  renderDeck,
  enterJourney,
  exitJourney,
  initDeckInput,
  initPageVisibility,
  initInput,
} from './deck/index.js';
import { runPreloader, resetPreloader } from './preloader/index.js';
import { initSpeedInsights } from './analytics/speed-insights.js';

warmLcpImages(heroImages());

function init() {
  cacheElements();
  renderDeck();
  renderDrawer();
  initDeckInput();

  els.resetPreloader?.addEventListener('click', resetPreloader);
  els.enterExperience?.addEventListener('click', enterJourney);
  els.quickContact?.addEventListener('click', openDrawer);
  els.drawerClose?.addEventListener('click', closeDrawer);
  els.drawer?.addEventListener('click', (e) => {
    if (e.target === els.drawer) closeDrawer();
  });
  els.exitJourney?.addEventListener('click', exitJourney);

  initInput();
  initPageVisibility();
  runPreloader();
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => initSpeedInsights(), { timeout: 4000 });
} else {
  window.addEventListener('load', () => initSpeedInsights(), { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
