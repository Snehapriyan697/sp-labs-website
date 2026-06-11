import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <CurrentlyBuilding />
      <WhyWorkWithMe />
      <PortfolioShowcase />
      <Process />
      <FAQ />
      <ContactCTA />
    </>
  );
}
