export type Lang = "ar" | "en";

export interface QuizQuestion {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

const QUESTIONS_AR: QuizQuestion[] = [
  {
    id: 1,
    text: "كم راتبك الشهري؟",
    options: [
      { label: "أقل من 10,000 درهم", score: 0 },
      { label: "10,000 – 12,000 درهم", score: 1 },
      { label: "12,000 – 20,000 درهم", score: 2 },
      { label: "أكثر من 20,000 درهم", score: 2 },
    ],
  },
  {
    id: 2,
    text: "وضع إقامتك في الإمارات؟",
    options: [
      { label: "مقيم، إقامة سارية", score: 2 },
      { label: "مقيم، بدون إقامة حالياً", score: 1 },
      { label: "خارج الإمارات", score: 1 },
    ],
  },
  {
    id: 3,
    text: "كم تقدر تدفع كدفعة أولى الآن؟",
    options: [
      { label: "أقل من 50,000 درهم", score: 0 },
      { label: "50,000 – 100,000 درهم", score: 1 },
      { label: "100,000 – 200,000 درهم", score: 2 },
      { label: "أكثر من 200,000 درهم", score: 2 },
    ],
  },
  {
    id: 4,
    text: "متى تفكر تشتري؟",
    options: [
      { label: "خلال 3 شهور", score: 2 },
      { label: "خلال 6 شهور", score: 1 },
      { label: "خلال سنة", score: 1 },
      { label: "مجرد فضول", score: 0 },
    ],
  },
  {
    id: 5,
    text: "الهدف من الشراء؟",
    options: [
      { label: "للسكن", score: 2 },
      { label: "استثمار / تأجير", score: 2 },
      { label: "ما أدري بعد", score: 1 },
    ],
  },
  {
    id: 6,
    text: "عندك قرض شخصي أو قسط سيارة حالياً؟",
    options: [
      { label: "لا، ما عندي التزامات", score: 2 },
      { label: "نعم، أقل من 30% من راتبي", score: 1 },
      { label: "نعم، أكثر من 30% من راتبي", score: 0 },
    ],
  },
];

const QUESTIONS_EN: QuizQuestion[] = [
  {
    id: 1,
    text: "What is your monthly salary?",
    options: [
      { label: "Less than AED 10,000", score: 0 },
      { label: "AED 10,000 – 12,000", score: 1 },
      { label: "AED 12,000 – 20,000", score: 2 },
      { label: "More than AED 20,000", score: 2 },
    ],
  },
  {
    id: 2,
    text: "What is your residency status in the UAE?",
    options: [
      { label: "Resident with valid visa", score: 2 },
      { label: "Resident without current visa", score: 1 },
      { label: "Outside the UAE", score: 1 },
    ],
  },
  {
    id: 3,
    text: "How much can you put as a down payment right now?",
    options: [
      { label: "Less than AED 50,000", score: 0 },
      { label: "AED 50,000 – 100,000", score: 1 },
      { label: "AED 100,000 – 200,000", score: 2 },
      { label: "More than AED 200,000", score: 2 },
    ],
  },
  {
    id: 4,
    text: "When are you thinking of buying?",
    options: [
      { label: "Within 3 months", score: 2 },
      { label: "Within 6 months", score: 1 },
      { label: "Within a year", score: 1 },
      { label: "Just curious for now", score: 0 },
    ],
  },
  {
    id: 5,
    text: "What is the purpose of your purchase?",
    options: [
      { label: "To live in", score: 2 },
      { label: "Investment / rental income", score: 2 },
      { label: "Not sure yet", score: 1 },
    ],
  },
  {
    id: 6,
    text: "Do you currently have a personal loan or car installments?",
    options: [
      { label: "No existing obligations", score: 2 },
      { label: "Yes, less than 30% of my salary", score: 1 },
      { label: "Yes, more than 30% of my salary", score: 0 },
    ],
  },
];

export const QUESTIONS: Record<Lang, QuizQuestion[]> = {
  ar: QUESTIONS_AR,
  en: QUESTIONS_EN,
};

export type ResultKey = "strong" | "promising" | "notYet";

export function calculateResult(scores: number[]): ResultKey {
  const total = scores.reduce((a, b) => a + b, 0);
  if (total >= 9) return "strong";
  if (total >= 5) return "promising";
  return "notYet";
}

// ── Translation strings ────────────────────────────────────────────────────

export const T = {
  ar: {
    dir: "rtl" as const,
    lang: "ar",
    brandName: "المعيار",
    freeAssessment: "تقييم مجاني",
    langToggle: "EN",

    // Hero
    tagBadge: "سوق دبي العقاري",
    h1: ["أغلب الناس اللي يفكروا", "في شراء عقار في دبي", "ما المفروض يشترون أصلاً"],
    subheading: "مو لأنهم ما يقدرون — لأنهم ما يفهمون كيف يشتغل السوق فعلاً.",
    heroBullets: [
      "يكلمون الوسطاء بدري قبل ما يفهمون وضعهم",
      "يفهمون شروط البنك غلط",
      "يلاحقون صفقات ما كانوا مؤهلين لها أصلاً",
    ],
    heroConsequence: "النتيجة: يضيعون أشهر — أو يتعلقون في عقار غلط.",
    ctaPrimary: "تحقق إذا أنت مؤهل — قبل ما تضيّع وقتك مع الوسطاء",
    ctaSub: "7 أسئلة · 90 ثانية · بدون مكالمات إلا إذا كنت مؤهلاً",
    trustLine: "كل أسبوع نشوف ناس يتأهلون لأكثر مما توقعوا — أو يحتاجون ينتظروا أكثر مما ظنوا. الفرق مو الدخل. الفرق هو الفهم.",

    // Pressure block
    pressureTitle: "معظم الناس يظنون:",
    pressureBeliefs: [
      "«إذا ادّخرت كفاية، تقدر تدخل»",
      "«البنك راح يقولي كم أقدر أتحمّل»",
      "«أي وسيط راح يوجّهني صح»",
    ],
    pressureConclusion: "الثلاثة كلها غلط.",
    pressureClose: "البنوك ما تشتغل لمصلحتك. الوسطاء ما يصفّون لك. والسوق ما ينتظرك.",

    // Authority block
    authorityTitle: "شفنا نفس النمط يتكرر:",
    authorityPattern: ["نفس نطاق الدخل", "نفس الافتراضات الغلط", "نفس النتيجة"],
    authorityConclusion: "ناس إما يتأخرون كثير ويخسرون الفرص — أو يدخلون غلط ويتعلقون في صفقات سيئة. هذا التقييم موجود لوقف هذا.",

    // Exclusion block
    exclusionNotForTitle: "هذا مو لـ:",
    exclusionNotFor: [
      "الناس اللي يتصفحون بدون قصد",
      "من يبحث عن صفقات رخيصة",
      "من مو جاد بالدخول في السوق",
    ],
    exclusionForTitle: "هذا لـ:",
    exclusionFor: [
      "من يكسب 12,000 – 20,000 درهم",
      "ويريد يدخل سوق دبي العقاري بالطريقة الصحيحة",
    ],

    // Video
    sectionLabel01: "01 — كيف يشتغل الموضوع",
    videoDuration: "3:45",
    videoOverlayTitle: "كيف تعرف إذا أنت مؤهل لعقار دبي — قبل ما تكلّم أي وسيط",
    videoOverlaySub: "شرح كامل للفانل، الأرقام، والفخاخ اللي يقع فيها الناس",
    videoHeadline: "الحقيقة اللي الوسطاء\nما يقولونها",
    videoBody: "مو كل وسيط يكذب — لكن مصلحته مو مصلحتك. المقطع هذا يعطيك الصورة الكاملة قبل ما تتحرك.",
    videoPoints: [
      { num: "1", title: "كيف تحسب قدرتك الشرائية", desc: "الراتب، الديون، نسبة DBR" },
      { num: "2", title: "الفرق بين Off-plan وجاهز", desc: "متى كل واحد يناسبك" },
      { num: "3", title: "فخاخ الوسطاء الشائعة", desc: "وكيف تتجنبها قبل ما توقّع" },
    ],
    videoNote: "المقطع قيد الإنتاج. قيّم نفسك الحين — ما تحتاج تنتظر.",

    // Quiz
    sectionLabel02: "02 — التقييم",
    quizIntroTitle: "تقييم وضعك في سوق دبي العقاري",
    quizIntroSub: "مو كل شخص مؤهل للدخول في سوق دبي العقاري الآن. الأسئلة هذي تحدد وين أنت بالضبط — بدون تجميل، بدون وسيط.",
    quizBenefits: [
      "إذا أنت مؤهل فعلاً — أو لا",
      "ما يخفيه عليك الوسطاء",
      "الفخاخ اللي وقع فيها 9 من كل 10",
    ],
    quizStart: "اكتشف إذا أنت مؤهل",
    quizDisclaimer: "بدون تسجيل · بدون إلزام · بدون مكالمات مفاجئة",
    questionLabel: "السؤال",
    next: "التالي",
    back: "رجوع",
    lastQuestion: "السؤال الأخير",
    phoneTitle: "خطوة أخيرة — بياناتك لتلقي نتيجتك",
    phoneSub: "ما رح نتصل. بنرسلك التحليل فقط — خلال دقائق.",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "اكتب اسمك هنا",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+971 50 000 0000",
    phonePrivacy: "بياناتك محمية ولن تُشارك مع أطراف ثالثة",
    phoneSubmit: "اعرف نتيجتي",
    processing: "نحلّل وضعك…",
    processingSub: "ثانية وحدة",
    scoreLabel: "درجة تأهيلك",
    scoreMax: 12,
    whatsappCta: "أرسل نتيجتي على الواتساب",
    followCta: "تابعنا على انستقرام",
    restart: "أعد التقييم من البداية",

    results: {
      strong: {
        badge: "جاهز للخطوة التالية",
        headline: "أنت جاهز للسوق الآن",
        body: "وضعك قوي. دخلك، مدخراتك، وتوقيتك يقولون إنك تقدر تتحرك الحين. كلّم خبير المبيعات مباشرة على الواتساب — رح يرد عليك خلال دقائق.",
      },
      promising: {
        badge: "قريب من الهدف",
        headline: "أنت على الطريق الصح",
        body: "وضعك واعد — لكن في نقاط محددة تحتاج تعالجها قبل ما تتحرك. كلّم خبير المبيعات على الواتساب وراح يشرح لك الخطوات بالضبط.",
      },
      notYet: {
        badge: "تحتاج وقت أكثر",
        headline: "السوق مو جاهز لك… بعد",
        body: "وضعك الحالي ما يناسب السوق — لكن هذا مو نهاية الطريق. تابعنا وراح نعلمك بالضبط ما تحتاج تغيّره قبل ما ترجع.",
      },
    },

    // Footer
    footerLeft: "© 2025 المعيار — تقييم مجاني، بدون إلزام",
    footerRight: "جميع الأرقام تقريبية ولأغراض المعلومات فقط",
  },

  en: {
    dir: "ltr" as const,
    lang: "en",
    brandName: "Al Mi'yar",
    freeAssessment: "Free Assessment",
    langToggle: "AR",

    // Hero
    tagBadge: "Dubai Real Estate Market",
    h1: ["Most people thinking about", "buying property in Dubai", "shouldn't be buying at all"],
    subheading: "Not because they can't afford it — because they don't understand how the market actually works.",
    heroBullets: [
      "They talk to agents before understanding their position",
      "They misread what banks will actually approve",
      "They chase deals they were never qualified for",
    ],
    heroConsequence: "End result: months wasted — or locked into the wrong property.",
    ctaPrimary: "Check if you qualify — before you waste time with agents",
    ctaSub: "7 questions · 90 seconds · No calls unless you qualify",
    trustLine: "Every week we see people qualify for more than they expected — or need to wait longer than they thought. The difference is not income. It's understanding.",

    // Pressure block
    pressureTitle: "Most people think:",
    pressureBeliefs: [
      '"If I save enough, I can enter"',
      '"The bank will tell me what I can afford"',
      '"Any agent will guide me correctly"',
    ],
    pressureConclusion: "All three are wrong.",
    pressureClose: "Banks don't optimize for you. Agents don't filter for you. And the market doesn't wait while you figure it out.",

    // Authority block
    authorityTitle: "We've seen the same pattern repeat:",
    authorityPattern: ["Same income range", "Same wrong assumptions", "Same outcome"],
    authorityConclusion: "People either delay too long and miss opportunities — or enter wrong and get stuck in bad deals. This assessment exists to stop that.",

    // Exclusion block
    exclusionNotForTitle: "This is NOT for:",
    exclusionNotFor: [
      "People browsing without intent",
      'People looking for "cheap deals"',
      "People not serious about entering the market",
    ],
    exclusionForTitle: "This IS for:",
    exclusionFor: [
      "People earning AED 12,000–20,000",
      "Who want to enter Dubai real estate the right way",
    ],

    // Video
    sectionLabel01: "01 — How It Works",
    videoDuration: "3:45",
    videoOverlayTitle:
      "How to Know If You Qualify for Dubai Real Estate — Before Talking to Any Agent",
    videoOverlaySub: "Full breakdown: the numbers, the process, and the traps people fall into",
    videoHeadline: "The Truth Agents\nWon't Tell You",
    videoBody: "Not every agent lies — but their interest is not your interest. This video gives you the full picture before you make a move.",
    videoPoints: [
      { num: "1", title: "How to calculate your buying power", desc: "Salary, debts, DBR ratio" },
      { num: "2", title: "Off-plan vs ready property", desc: "When each one makes sense for you" },
      { num: "3", title: "Common agent traps", desc: "And how to avoid them before signing" },
    ],
    videoNote: "Video in production. Assess yourself now — no need to wait.",

    // Quiz
    sectionLabel02: "02 — Assessment",
    quizIntroTitle: "Assess Your Dubai Real Estate Situation",
    quizIntroSub: "Not everyone qualifies for the Dubai market right now. These questions tell you exactly where you stand — no sugarcoating, no agent spin.",
    quizBenefits: [
      "Whether you actually qualify — or not",
      "What agents don't want you to know",
      "The traps 9 out of 10 people fall into",
    ],
    quizStart: "Find Out If I Qualify",
    quizDisclaimer: "No registration · No obligation · No surprise calls",
    questionLabel: "Question",
    next: "Next",
    back: "Back",
    lastQuestion: "Last Question",
    phoneTitle: "Last step — your details to receive your result",
    phoneSub: "We won't call. We'll send you the analysis only — within minutes.",
    nameLabel: "Full name",
    namePlaceholder: "Enter your name",
    emailLabel: "Email address",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+971 50 000 0000",
    phonePrivacy: "Your data is protected and will not be shared with third parties",
    phoneSubmit: "See My Result",
    processing: "Analyzing your situation…",
    processingSub: "Just a second",
    scoreLabel: "Your readiness score",
    scoreMax: 12,
    whatsappCta: "Send My Result on WhatsApp",
    followCta: "Follow us on Instagram",
    restart: "Retake the Assessment",

    results: {
      strong: {
        badge: "Ready to Move Forward",
        headline: "You're ready for the market now",
        body: "Your situation is strong. Your income, savings, and timing say you can move now. Message the sales expert directly on WhatsApp — they'll respond within minutes.",
      },
      promising: {
        badge: "Almost There",
        headline: "You're on the right track",
        body: "Your situation is promising — but there are a few specific points to address first. Message the expert on WhatsApp and they'll walk you through exactly what to fix.",
      },
      notYet: {
        badge: "Not Quite Yet",
        headline: "The market isn't ready for you… yet",
        body: "Your current situation doesn't fit the market — but this isn't the end of the road. Follow us and we'll teach you exactly what to change before you come back.",
      },
    },

    // Footer
    footerLeft: "© 2025 Al Mi'yar — Free assessment, no obligation",
    footerRight: "All figures are approximate and for informational purposes only",
  },
} as const;

export type Translations = (typeof T)[Lang];

export const RESULT_COLORS: Record<
  ResultKey,
  { color: string; borderColor: string; bgColor: string }
> = {
  strong: {
    color: "#22C55E",
    borderColor: "rgba(34,197,94,0.3)",
    bgColor: "rgba(34,197,94,0.08)",
  },
  promising: {
    color: "#F59E0B",
    borderColor: "rgba(245,158,11,0.3)",
    bgColor: "rgba(245,158,11,0.08)",
  },
  notYet: {
    color: "#6366F1",
    borderColor: "rgba(99,102,241,0.3)",
    bgColor: "rgba(99,102,241,0.08)",
  },
};

export const RESULT_CTA: Record<ResultKey, { isWhatsApp: boolean; instagramHref?: string }> = {
  strong: { isWhatsApp: true },
  promising: { isWhatsApp: true },
  notYet: { isWhatsApp: false, instagramHref: "https://instagram.com" },
};

// Replace with the sales manager's WhatsApp number (international format, no +)
export const WHATSAPP_NUMBER = "971563719109";

export function buildWhatsAppUrl(
  lang: Lang,
  result: ResultKey,
  score: number,
  answers: string[],
  name: string,
  email: string,
  phone: string
): string {
  const qs = QUESTIONS[lang];

  const lines =
    lang === "ar"
      ? [
          "السلام عليكم 👋",
          `👤 الاسم: ${name}`,
          `📧 الإيميل: ${email}`,
          `📱 الواتساب: ${phone}`,
          "",
          `أكملت التقييم العقاري — درجتي ${score} / 12`,
          "",
          "📋 إجاباتي:",
          ...qs.map((q, i) => `• ${q.text}: ${answers[i] ?? "—"}`),
        ]
      : [
          "Hello 👋",
          `👤 Name: ${name}`,
          `📧 Email: ${email}`,
          `📱 WhatsApp: ${phone}`,
          "",
          `I completed the real estate assessment — my score: ${score} / 12`,
          "",
          "📋 My answers:",
          ...qs.map((q, i) => `• ${q.text}: ${answers[i] ?? "—"}`),
        ];

  void result;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
