"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { T, RESULT_COLORS, type ResultKey, type Lang } from "@/lib/translations";

interface StoredResult {
  result: ResultKey;
  score: number;
  lang: Lang;
  ctaHref: string;
  isWhatsApp: boolean;
}

export default function ThankYouPage() {
  const [data, setData] = useState<StoredResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("almiyar_result");
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        // malformed — fall through to fallback
      }
    }
    setReady(true);
  }, []);

  // Fallback if no sessionStorage data (direct navigation / stale session)
  if (ready && !data) {
    return (
      <main className="grid-bg min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center gap-6">
        <p className="text-[#71717A] text-base">
          لا توجد نتيجة محفوظة — أعد التقييم للحصول على نتيجتك.
        </p>
        <Link
          href="/#quiz"
          className="rounded-xl px-8 py-3 text-[#09090B] font-bold text-sm gold-glow"
          style={{ background: "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)" }}
        >
          أعد التقييم
        </Link>
      </main>
    );
  }

  if (!ready || !data) {
    return <main className="grid-bg min-h-[100dvh]" />;
  }

  const { result, score, lang, ctaHref, isWhatsApp } = data;
  const t = T[lang];
  const colors = RESULT_COLORS[result];
  const res = t.results[result];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <main className="grid-bg min-h-[100dvh]" dir={dir}>
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,168,83,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-7">
        <Link href="/">
          <Image
            src="/logo.png"
            alt={t.brandName}
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
        </Link>
        <Link
          href="/#quiz"
          className="text-[11px] text-[#71717A] font-mono tracking-widest uppercase border border-[rgba(39,39,42,0.7)] rounded-md px-2.5 py-1 hover:border-[#D4A853] hover:text-[#D4A853] transition-colors duration-200"
          style={{ letterSpacing: "0.12em" }}
        >
          {t.restart}
        </Link>
      </header>

      {/* Result card */}
      <div className="relative z-10 max-w-[640px] mx-auto w-full px-6 md:px-12 pt-14 pb-24">
        <div className="animate-fade-up space-y-8">

          {/* Result badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
            style={{
              borderColor: colors.borderColor,
              backgroundColor: colors.bgColor,
              color: colors.color,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.color }} />
            {res.badge}
          </div>

          {/* Headline + body */}
          <div className="space-y-4">
            <h1 className="text-[#F4F4F5] text-3xl md:text-4xl font-bold leading-tight">
              {res.headline}
            </h1>
            <p className="text-[#A1A1AA] text-base leading-relaxed">{res.body}</p>
          </div>

          {/* Score bar */}
          <div className="space-y-3 bg-[#0F0F11] border border-[rgba(39,39,42,0.6)] rounded-2xl p-6">
            <div className="flex justify-between text-sm">
              <span className="text-[#71717A]">{t.scoreLabel}</span>
              <span className="text-[#F4F4F5] font-mono font-bold" dir="ltr">
                {score} / {t.scoreMax}
              </span>
            </div>
            <div className="h-2.5 bg-[#1C1C1F] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${(score / t.scoreMax) * 100}%`,
                  backgroundColor: colors.color,
                  boxShadow: `0 0 12px ${colors.color}66`,
                }}
              />
            </div>
          </div>

          {/* Primary CTA */}
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-xl py-4 text-[#09090B] font-bold text-base transition-transform duration-150 active:scale-[0.97] gold-glow"
            style={{
              background: "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)",
            }}
          >
            {isWhatsApp ? (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.555 4.112 1.524 5.84L0 24l6.335-1.654A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.007-1.371l-.36-.214-3.722.973.996-3.622-.235-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
                {t.whatsappCta}
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {t.followCta}
              </>
            )}
          </a>

          {/* Retake link */}
          <p className="text-center">
            <Link
              href="/#quiz"
              className="text-[#52525B] text-sm hover:text-[#A1A1AA] transition-colors"
            >
              {t.restart}
            </Link>
          </p>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[rgba(39,39,42,0.4)] py-6 px-6 md:px-12" dir={dir}>
        <div className="max-w-[640px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[#3F3F46] text-xs">{t.footerLeft}</span>
          <Link href="/privacy" className="text-[#3F3F46] text-xs hover:text-[#71717A] transition-colors">
            {t.footerPrivacy}
          </Link>
        </div>
      </footer>
    </main>
  );
}
