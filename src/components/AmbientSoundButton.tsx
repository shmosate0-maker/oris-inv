"use client";

import { useCallback, useRef, useState } from "react";

export default function AmbientSoundButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      // Place ambient wind/oud track in public/ambient.mp3 for ancient vibes
      audio.src = "/ambient.mp3";
      audio.loop = true;
      audio.volume = 0.35;
      audio.onerror = () => { /* optional: add ambient.mp3 to public/ for wind/oud */ };
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  }, [playing]);

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-oris-beige/50 bg-[#1a1510]/95 text-oris-beige shadow-lg backdrop-blur-sm transition hover:bg-oris-beige/20 focus:outline-none focus:ring-2 focus:ring-oris-green md:bottom-8 md:right-8"
      aria-label={playing ? "إيقاف الصوت" : "تشغيل الصوت المحيط"}
      title={playing ? "إيقاف الصوت" : "تشغيل الصوت المحيط"}
    >
      {playing ? (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M6 6h12v12H6V6z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      )}
    </button>
  );
}
