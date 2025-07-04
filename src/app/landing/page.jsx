"use client"
import HeroSection from '@/components/custom/Landing/HeroSection';
import RegisterView from '@/components/custom/Landing/RegisterView';
import AboutSection from '@/components/custom/Landing/AboutSection';
import PassesSection from '@/components/custom/Landing/PassesSection';
import WhoShouldAttendSection from '@/components/custom/Landing/WhoShouldAttendSection';
import EventScheduleSection from '@/components/custom/Landing/EventScheduleSection';
import FAQSection from '@/components/custom/Landing/FAQSection';
import Navbar from '@/components/custom/Navigation/Navbar';


export default function LandingPage() {
  return (
    <div className="relative w-full">
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
        <section id="passes-section" className="relative">
          <PassesSection />
        </section>
        <section className="relative">
          <WhoShouldAttendSection />
        </section>
        <section id="event-schedule-section" className="relative">
          <EventScheduleSection />
        </section>
        <section className="relative">
          <FAQSection />
        </section>
      </div>
    </div>
  );
}
