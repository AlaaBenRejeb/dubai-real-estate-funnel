"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/lang-context";

export default function HeroSection() {
  const { t, lang, setLang } = useLang();
  const ctaRef = useRef<HTMLButtonElement>(null);

  function scrollToQuiz() {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;
    const onMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--mouse-x", `${x}%`);
      btn.style.setProperty("--mouse-y", `${y}%`);
    };
    btn.addEventListener("mousemove", onMouseMove);
    return () => btn.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] grid-bg flex flex-col overflow-hidden"
      dir={t.dir}
    >
      {/* Radial gradient — warm focal point */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(212,168,83,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-7">
        <span className="text-[#D4A853] font-semibold tracking-tight text-sm md:text-base">
          {t.brandName}
        </span>
        <div className="flex items-center gap-4">
          <span
            className="text-[11px] text-[#52525B] font-mono tracking-widest uppercase hidden sm:block"
            style={{ letterSpacing: "0.15em" }}
          >
            {t.freeAssessment}
          </span>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="text-[11px] text-[#71717A] font-mono tracking-widest uppercase border border-[rgba(39,39,42,0.7)] rounded-md px-2.5 py-1 hover:border-[#D4A853] hover:text-[#D4A853] transition-colors duration-200"
            style={{ letterSpacing: "0.12em" }}
          >
            {t.langToggle}
          </button>
        </div>
      </header>

      {/* Main content — asymmetric grid */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 lg:py-0 items-center">
        {/* Left / primary content — 7 cols */}
        <div className="lg:col-span-7 flex flex-col gap-8 lg:py-24">
          {/* Tag */}
          <div className="animate-fade-up flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.25)] text-[#D4A853] text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A853] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A853]" />
              </span>
              {t.tagBadge}
            </span>
          </div>

          {/* Headline */}
          <div className="animate-fade-up-d1 space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-bold leading-[1.1] tracking-tight text-[#F4F4F5]">
              {t.h1[0]}
              <br />
              {t.h1[1]}
              <br />
              <span className="shimmer-text">{t.h1[2]}</span>
            </h1>
            <p className="text-[#71717A] text-lg md:text-xl leading-relaxed max-w-[520px]">
              {t.subheading}
            </p>
          </div>

          {/* CTA block */}
          <div className="animate-fade-up-d2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              ref={ctaRef}
              onClick={scrollToQuiz}
              className="relative group overflow-hidden rounded-xl px-8 py-4 text-[#09090B] font-bold text-base md:text-lg transition-all duration-200 active:scale-[0.97] gold-glow"
              style={{
                background:
                  "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)",
              }}
            >
              {/* Spotlight highlight on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.2), transparent 70%)",
                }}
              />
              <span className="relative">{t.ctaPrimary}</span>
            </button>
            <p className="text-[#52525B] text-sm">{t.ctaSub}</p>
          </div>

          {/* Trust signal */}
          <div className="animate-fade-up-d3 flex items-center gap-3 border-t border-[rgba(39,39,42,0.5)] pt-6">
            <div className="flex -space-x-2 rtl:space-x-reverse">
              {["A", "M", "K", "S"].map((letter) => (
                <div
                  key={letter}
                  className="w-8 h-8 rounded-full bg-[#18181B] border border-[#27272A] flex items-center justify-center text-xs text-[#A1A1AA] font-medium"
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-[#71717A] text-sm">
              {t.trustPrefix}{" "}
              <span className="text-[#F4F4F5] font-medium">
                {t.trustHighlight}
              </span>{" "}
              {t.trustSuffix}
            </p>
          </div>
        </div>

        {/* Right — stats grid (5 cols) */}
        <div className="lg:col-span-5 lg:pr-0 lg:pl-8 animate-fade-up-d2">
          <div className="grid grid-cols-2 gap-3">
            {t.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#111113] border border-[rgba(39,39,42,0.6)] rounded-2xl p-5 flex flex-col gap-1"
              >
                <span className="text-[#52525B] text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[#F4F4F5] text-3xl font-bold font-mono">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-[#71717A] text-xs">{stat.unit}</span>
                  )}
                </div>
                <span className="text-[#52525B] text-xs">{stat.sub}</span>
              </div>
            ))}
          </div>

          <p className="text-[#3F3F46] text-xs text-center mt-4">
            {t.statsDisclaimer}
          </p>
        </div>
      </div>

      {/* Bottom scroll hint — column divider */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[rgba(212,168,83,0.2)]"
      />
    </section>
  );
}
