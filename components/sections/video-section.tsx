"use client";

import { useLang } from "@/lib/lang-context";

export default function VideoSection() {
  const { t } = useLang();

  return (
    <section
      className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden"
      dir={t.dir}
    >
      <div className="max-w-[1400px] mx-auto">
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

        {/* Asymmetric grid: video large on left, text stack on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Video placeholder — 8 cols */}
          <div className="lg:col-span-8">
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-[rgba(39,39,42,0.6)] bg-[#0D0D0F] group cursor-pointer"
              style={{ aspectRatio: "16/9" }}
            >
              {/* Grid texture inside */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[rgba(212,168,83,0.4)] rounded-tr" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[rgba(212,168,83,0.4)] rounded-tl" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[rgba(212,168,83,0.4)] rounded-br" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[rgba(212,168,83,0.4)] rounded-bl" />

              {/* Duration badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.6)] border border-[rgba(39,39,42,0.8)] text-[#71717A] text-xs font-mono px-3 py-1.5 rounded-full backdrop-blur-sm">
                {t.videoDuration}
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative ring-pulse">
                  <button
                    aria-label={t.videoOverlayTitle}
                    className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#D4A853] text-[#09090B] transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                    style={{ boxShadow: "0 0 30px rgba(212,168,83,0.35)" }}
                  >
                    <svg
                      className="w-7 h-7 md:w-8 md:h-8 translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#F4F4F5] font-semibold text-sm md:text-base">
                  {t.videoOverlayTitle}
                </p>
                <p className="text-[#71717A] text-xs mt-0.5">
                  {t.videoOverlaySub}
                </p>
              </div>
            </div>
          </div>

          {/* Right column — 4 cols */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 lg:pt-2">
            <div className="space-y-4">
              <h2 className="text-[#F4F4F5] text-2xl md:text-3xl font-bold leading-tight whitespace-pre-line">
                {t.videoHeadline}
              </h2>
              <p className="text-[#71717A] text-sm leading-relaxed">
                {t.videoBody}
              </p>
            </div>

            <div className="space-y-3">
              {t.videoPoints.map((item) => (
                <div
                  key={item.num}
                  className="flex gap-4 p-4 rounded-xl bg-[#111113] border border-[rgba(39,39,42,0.6)]"
                >
                  <span className="text-[#D4A853] font-mono font-bold text-lg shrink-0 leading-none mt-0.5">
                    {item.num}
                  </span>
                  <div>
                    <p className="text-[#F4F4F5] text-sm font-medium">
                      {item.title}
                    </p>
                    <p className="text-[#52525B] text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(39,39,42,0.5)] pt-4">
              <p className="text-[#3F3F46] text-xs leading-relaxed">
                {t.videoNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
