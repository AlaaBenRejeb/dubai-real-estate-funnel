import HeroSection from "@/components/sections/hero";
import VideoSection from "@/components/sections/video-section";
import QuizSection from "@/components/sections/quiz-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="grid-bg min-h-[100dvh]">
      <HeroSection />
      <VideoSection />
      <QuizSection />
      <Footer />
    </main>
  );
}
