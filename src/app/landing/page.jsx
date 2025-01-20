"use client"
import HeroSection from '@/components/custom/Landing/HeroSection';
import RegisterView from '@/components/custom/Landing/RegisterView';

export default function LandingPage() {
  return (
    <main className="relative min-h-[200vh]">
      <div className="relative h-screen">
        <HeroSection />
      </div>
      <div className="relative min-h-screen">
        <RegisterView />
      </div>
    </main>
  );
}
