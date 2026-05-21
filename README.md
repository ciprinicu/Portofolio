# CIPRI — Visual Artist & Filmmaker



## Run



```bash

npx serve .

```



**Reset Preloader** (top-right) replays the intro.



## Edit `app.js`



### `PROJECTS` — multiple images per category



Each project can include an `images: [...]` array with **any number** of image URLs. During **Enter Experience**, the presentation auto-advances and cycles through every image in that category before moving to the next project.



```javascript

{

  id: 'street',

  category: 'Street',

  title: 'Urban Frequency',

  type: 'image',

  media: 'https://…',           // fallback / primary

  images: [

    'https://…/photo1.jpg',

    'https://…/photo2.jpg',

    'https://…/photo3.jpg',

    // add more…

  ],

}

```



YouTube projects use `type: 'youtube'` and `media` (watch URL).



### `TIMING` — edit all durations in one place (ms)

In `app.js`, find the **`TIMING`** object (near the top). Examples:

| Variable | What it controls |
|----------|------------------|
| `preloaderDesktop` / `preloaderMobile` | Preloader length |
| `presentationFxBefore` / `presentationSlideMove` / `presentationFxAfter` | Transition dip + slide move |
| `presentationImageMin` | Minimum time on a single-photo project |
| `presentationImagePerPhoto` | Extra ms per URL in `images: []` |
| **`presentationYoutube`** | **How long YouTube slides stay** (default 14s) |
| `presentationPitch` | Final contact slide |
| `presentationGalleryInterval` | Photo cycling speed within one project |
| `presentationLoop` | `true` = restart from project 1 after pitch |

```javascript
presentationYoutube: 22000,  // 22 seconds on each YouTube project
```



## Experience



1. **Preloaders** — Premiere (desktop) / Lightroom (mobile)

2. **Hero** — liquid slideshow

3. **Enter Experience** — automated film sequence from project 1 → contact slide. **Pause** or **Space** to pause. **Exit** to leave.

4. Slides use pixel-perfect viewport sizing (fixed mobile framing). Gallery images rotate while each project is on screen.


