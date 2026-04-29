"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang-context";

/** Pick the correct language variant for a numbered infographic */
function infographic(n: number, lang: string) {
  return `/images/infographic-${n}-${lang === "ar" ? "ar" : "en"}.png`;
}

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
    <section className="relative grid-bg overflow-hidden" dir={t.dir}>
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,168,83,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── TOP BAR ── */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-7">
        <Image
          src="/logo.png"
          alt={t.brandName}
          width={44}
          height={44}
          className="rounded-lg"
          priority
        />
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

      {/* ── FOLD 1 — HOOK + CTA ── */}
      <div className="relative z-10 max-w-[860px] mx-auto w-full px-6 md:px-12 pt-16 pb-10">
        {/* Tag badge */}
        <div className="animate-fade-up mb-8">
          <span className="inline-flex items-center gap-2 bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.25)] text-[#D4A853] text-xs font-medium px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A853] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A853]" />
            </span>
            {t.tagBadge}
          </span>
        </div>

        {/* H1 — rejection opener */}
        <div className="animate-fade-up-d1 mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-[#F4F4F5]">
            {t.h1[0]}
            <br />
            {t.h1[1]}
            <br />
            <span className="shimmer-text">{t.h1[2]}</span>
          </h1>
        </div>

        {/* Subheading + consequence bullets */}
        <div className="animate-fade-up-d2 mb-10 space-y-4 max-w-[640px]">
          <p className="text-[#A1A1AA] text-lg leading-relaxed">{t.subheading}</p>
          <ul className="space-y-2">
            {t.heroBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-[#71717A] text-base">
                <span className="text-[#D4A853] mt-0.5 shrink-0 font-bold">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#F4F4F5] font-semibold text-base">{t.heroConsequence}</p>
        </div>

        {/* CTA */}
        <div className="animate-fade-up-d3 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
          <button
            ref={ctaRef}
            onClick={scrollToQuiz}
            className="relative group overflow-hidden rounded-xl px-8 py-4 text-[#09090B] font-bold text-base md:text-lg transition-all duration-200 active:scale-[0.97] gold-glow"
            style={{
              background: "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)",
            }}
          >
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

        {/* ── IMAGE 1 — Scales: Ready vs Not Ready ── */}
        <div className="animate-fade-up-d4 mb-10">
          <Image
            src={infographic(1, lang)}
            alt={lang === "ar" ? "أنت تُقيّم قبل أي قرار" : "You are being measured"}
            width={800}
            height={600}
            className="w-full h-auto rounded-2xl"
            priority
          />
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(39,39,42,0.5)]" />
      </div>

      {/* ── PRESSURE BLOCK — 3 wrong beliefs ── */}
      <div className="relative z-10 max-w-[860px] mx-auto w-full px-6 md:px-12 pb-8">
        <div className="bg-[#0C0C0E] border border-[rgba(39,39,42,0.7)] rounded-2xl p-8 md:p-10 space-y-6">
          <p className="text-[#71717A] text-sm font-mono tracking-widest uppercase" style={{ letterSpacing: "0.12em" }}>
            {t.pressureTitle}
          </p>
          <ul className="space-y-3">
            {t.pressureBeliefs.map((belief, i) => (
              <li
                key={i}
                className="text-[#A1A1AA] text-lg md:text-xl leading-snug border-b border-[rgba(39,39,42,0.4)] pb-3 last:border-0 last:pb-0"
              >
                {belief}
              </li>
            ))}
          </ul>
          <p className="text-[#D4A853] text-2xl md:text-3xl font-bold">{t.pressureConclusion}</p>
          <p className="text-[#71717A] text-base leading-relaxed">{t.pressureClose}</p>
        </div>
      </div>

      {/* ── IMAGE 2 — Beliefs vs Truth ── */}
      <div className="relative z-10 max-w-[860px] mx-auto w-full px-6 md:px-12 pb-8">
        <Image
          src={infographic(2, lang)}
          alt={lang === "ar" ? "ما يعتقده الناس مقابل الحقيقة" : "What most people think vs the truth"}
          width={800}
          height={600}
          className="w-full h-auto rounded-2xl"
        />
      </div>

      {/* ── AUTHORITY BLOCK ── */}
      <div className="relative z-10 max-w-[860px] mx-auto w-full px-6 md:px-12 pb-8">
        <div className="space-y-5">
          <p className="text-[#52525B] text-xs font-mono tracking-widest uppercase" style={{ letterSpacing: "0.15em" }}>
            {t.authorityTitle}
          </p>
          <ul className="flex flex-col sm:flex-row gap-4">
            {t.authorityPattern.map((item, i) => (
              <li
                key={i}
                className="flex-1 bg-[#111113] border border-[rgba(39,39,42,0.6)] rounded-xl px-5 py-4 text-[#A1A1AA] text-sm text-center"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[#71717A] text-base leading-relaxed max-w-[640px]">
            {t.authorityConclusion}
          </p>
        </div>
      </div>

      {/* ── EXCLUSION BLOCK ── */}
      <div className="relative z-10 max-w-[860px] mx-auto w-full px-6 md:px-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Not for */}
          <div className="bg-[#0C0C0E] border border-[rgba(239,68,68,0.2)] rounded-2xl p-6 space-y-4">
            <p className="text-[#EF4444] text-xs font-mono tracking-widest uppercase" style={{ letterSpacing: "0.12em" }}>
              {t.exclusionNotForTitle}
            </p>
            <ul className="space-y-2">
              {t.exclusionNotFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#71717A] text-sm">
                  <span className="text-[#EF4444] mt-0.5 shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* For */}
          <div className="bg-[#0C0C0E] border border-[rgba(212,168,83,0.25)] rounded-2xl p-6 space-y-4">
            <p className="text-[#D4A853] text-xs font-mono tracking-widest uppercase" style={{ letterSpacing: "0.12em" }}>
              {t.exclusionForTitle}
            </p>
            <ul className="space-y-2">
              {t.exclusionFor.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#A1A1AA] text-sm">
                  <span className="text-[#D4A853] mt-0.5 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── TRUST LINE ── */}
      <div className="relative z-10 max-w-[860px] mx-auto w-full px-6 md:px-12 pb-20">
        <div className="border-t border-[rgba(39,39,42,0.5)] pt-8">
          <p className="text-[#52525B] text-sm leading-relaxed text-center">{t.trustLine}</p>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[rgba(212,168,83,0.2)]"
      />
    </section>
  );
}
