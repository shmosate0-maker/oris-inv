# ORIS Coffee House — Luxury Web Invitation

A single-page, scroll-driven invitation for **ORIS Coffee House** built with **Next.js**, **React**, and **GSAP** (ScrollTrigger). Brand colors, Readex Pro (Arabic + Latin), and symbolic assets (Heaven Gate, Pyramid, Star) are integrated throughout.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and scroll to experience the sequence: hero → zoom into statue → dissolve → invitation text.

## Optional: Ambient sound

For wind/oud or ambient background audio, add an MP3 file at:

```
public/ambient.mp3
```

The **Ambient Sound** button (bottom-right) will play it when the file exists. If the file is missing, the button still works and playback simply won’t start.

## Tech stack

- **Next.js 14** (App Router)
- **React 18**
- **GSAP 3** + **ScrollTrigger**
- **Tailwind CSS**
- **Readex Pro** (Google Fonts, Latin + Arabic)

## Brand

- **Primary:** Classic Beige `#caab8f`
- **Secondary:** Ancestral Green `#6f874b`
- **Accent:** Ancient White `#ffffff`
- **Typography:** Readex Pro
- **Assets:** Heaven Gate (sun rays), Pyramid, Star (decorative SVGs)

## Build

```bash
npm run build
npm start
```

Mobile-responsive; RTL layout for Arabic invitation text.
