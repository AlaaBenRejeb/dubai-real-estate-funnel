"use client";

import { useState, useRef, useEffect } from "react";
import {
  QUESTIONS,
  calculateResult,
  RESULT_COLORS,
  RESULT_CTA,
  type ResultKey,
} from "@/lib/translations";
import { useLang } from "@/lib/lang-context";

type Phase = "intro" | "question" | "phone" | "processing" | "result";

export default function QuizSection() {
  const { t, lang } = useLang();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<ResultKey | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const questions = QUESTIONS[lang];
  const totalQuestions = questions.length;
  const progress =
    phase === "intro"
      ? 0
      : phase === "result"
      ? 100
      : ((currentQ + (phase === "phone" ? totalQuestions : 0)) /
          (totalQuestions + 1)) *
        100;

  function startQuiz() {
    setPhase("question");
    setCurrentQ(0);
    setScores([]);
    setSelected(null);
    setAnimKey((k) => k + 1);
  }

  function selectOption(_score: number, idx: number) {
    setSelected(idx);
  }

  function nextQuestion() {
    if (selected === null) return;
    const score = questions[currentQ].options[selected].score;
    const newScores = [...scores, score];
    setScores(newScores);
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
    if (!val) return;
    setPhase("processing");
    setTimeout(() => {
      setResult(calculateResult(scores));
      setPhase("result");
    }, 1800);
  }

  function restart() {
    setPhase("intro");
    setCurrentQ(0);
    setScores([]);
    setSelected(null);
    setPhone("");
    setResult(null);
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

                <div className="space-y-3">
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
                  <p className="text-[#3F3F46] text-xs">{t.phonePrivacy}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setPhase("question");
                      setCurrentQ(totalQuestions - 1);
                      setScores((s) => s.slice(0, -1));
                      setSelected(null);
                      setAnimKey((k) => k + 1);
                    }}
                    className="text-[#52525B] text-sm transition-colors hover:text-[#A1A1AA]"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={submitPhone}
                    disabled={!phone.trim()}
                    className="rounded-xl px-8 py-3 text-[#09090B] font-semibold text-sm transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed gold-glow"
                    style={{
                      background: phone.trim()
                        ? "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)"
                        : "#27272A",
                      color: phone.trim() ? "#09090B" : "#52525B",
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

            {/* ── RESULT ── */}
            {phase === "result" && result && (() => {
              const colors = RESULT_COLORS[result];
              const cta = RESULT_CTA[result];
              const res = t.results[result];
              const totalScore = scores.reduce((a, b) => a + b, 0);

              return (
                <div className="animate-fade-up space-y-7">
                  {/* Result badge — no HOT/WARM/COLD */}
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
                    style={{
                      borderColor: colors.borderColor,
                      backgroundColor: colors.bgColor,
                      color: colors.color,
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.color }}
                    />
                    {res.badge}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[#F4F4F5] text-2xl md:text-3xl font-bold">
                      {res.headline}
                    </h3>
                    <p className="text-[#A1A1AA] text-base leading-relaxed">
                      {res.body}
                    </p>
                  </div>

                  {/* Score bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-[#52525B]">
                      <span>{t.scoreLabel}</span>
                      <span className="font-mono" dir="ltr">
                        {totalScore} / {t.scoreMax}
                      </span>
                    </div>
                    <div className="h-2 bg-[#1C1C1F] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(totalScore / t.scoreMax) * 100}%`,
                          backgroundColor: colors.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full rounded-xl py-4 text-[#09090B] font-bold text-base transition-transform duration-150 active:scale-[0.97]"
                    style={{
                      background:
                        "linear-gradient(135deg, #D4A853 0%, #E8C270 50%, #C49240 100%)",
                      boxShadow: `0 0 30px ${colors.color}22`,
                    }}
                  >
                    {cta.isWhatsApp ? (
                      <>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.555 4.112 1.524 5.84L0 24l6.335-1.654A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.007-1.371l-.36-.214-3.722.973.996-3.622-.235-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                        </svg>
                        {t.whatsappCta}
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        {t.followCta}
                      </>
                    )}
                  </a>

                  <button
                    onClick={restart}
                    className="w-full text-center text-[#52525B] text-sm hover:text-[#A1A1AA] transition-colors py-2"
                  >
                    {t.restart}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
