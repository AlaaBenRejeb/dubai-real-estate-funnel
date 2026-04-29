"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";

export default function PrivacyPage() {
  const { t, lang, setLang } = useLang();

  return (
    <main className="grid-bg min-h-[100dvh]" dir={t.dir}>
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
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[11px] text-[#71717A] font-mono tracking-widest uppercase hover:text-[#D4A853] transition-colors duration-200"
            style={{ letterSpacing: "0.12em" }}
          >
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="text-[11px] text-[#71717A] font-mono tracking-widest uppercase border border-[rgba(39,39,42,0.7)] rounded-md px-2.5 py-1 hover:border-[#D4A853] hover:text-[#D4A853] transition-colors duration-200"
            style={{ letterSpacing: "0.12em" }}
          >
            {t.langToggle}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 max-w-[720px] mx-auto w-full px-6 md:px-12 pt-14 pb-24 space-y-10">

        {/* Header */}
        <div className="space-y-3 border-b border-[rgba(39,39,42,0.5)] pb-8">
          <h1 className="text-[#F4F4F5] text-3xl md:text-4xl font-bold">
            {t.privacyTitle}
          </h1>
          <p className="text-[#52525B] text-sm font-mono">{t.privacyLastUpdated}</p>
          <p className="text-[#A1A1AA] text-base leading-relaxed">{t.privacyIntro}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {t.privacySections.map((section, i) => (
            <div key={i} className="space-y-3">
              <h2 className="text-[#F4F4F5] text-lg font-semibold flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0"
                  style={{
                    background: "rgba(212,168,83,0.1)",
                    border: "1px solid rgba(212,168,83,0.25)",
                    color: "#D4A853",
                  }}
                >
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <p className="text-[#71717A] text-base leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Back CTA */}
        <div className="border-t border-[rgba(39,39,42,0.4)] pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#52525B] text-sm hover:text-[#A1A1AA] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              {t.dir === "rtl" ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              )}
            </svg>
            {lang === "ar" ? "العودة للرئيسية" : "Back to home"}
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer
        className="relative z-10 border-t border-[rgba(39,39,42,0.4)] py-6 px-6 md:px-12"
        dir={t.dir}
      >
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[#3F3F46] text-xs">{t.footerLeft}</span>
          <span className="text-[#3F3F46] text-xs">{t.footerRight}</span>
        </div>
      </footer>
    </main>
  );
}
