import { CONTACT } from './config/contact.js';
import { els } from './core/state.js';

export function renderDrawer() {
  if (!els.drawerContent) return;
  els.drawerContent.innerHTML = `
    <div class="matrix-contact" style="position:relative;padding:0">
      <p class="tagline">${CONTACT.tagline}</p>
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:2.25rem">CONTACT</h2>
      <div class="pitch-grid" style="margin-top:1.5rem">
        <a class="pitch-card" href="mailto:${CONTACT.email}">
          <span class="label">Email</span><span class="value">${CONTACT.email}</span>
        </a>
        <a class="pitch-card" href="tel:${CONTACT.phone.replace(/\s/g, '')}">
          <span class="label">Phone</span><span class="value">${CONTACT.phone}</span>
        </a>
      </div>
      <div class="social-row" style="margin-top:1.25rem;justify-content:center">
        <a class="social-btn" href="${CONTACT.instagram}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
        <a class="social-btn" href="${CONTACT.youtube}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.5V8.5l5.5 3.5L10 15.5z"/></svg></a>
      </div>
    </div>`;
}

export function openDrawer() {
  els.drawer?.classList.add('is-open');
  els.drawer?.setAttribute('aria-hidden', 'false');
}

export function closeDrawer() {
  els.drawer?.classList.remove('is-open');
  els.drawer?.setAttribute('aria-hidden', 'true');
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