"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OsirisStatue from "./OsirisStatue";
import HeavenGate from "./HeavenGate";
import PyramidSymbol from "./PyramidSymbol";
import StarSymbol from "./StarSymbol";
import AmbientSoundButton from "./AmbientSoundButton";

gsap.registerPlugin(ScrollTrigger);

const INVITATION_ARABIC =
  "تتشرف سلسلة وكالات اورس بدعوتكم لحضور تجربة مميزة من القهوة المختصة في فرع اورس - الرمادي - شارع المستودع";

export default function InvitationPage() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLElement>(null);
  const statueWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const orisInvitationRef = useRef<HTMLParagraphElement>(null);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const pinSection = pinSectionRef.current;
    const statueWrap = statueWrapRef.current;
    const overlay = overlayRef.current;
    const invite = inviteRef.current;
    const orisInvitation = orisInvitationRef.current;
    if (!pinSection || !statueWrap || !overlay || !invite) return;

    const ctx = gsap.context(() => {
      // One pinned section: zoom into statue, then dissolve into hieroglyph + invitation
      ScrollTrigger.create({
        trigger: pinSection,
        start: "top top",
        end: "+=220%",
        scrub: 1.2,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          // ORIS INVITATION: تختفي تدريجياً مع التمرير
          if (orisInvitation) {
            gsap.set(orisInvitation, { opacity: 1 - Math.min(p / 0.5, 1) });
          }
          // 0–45%: zoom into statue
          if (p <= 0.45) {
            const scale = 1 + (p / 0.45) * 3.2;
            gsap.set(statueWrap, { scale, opacity: 1 });
            gsap.set(overlay, { opacity: 0, visibility: "hidden" });
            gsap.set(invite, { opacity: 0, visibility: "hidden" });
          } else {
            // 45–75%: dissolve statue، إظهار خلفية الهيروغليف + العنوان + الرسالة
            const dissolve = Math.min((p - 0.45) / 0.3, 1);
            gsap.set(statueWrap, { opacity: 1 - dissolve, scale: 4.2 });
            gsap.set(overlay, { opacity: dissolve, visibility: "visible" });
            gsap.set(invite, { opacity: 1, visibility: "visible", y: 0 });
          }
        },
      });

    }, scrollWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <AmbientSoundButton />

      <div ref={scrollWrapperRef}>
        {/* Decorative spacer so first view is hero */}
        <div className="h-0" aria-hidden />

        {/* Single pinned section: hero → zoom → dissolve → invitation */}
        <section
          ref={pinSectionRef}
          className="relative flex min-h-screen flex-col items-center justify-end overflow-visible bg-[#1a1510] pb-20 pt-28 hieroglyph-wall"
        >
          <div className="absolute inset-0 sand-texture" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Logo: centered at top — خلفية سوداء تُخفى بالـ mix-blend */}
          <div
            className="absolute left-1/2 top-6 z-30 -translate-x-1/2 md:top-8"
            style={{ mixBlendMode: "lighten", isolation: "isolate" }}
          >
            <Image
              src="/logo.png"
              alt="ORIS Coffee House"
              width={140}
              height={80}
              className="h-auto w-[min(140px,35vw)] object-contain"
              priority
              sizes="(max-width: 768px) 35vw, 140px"
            />
          </div>

          <div className="absolute left-4 top-24 opacity-30 md:left-8">
            <HeavenGate size={56} />
          </div>
          <div className="absolute right-4 top-32 opacity-25 md:right-8">
            <PyramidSymbol size={40} />
          </div>
          <div className="absolute bottom-32 left-1/4 opacity-20">
            <StarSymbol size={28} />
          </div>
          <div className="absolute bottom-28 right-1/4 opacity-20">
            <StarSymbol size={24} />
          </div>

          {/* ORIS INVITATION: فوق التمثال، أخضر، كبير، يختفي مع التمرير */}
          <p
            ref={orisInvitationRef}
            className="absolute left-1/2 top-[38%] z-10 -translate-x-1/2 text-center font-readex text-2xl font-medium uppercase tracking-[0.2em] text-oris-green md:text-4xl md:tracking-[0.25em]"
          >
            ORIS INVITATION
          </p>

          {/* Statue: scales up then fades out — GSAP يتحكم بالـ scale */}
          <div
            ref={statueWrapRef}
            className="relative z-10 flex origin-center justify-center"
            style={{ transformOrigin: "center 72%" }}
          >
            <OsirisStatue />
          </div>
          <p className="relative z-10 mt-6 font-readex text-sm uppercase tracking-[0.3em] text-oris-beige/80">
            ORIS Coffee House
          </p>
          <p className="relative z-10 mt-4 font-readex text-xs tracking-widest text-oris-beige/50">
            مرّر للأسفل
          </p>

          {/* Overlay: hieroglyph wall + invitation (fades in as statue dissolves) */}
          <div
            ref={overlayRef}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0"
            style={{ visibility: "hidden" }}
            aria-hidden
          >
            <div className="absolute inset-0 hieroglyph-wall sand-texture animate-hieroglyph" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            <div
              ref={inviteRef}
              className="relative z-10 max-w-2xl px-4 text-center font-readex text-oris-white"
              style={{ opacity: 0 }}
            >
              <h2 className="mb-2 text-2xl font-medium tracking-wide text-oris-beige md:text-3xl">مَلاذ أوريس</h2>
              <p className="mb-4 text-lg font-medium text-oris-green md:text-xl">ملاذ الحضارة</p>
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2" dir="rtl">
                <span className="text-lg text-oris-beige md:text-xl">السيد/ة</span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="ضع اسمك الكريم"
                  className="min-w-[180px] max-w-[240px] rounded border border-oris-beige/40 bg-oris-beige/10 px-3 py-2 text-center font-readex text-lg text-oris-white placeholder:text-oris-beige/50 focus:border-oris-green focus:outline-none md:text-xl"
                  dir="rtl"
                />
              </div>
              <p className="text-base leading-loose md:text-xl md:leading-loose" dir="rtl">
                {INVITATION_ARABIC}
              </p>
              <p className="mt-10 font-medium text-oris-green">نتشرف بزيارتكم</p>
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-center gap-4 bg-[#1a1510] py-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://maps.app.goo.gl/aCdznEczarXNznWe8?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-oris-beige/40 bg-oris-beige/10 px-5 py-3 font-readex text-sm text-oris-beige transition hover:bg-oris-beige/20 hover:border-oris-green/50"
              aria-label="الموقع على خرائط جوجل"
            >
              <svg
                className="h-5 w-5 shrink-0 text-oris-green"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>الموقع على خرائط جوجل</span>
            </a>
            <a
              href="https://www.instagram.com/oriscoffee.iq?igsh=bGRveWFpeXhjczZ3"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-oris-beige/40 bg-oris-beige/10 px-5 py-3 font-readex text-sm text-oris-beige transition hover:bg-oris-beige/20 hover:border-oris-green/50"
              aria-label="إنستغرام أوريس كوفي"
            >
              <svg
                className="h-5 w-5 shrink-0 text-oris-green"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>إنستغرام</span>
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
