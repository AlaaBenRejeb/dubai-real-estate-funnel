"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  QUESTIONS,
  calculateResult,
  RESULT_CTA,
  buildWhatsAppUrl,
  type ResultKey,
} from "@/lib/translations";
import { useLang } from "@/lib/lang-context";
import { saveLead } from "@/app/actions";

type Phase = "intro" | "question" | "phone" | "processing";

export default function QuizSection() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const questions = QUESTIONS[lang];
  const totalQuestions = questions.length;
  const progress =
    phase === "intro"
      ? 0
      : ((currentQ + (phase === "phone" ? totalQuestions : 0)) /
          (totalQuestions + 1)) *
        100;

  function startQuiz() {
    setPhase("question");
    setCurrentQ(0);
    setScores([]);
    setAnswers([]);
    setSelected(null);
    setAnimKey((k) => k + 1);
  }

  function selectOption(_score: number, idx: number) {
    setSelected(idx);
  }

  function nextQuestion() {
    if (selected === null) return;
    const opt = questions[currentQ].options[selected];
    setScores((s) => [...s, opt.score]);
    setAnswers((a) => [...a, opt.label]);
    setSelected(null);
    setAnimKey((k) => k + 1);

    if (currentQ < totalQuestions - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setPhase("phone");
    }
  }

  function submitPhone() {
    const val = phone.trim() || phoneInputRef.current?.value?.trim() || "";
    if (!name.trim() || !email.trim() || !val) return;

    const finalScore = scores.reduce((a, b) => a + b, 0);
    const finalResult = calculateResult(scores);
    const cta = RESULT_CTA[finalResult];
    const whatsAppUrl = cta.isWhatsApp
      ? buildWhatsAppUrl(lang, finalResult, finalScore, answers, name.trim(), email.trim(), val)
      : (cta.instagramHref ?? "https://instagram.com");

    // Fire-and-forget — don't block the UX while Supabase writes
    saveLead({
      name: name.trim(),
      email: email.trim(),
      phone: val,
      lang,
      score: finalScore,
      result: finalResult,
      answers,
    });

    setPhase("processing");
    setTimeout(() => {
      // Store result data for the thank-you page
      sessionStorage.setItem(
        "almiyar_result",
        JSON.stringify({ result: finalResult, score: finalScore, lang, ctaHref: whatsAppUrl, isWhatsApp: cta.isWhatsApp })
      );
      router.push("/thank-you");
    }, 1800);
  }

  const hasScrolled = useRef(false);
  useEffect(() => {
    if (phase === "question" && !hasScrolled.current && sectionRef.current) {
      hasScrolled.current = true;
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (phase === "intro") hasScrolled.current = false;
  }, [phase]);

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden"
      dir={t.dir}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,168,83,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span
            className="text-[11px] text-[#52525B] font-mono tracking-widest uppercase"
            style={{ letterSpacing: "0.15em" }}
          >
            {t.sectionLabel02}
          </span>
          <div className="flex-1 h-px bg-[rgba(39,39,42,0.5)]" />
        </div>

        {/* Card */}
        <div className="bg-[#0F0F11] border border-[rgba(39,39,42,0.6)] rounded-3xl overflow-hidden">
          {/* Progress bar */}
          {(phase === "question" || phase === "phone") && (
            <div className="px-8 pt-7 pb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#52525B] text-xs font-mono" dir="ltr">
                  {phase === "phone"
                    ? `${totalQuestions + 1} / ${totalQuestions + 1}`
                    : `${currentQ + 1} / ${totalQuestions}`}
                </span>
                <span className="text-[#52525B] text-xs font-mono" dir="ltr">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1 bg-[#1C1C1F] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%`, background: "#D4A853" }}
                />
              </div>
            </div>
          )}

          <div className="p-8 md:p-10">
            {/* ── INTRO ── */}
            {phase === "intro" && (
              <div className="animate-fade-up text-center space-y-7 py-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(212,168,83,0.1)] border border-[rgba(212,168,83,0.2)] mx-auto">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A853"
                    strokeWidth="1.5"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h2 className="text-[#F4F4F5] text-2xl md:text-3xl font-bold">
                    {t.quizIntroTitle}
                  </h2>
                  <p className="text-[#71717A] text-base leading-relaxed max-w-md mx-auto">
                    {t.quizIntroSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {t.quizBenefits.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-[#111113] border border-[rgba(39,39,42,0.5)] rounded-xl px-4 py-3"
                    >
                      <span className="text-[#D4A853] text-sm font-bold shrink-0">
                        ✓
                      </span>
                      <span className="text-[#A1A1AA] text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startQuiz}
                  className="w-full sm:w-auto mx-auto rounded-xl px-10 py-4 text-[#09090B] font-bold text-base transition-transform duration-150 active:scale-[0.97] gold-glow"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)",
                  }}
                >
                  {t.quizStart}
                </button>

                <p className="text-[#3F3F46] text-xs">{t.quizDisclaimer}</p>
              </div>
            )}

            {/* ── QUESTION ── */}
            {phase === "question" && (
              <div key={animKey} className="slide-in space-y-7">
                <div className="space-y-2">
                  <p className="text-[#52525B] text-xs font-mono">
                    {t.questionLabel} {currentQ + 1}
                  </p>
                  <h3 className="text-[#F4F4F5] text-xl md:text-2xl font-semibold leading-snug">
                    {questions[currentQ].text}
                  </h3>
                </div>

                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectOption(opt.score, idx)}
                      className={`quiz-option w-full flex items-center gap-4${
                        selected === idx ? " selected" : ""
                      }`}
                    >
                      <span
                        className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-150"
                        style={{
                          borderColor:
                            selected === idx
                              ? "#D4A853"
                              : "rgba(63,63,70,0.8)",
                          backgroundColor:
                            selected === idx
                              ? "rgba(212,168,83,0.15)"
                              : "transparent",
                        }}
                      >
                        {selected === idx && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4A853]" />
                        )}
                      </span>
                      <span
                        className="text-sm md:text-base transition-colors duration-150"
                        style={{
                          color: selected === idx ? "#F4F4F5" : "#A1A1AA",
                        }}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      if (currentQ > 0) {
                        setCurrentQ((q) => q - 1);
                        setScores((s) => s.slice(0, -1));
                        setAnswers((a) => a.slice(0, -1));
                        setSelected(null);
                        setAnimKey((k) => k + 1);
                      }
                    }}
                    disabled={currentQ === 0}
                    className="text-[#52525B] text-sm disabled:opacity-30 transition-colors hover:text-[#A1A1AA]"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={selected === null}
                    className="rounded-xl px-8 py-3 text-[#09090B] font-semibold text-sm transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background:
                        selected !== null
                          ? "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)"
                          : "#27272A",
                      color: selected !== null ? "#09090B" : "#52525B",
                    }}
                  >
                    {currentQ === totalQuestions - 1
                      ? t.lastQuestion
                      : t.next}
                  </button>
                </div>
              </div>
            )}

            {/* ── PHONE ── */}
            {phase === "phone" && (
              <div key="phone" className="slide-in space-y-7">
                <div className="space-y-2">
                  <p className="text-[#52525B] text-xs font-mono">
                    {t.lastQuestion}
                  </p>
                  <h3 className="text-[#F4F4F5] text-xl md:text-2xl font-semibold">
                    {t.phoneTitle}
                  </h3>
                  <p className="text-[#71717A] text-sm">{t.phoneSub}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[#A1A1AA] text-xs font-medium">{t.nameLabel}</label>
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 px-4 text-base bg-[#18181B] border border-[rgba(39,39,42,0.8)] text-[#F4F4F5] placeholder:text-[#3F3F46] rounded-xl outline-none transition-colors focus:border-[#D4A853] focus:ring-2 focus:ring-[rgba(212,168,83,0.2)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[#A1A1AA] text-xs font-medium">{t.emailLabel}</label>
                    <input
                      type="email"
                      dir="ltr"
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 px-4 text-base bg-[#18181B] border border-[rgba(39,39,42,0.8)] text-[#F4F4F5] placeholder:text-[#3F3F46] rounded-xl outline-none transition-colors focus:border-[#D4A853] focus:ring-2 focus:ring-[rgba(212,168,83,0.2)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[#A1A1AA] text-xs font-medium">
                      {lang === "ar" ? "رقم الواتساب" : "WhatsApp number"}
                    </label>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      dir="ltr"
                      placeholder={t.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && submitPhone()}
                      className="w-full h-12 px-4 text-base bg-[#18181B] border border-[rgba(39,39,42,0.8)] text-[#F4F4F5] placeholder:text-[#3F3F46] rounded-xl outline-none transition-colors focus:border-[#D4A853] focus:ring-2 focus:ring-[rgba(212,168,83,0.2)]"
                    />
                  </div>
                  <p className="text-[#3F3F46] text-xs">{t.phonePrivacy}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setPhase("question");
                      setCurrentQ(totalQuestions - 1);
                      setScores((s) => s.slice(0, -1));
                      setAnswers((a) => a.slice(0, -1));
                      setSelected(null);
                      setAnimKey((k) => k + 1);
                    }}
                    className="text-[#52525B] text-sm transition-colors hover:text-[#A1A1AA]"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={submitPhone}
                    disabled={!name.trim() || !email.trim() || !phone.trim()}
                    className="rounded-xl px-8 py-3 text-[#09090B] font-semibold text-sm transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed gold-glow"
                    style={{
                      background: (name.trim() && email.trim() && phone.trim())
                        ? "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)"
                        : "#27272A",
                      color: (name.trim() && email.trim() && phone.trim()) ? "#09090B" : "#52525B",
                    }}
                  >
                    {t.phoneSubmit}
                  </button>
                </div>
              </div>
            )}

            {/* ── PROCESSING ── */}
            {phase === "processing" && (
              <div className="animate-fade-up py-12 flex flex-col items-center gap-6">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#18181B"
                      strokeWidth="3"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="#D4A853"
                      strokeWidth="3"
                      strokeDasharray="175.9"
                      strokeDashoffset="175.9"
                      style={{ animation: "dash 1.6s ease forwards" }}
                    />
                  </svg>
                  <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-[#F4F4F5] font-semibold">{t.processing}</p>
                  <p className="text-[#52525B] text-sm">{t.processingSub}</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
