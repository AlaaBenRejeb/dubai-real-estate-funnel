"use client";

import { useLang } from "@/lib/lang-context";

// ─────────────────────────────────────────────────────────────────────────────
// PASTE YOUR VSL EMBED URL HERE WHEN THE VIDEO IS READY
// YouTube:  "https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0"
// Vimeo:    "https://player.vimeo.com/video/YOUR_VIDEO_ID"
// Loom:     "https://www.loom.com/embed/YOUR_VIDEO_ID"
// Leave as "" to show the placeholder until you're ready.
// ─────────────────────────────────────────────────────────────────────────────
const VIDEO_URL = "";
// ─────────────────────────────────────────────────────────────────────────────

export default function VideoSection() {
  const { t } = useLang();

  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden border-t border-[rgba(39,39,42,0.5)]"
      dir={t.dir}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,168,83,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[860px] mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span
            className="text-[11px] text-[#52525B] font-mono tracking-widest uppercase"
            style={{ letterSpacing: "0.15em" }}
          >
            {t.sectionLabel01}
          </span>
          <div className="flex-1 h-px bg-[rgba(39,39,42,0.5)]" />
        </div>

        {/* Headline + body */}
        <div className="space-y-3 mb-8 max-w-[560px]">
          <h2 className="text-[#F4F4F5] text-3xl md:text-4xl font-bold leading-tight whitespace-pre-line">
            {t.videoHeadline}
          </h2>
          <p className="text-[#71717A] text-base leading-relaxed">{t.videoBody}</p>
        </div>

        {/* ── VIDEO FRAME ── */}
        <div
          className="relative w-full rounded-2xl overflow-hidden border border-[rgba(39,39,42,0.6)] bg-[#0D0D0F] mb-8"
          style={{ aspectRatio: "16/9" }}
        >
          {VIDEO_URL ? (
            /* ── LIVE: real embed ── */
            <iframe
              src={VIDEO_URL}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={t.videoOverlayTitle}
            />
          ) : (
            /* ── PLACEHOLDER ── */
            <>
              {/* Grid texture inside frame */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Vignette */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* Gold corner accents */}
              <div aria-hidden className="absolute top-4 end-4 w-6 h-6 border-t border-e border-[rgba(212,168,83,0.35)]" />
              <div aria-hidden className="absolute top-4 start-4 w-6 h-6 border-t border-s border-[rgba(212,168,83,0.35)]" />
              <div aria-hidden className="absolute bottom-4 end-4 w-6 h-6 border-b border-e border-[rgba(212,168,83,0.35)]" />
              <div aria-hidden className="absolute bottom-4 start-4 w-6 h-6 border-b border-s border-[rgba(212,168,83,0.35)]" />

              {/* Duration badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2">
                <span className="text-[#71717A] text-xs font-mono bg-[rgba(0,0,0,0.6)] border border-[rgba(39,39,42,0.8)] px-3 py-1.5 rounded-full backdrop-blur-sm">
                  {t.videoDuration}
                </span>
              </div>

              {/* Pulsing play button — center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="ring-pulse">
                  <div
                    className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)",
                      boxShadow: "0 0 30px rgba(212,168,83,0.35)",
                    }}
                  >
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 text-[#09090B] translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom overlay — title + sub */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#F4F4F5] font-semibold text-sm md:text-base leading-snug">
                  {t.videoOverlayTitle}
                </p>
                <p className="text-[#71717A] text-xs mt-1">{t.videoOverlaySub}</p>
              </div>
            </>
          )}
        </div>

        {/* ── 3 BULLET POINTS ── */}
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {t.videoPoints.map((item) => (
            <li
              key={item.num}
              className="flex gap-4 p-4 rounded-xl bg-[#111113] border border-[rgba(39,39,42,0.6)]"
            >
              <span className="text-[#D4A853] font-mono font-bold text-lg shrink-0 leading-none mt-0.5">
                {item.num}
              </span>
              <div>
                <p className="text-[#F4F4F5] text-sm font-semibold leading-snug">
                  {item.title}
                </p>
                <p className="text-[#52525B] text-xs mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Video note */}
        <p className="text-[#3F3F46] text-xs leading-relaxed border-t border-[rgba(39,39,42,0.4)] pt-5">
          {t.videoNote}
        </p>

      </div>
    </section>
  );
}
