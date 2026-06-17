# CIPRIAN MIHAI NICULAE — Visual Artist & Filmmaker

## Run

```bash
npx serve .
```

Open the URL shown (ES modules need a local server — `file://` will not work).

`npm install` pins `@vercel/speed-insights` in `package.json`; the browser loads it from the import map (jsDelivr CDN).

**Reset Preloader** (top-right) replays the intro.

### Vercel Speed Insights

1. In the [Vercel dashboard](https://vercel.com), open your project → **Speed Insights** → **Enable**.
2. Deploy to Vercel. Metrics are collected in production (not on `localhost`).
3. This site uses `injectSpeedInsights()` from `@vercel/speed-insights` in `js/analytics/speed-insights.js` — not the Next.js `SpeedInsights` component (`@vercel/speed-insights/next` is only for Next.js apps).

## Project layout

```
js/
  main.js              ← entry (wired from index.html)
  config/
    projects.js        ← **edit your portfolio projects here**
    contact.js         ← email, phone, social links
    timing.js          ← TIMING, CONFIG, PERF (all durations in ms)
  data/
    portfolio.js       ← hero image list derived from PROJECTS
  core/
    state.js           ← shared app state & DOM refs
    dom.js             ← cacheElements()
    utils.js           ← helpers, YouTube embed, timecode
  preloader/
    mobile.js          ← Lightroom-style mobile preloader
    desktop.js         ← Premiere-style desktop preloader
    transition.js      ← zoom into hero, reveal site
    loop.js            ← stop preloader timers
    index.js           ← run / reset preloader
  hero/
    index.js           ← home slideshow
  deck/
    index.js           ← Enter Experience presentation
  drawer.js            ← contact drawer
css/
  variables.css        ← :root, base resets
  preloader.css
  hero.css
  deck.css
style.css              ← imports css/*.css
index.html
```

Regenerate split files from the monolith (if you still have a single `app.js` backup):

```bash
node scripts/split-modules.mjs
node scripts/split-css.mjs
```

## Edit `js/config/projects.js`

### Multiple images per category

Each project can include an `images: [...]` array. During **Enter Experience**, the presentation cycles through every image before the next project.

```javascript
{
  id: 'street',
  category: 'Street',
  title: 'Urban Frequency',
  type: 'image',
  media: 'https://…',
  images: ['https://…/1.jpg', 'https://…/2.jpg'],
}
```

YouTube projects use `type: 'youtube'` and `media` (watch URL).

**Start later in the video:**

```javascript
{
  type: 'youtube',
  media: 'https://youtu.be/VIDEO_ID',
  youtubeStart: 90,
  // or media: 'https://youtu.be/VIDEO_ID?t=90',
}
```

## Edit `js/config/timing.js`

| Variable | What it controls |
|----------|------------------|
| `preloaderDesktop` / `preloaderMobile` | Preloader length |
| `presentationFxBefore` / `presentationSlideMove` / `presentationFxAfter` | Transition dip + slide move |
| `presentationImageMin` | Minimum time on a single-photo project |
| `presentationImagePerPhoto` | Extra ms per URL in `images: []` |
| `presentationYoutube` | How long YouTube slides stay |
| `presentationPitch` | Final contact slide |
| `presentationGalleryInterval` | Photo cycling within one project |
| `presentationLoop` | Restart from project 1 after pitch |

## Experience

1. **Preloaders** — Premiere (desktop) / Lightroom (mobile)
2. **Hero** — liquid slideshow
3. **Enter Experience** — automated sequence; **Pause** or **Space**; **Exit** to leave
4. Manual nav: arrows, dots, wheel (desktop), swipe (mobile), ←/→ keys
