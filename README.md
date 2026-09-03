# Fahad Majeed — Video Editor & Content Creator Portfolio

A modern, high-performance personal portfolio website built for **Fahad Majeed**, a video editor and content creator based in Pakistan. The site showcases commercial campaigns, documentaries, music videos, and short-form vertical edits (Reels, TikTok, Shorts) with a dark cinematic aesthetic, ambient animations, and native HTML5 video playback.

---

## ✨ Key Features

- **Cinematic Hero Section**:
  - Atmospheric ambient background with glowing ember orbs and studio dot grid textures.
  - 60fps damped mouse-move parallax effect using linear interpolation (LERP).
  - Floating canvas ember particle system that automatically pauses when scrolled away to ensure zero CPU idle waste.

- **Dual-Grid Project Gallery**:
  - **Category Filtering**: Instant switching between **"All"**, **"Shorts"**, and **"Long-Form"** projects.
  - **Shorts & Vertical Content (9:16)**: Multi-column side-by-side grid (4 columns on desktop, 3 on tablet, 2 on mobile) designed specifically for vertical Reels and TikTok formats.
  - **Long-Form & Commercials (16:9)**: 2-column widescreen grid for TVCs, documentaries, and cinematic edits.
  - **HTML5 Video Player**: Click-to-play local video integration (`assets/videos/sfx-reel.mp4`) with smooth overlay transitions and native playback controls.

- **About & Statistics**:
  - Editor biography and workflow breakdown.
  - Software list (DaVinci Resolve, Adobe Photoshop, Adobe Illustrator, CapCut Pro, Canva).
  - Animated count-up numbers triggered via `IntersectionObserver` when scrolled into view.

- **Services & Capabilities**:
  - Clear service cards covering Video Editing, Color Grading, Motion Graphics, Social Media Content, Sound Design, and YouTube Production.

- **Testimonials & Social Proof**:
  - Client reviews and recommendations from directors, strategists, and artists.

- **Interactive Contact Form**:
  - Client intake form with client-side field validation, service dropdown, and feedback status messages.

- **Responsive & Accessible**:
  - Fluid layouts tailored for desktop, tablet, and mobile screens.
  - Full support for `prefers-reduced-motion` to respect accessibility preferences.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic structure, accessible markup, and native `<video>` / `<canvas>` APIs.
- **CSS3 (Vanilla CSS)**:
  - CSS Custom Properties (Design Tokens for colors, spacing, and typography).
  - CSS Grid & Flexbox for dual-grid responsive gallery layouts.
  - GPU-accelerated keyframe animations and smooth transitions.
- **JavaScript (ES6+)**:
  - Vanilla JavaScript without heavy external frameworks.
  - `IntersectionObserver` for scroll reveals, active navigation links, and count-up animations.
  - HTML5 Canvas 2D API for lightweight particle rendering.
  - Linear Interpolation (LERP) for smooth mouse parallax depth.
- **Typography**: Google Fonts ([Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) and [Inter](https://fonts.google.com/specimen/Inter)).

---

## 🚀 How to View / Run Locally

You do not need any build steps, bundlers, or package installations to run this project.

### Option 1: Direct File Open (Simplest)
1. Double-click the [`index.html`](file:///c:/Users/Fahad%20Majeed/Desktop/My%20porfolio/index.html) file, or
2. Right-click [`index.html`](file:///c:/Users/Fahad%20Majeed/Desktop/My%20porfolio/index.html) and select **Open with** -> your favorite browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using a Local HTTP Server (Recommended for Media Streaming)
If you prefer running a local development server:

Using **Node.js / npx**:
```bash
npx serve -l 3000
```
Then open `http://localhost:3000` in your browser.

Or using **Python 3**:
```bash
python -m http.server 3000
```

---

## 📁 Project Structure

```
My portfolio/
├── assets/
│   ├── images/
│   │   └── profile.jpg          # Hero profile photo
│   └── videos/
│       ├── sfx-reel.mp4         # Local video reel (Shorts category)
│       ├── sfx reel.mov         # High-quality QuickTime source
│       ├── editor-reliable.mp4  # "The Reliable Editor" video reel (Shorts category)
│       ├── Editor Realaiable.mov # QuickTime source
│       ├── new-york.mp4         # "New York" widescreen video (Long-Form category)
│       ├── new-york.mov         # QuickTime source
│       ├── ice-cream-secrets.mp4 # "Ice Cream Secrets" documentary/commercial edit (Long-Form category)
│       └── Ice cream Secrets.mp4 # Original video source
├── css/
│   ├── style.css                # Core design system, layout, and component styles
│   └── animations.css           # Keyframe animations, scroll reveals & accessibility overrides
├── js/
│   └── main.js                  # Navbar, mobile drawer, parallax, particles, video & filters
├── index.html                   # Main single-page portfolio markup
└── README.md                    # Project documentation
```

---

## 📄 License & Copyright

© 2024–2026 **Fahad Majeed**. All rights reserved.
