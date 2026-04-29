import HeroSection from "@/components/sections/hero";
import QuizSection from "@/components/sections/quiz-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="grid-bg min-h-[100dvh]">
      <HeroSection />
      <QuizSection />
      <Footer />
    </main>
  );
}
