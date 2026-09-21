import { DigitalDivideSection } from "@/components/digital-divide-section";
import { Footer } from "@/components/footer";
import { GoalSection } from "@/components/goal-section";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowSection } from "@/components/how-section";
import { ProcessSection } from "@/components/process-section";
import { StatsSection } from "@/components/stats-section";

export default function Home() {
  return (
    <main className="bg-dark text-light min-h-screen">
      <Header />
      <div data-theme="dark">
        <HeroSection />
      </div>
      <div data-theme="dark">
        <StatsSection />
      </div>
      <div data-theme="light">
        <GoalSection />
      </div>
      <div data-theme="light">
        <HowSection />
      </div>
      <div data-theme="dark">
        <ProcessSection />
      </div>
      <div data-theme="light">
        <DigitalDivideSection />
      </div>
      <div data-theme="dark">
        <Footer />
      </div>
    </main>
  );
}


// aura 67