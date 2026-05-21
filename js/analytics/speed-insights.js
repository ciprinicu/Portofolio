/**
 * Vercel Speed Insights (vanilla). Deferred so it does not compete with LCP.
 */
import { injectSpeedInsights } from '@vercel/speed-insights';

export function initSpeedInsights() {
  injectSpeedInsights({
    route: window.location.pathname || '/',
  });
}
