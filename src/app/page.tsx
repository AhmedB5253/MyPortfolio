"use client";

import dynamic from "next/dynamic";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { Navigation } from "@/components/system/navigation";

// Dynamic dynamic loading for below-the-fold modules to shrink critical bundle load
const ProjectsSection = dynamic(() => import("@/components/sections/projects-section").then((mod) => mod.ProjectsSection), { ssr: false });
const DesignShowcaseSection = dynamic(() => import("@/components/sections/design-showcase-section").then((mod) => mod.DesignShowcaseSection), { ssr: false });
const JourneySection = dynamic(() => import("@/components/sections/journey-section").then((mod) => mod.JourneySection), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/sections/services-section").then((mod) => mod.ServicesSection), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section").then((mod) => mod.TestimonialsSection), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/contact-section").then((mod) => mod.ContactSection), { ssr: false });
const ProfileCard = dynamic(() => import("@/components/sections/profile-card").then((mod) => mod.ProfileCard), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/footer").then((mod) => mod.Footer), { ssr: false });

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <DesignShowcaseSection />
        <JourneySection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <ProfileCard />
      </main>
      <Footer />
    </>
  );
}

