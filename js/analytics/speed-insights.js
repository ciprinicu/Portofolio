/**
 * Vercel Speed Insights (vanilla). On Vercel, loads /_vercel/speed-insights/script.js.
 * For Next.js use @vercel/speed-insights/next — this project is static HTML + ES modules.
 */
import { injectSpeedInsights } from '@vercel/speed-insights';

export function initSpeedInsights() {
  injectSpeedInsights();
}
