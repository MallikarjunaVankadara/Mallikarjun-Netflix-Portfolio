# REEL-LOCK 🔒 — Skills spinning-reel fix (PERMANENT)

**Reference name:** `REEL-LOCK`
If the Skills spinning wheel ever breaks again (frozen, clipped, not spinning, or
scrolling past without spinning), tell me: **"REEL-LOCK is broken"** and I'll
restore exactly these settings.

## Current mechanism: SPINNING FAN REEL, sticky-pinned + scrub-driven
The Skills section (`#skills`, EPISODE 03 | THE ARSENAL) shows the 3D "spinning
wheel" fan of skill cards. The PERMANENT fix for the old intermittent failure:
**pinning is done by CSS `position:sticky` (`.skills-sticky`), NOT a GSAP `pin:true`.**
ScrollTrigger only scrubs a progress value that drives the fan math via `place()`,
so it can never "fail to engage" the way the GSAP pin did. The browser handles the
sticking natively.

## Why the old version broke
The old version used `ScrollTrigger { pin:true }`. On reload the browser sometimes
restored scroll mid-page before ScrollTrigger measured, so the pin's `start:"top top"`
was already behind the scroll and the pin never engaged — leaving the cards frozen
and clipped at the top. CSS sticky does not have this failure mode.

## The hardcoded settings

### HTML (files/netflix/index.html)
`.fan-stage` + word/head/hint are wrapped inside `.skills-sticky` inside `#skills`:
```html
<section id="skills" class="skills" data-skills>
  <div class="skills-sticky">
    <div class="skills-word">SKILLS</div>
    <div class="skills-head">…chip…</div>
    <div class="fan-stage" data-fan></div>
    <div class="skills-hint" data-skills-hint>SCROLL TO SPIN THE REEL ↓</div>
  </div>
</section>
```

### CSS (files/netflix/style.css)
```css
.skills{position:relative;background:var(--bg)}              /* height set by JS */
.skills-sticky{position:sticky;top:0;height:100vh;overflow:hidden}  /* the pin */
.fan-stage{position:absolute;inset:0;display:flex;align-items:center;
  justify-content:center;perspective:1800px;transform-style:preserve-3d}
.fcard{position:absolute;left:50%;top:50%;width:min(440px,86vw);height:540px;…}
```

### JS (files/netflix/script.js) — Skills block
```js
const section = document.querySelector("[data-skills]");
const N = fanCards.length;
const place = (progress) => { /* reference fan math, sets each card */ };
mm.add("(min-width:769px)", () => {
  gsap.set(fanWrap, { opacity: 1 });
  place(0);
  const spin = () => window.innerHeight * 3.2;   // scroll distance for a full spin
  const sizeSection = () => { section.style.height = (window.innerHeight + spin()) + "px"; };
  sizeSection();
  ST.create({
    trigger: section, start: "top top", end: () => "+=" + spin(),
    scrub: 1, invalidateOnRefresh: true,
    snap: { snapTo: 1/(N-1), duration:{min:.1,max:.35}, ease:"power1.inOut" },
    onRefresh: self => { sizeSection(); place(self.progress * (N - 1)); },
    onUpdate: self => place(self.progress * (N - 1))
  });
});
mm.add("(max-width:768px)", () => { /* sticky->relative, stack cards vertically */ });
```
KEY: **NO `pin:true`.** CSS sticky pins; ScrollTrigger only scrubs. This is the fix.

### Global init guards (top of script.js) — keep these
```js
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);
```

### Refresh chain (bottom of script.js) — keep these
```js
const refresh = () => ST.refresh();
addEventListener("load", () => { refresh(); setTimeout(refresh, 300); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
setTimeout(refresh, 1200);
```
Plus `if (ST) ST.refresh();` inside the intro loader's onComplete.

## Fan math (reference-accurate — do not change)
card n at progress p: r = n - p; a = r*18°; x = sin(a)*1800; y = 1800 - cos(a)*1800;
z = -|r|*50; scale = max(.4, 1-|r|*.15); opacity = max(.1, 1-|r|*.3);
rotationZ = a; zIndex = round(100 - |r|*10). Full spin over `innerHeight*3.2` of scroll,
snap `1/(N-1)`. Cards use `xPercent:-50, yPercent:-50` so the centered-on-0 math aligns
to screen center.

## Notes
- Section height = `innerHeight + innerHeight*3.2` (set by JS), recomputed on refresh.
- Changing a section's height ABOVE Skills is now harmless — sticky re-pins natively.
- Mobile (<=768px) stacks the cards vertically instead of spinning.

_Last verified working: 2026-09-17 (sticky-pinned spinning reel)._
