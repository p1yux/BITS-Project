"use client"
import HeroSection from '@/components/custom/Landing/HeroSection';
import RegisterView from '@/components/custom/Landing/RegisterView';
import AboutSection from '@/components/custom/Landing/AboutSection';
import FAQSection from '@/components/custom/Landing/FAQSection';
import Navbar from '@/components/custom/Navigation/Navbar';

export default function LandingPage() {
  return (
    <div className="relative w-full">
      <Navbar />
      <div className="relative">
        <section className="relative h-screen">
          <HeroSection />
        </section>
        <section className="relative">
          <RegisterView />
        </section>
        <section id="about-section" className="relative">
          <AboutSection />
        </section>
        <section className="relative">
          <FAQSection />
        </section>
      </div>
    </div>
  );
}
