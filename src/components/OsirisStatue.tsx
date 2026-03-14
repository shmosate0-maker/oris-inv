"use client";

import Image from "next/image";

interface OsirisStatueProps {
  className?: string;
}

/**
 * Displays the Egyptian statue image (transparent background only).
 * Designed to work with GSAP zoom (scale/transform on wrapper).
 */
export default function OsirisStatue({ className = "" }: OsirisStatueProps) {
  return (
    <div className={`relative flex items-end justify-center ${className}`} aria-hidden>
      <Image
        src="/statue.png"
        alt=""
        width={280}
        height={400}
        className="h-auto w-full max-w-[min(260px,75vw)] object-contain drop-shadow-2xl sm:max-w-[320px]"
        style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))" }}
        priority
        unoptimized={false}
        sizes="(max-width: 640px) 75vw, 320px"
      />
    </div>
  );
}
