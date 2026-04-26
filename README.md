## Birthday Website (Responsive)

This is a single‑page responsive birthday website with:
- **Photos + memories** (timeline + gallery with lightbox)
- **Animated wish cards** (click to flip)
- **Handwritten-style letter** (typewriter effect)

## How to run

### Option A (recommended): VS Code / Cursor Live Server
- Install the **Live Server** extension
- Right‑click `index.html` → **Open with Live Server**

### Option B: Python simple server
From this folder:

```bash
python -m http.server 5500
```

Then open `http://localhost:5500` in your browser.

## Add her photos

Put images into:
- `assets/photos/featured.jpg` (the big hero photo)
- `assets/photos/01.jpg` … `assets/photos/06.jpg` (gallery photos)

If a gallery image is missing, it will automatically be hidden.

## Customize the name, mentor, memories, wishes, and letter

Edit `js/main.js` → the `DATA` object at the top:
- **person.name**: birthday girl name
- **person.mentorName**: your name (mentor)
- **memories**: timeline items
- **gallery**: photo list and captions
- **wishes**: card titles + texts
- **letter.paragraphs**: your mentor letter (each item is a paragraph)

## Tip: best photo sizes

- `featured.jpg`: portrait, about **900×1100** (or similar)
- gallery images: **1200px wide** (JPG/WEBP), any aspect ratio works

