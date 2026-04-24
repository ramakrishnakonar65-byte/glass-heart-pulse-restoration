import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import HeroOverlay from "@/components/HeroOverlay";
import MarqueeTicker from "@/components/MarqueeTicker";
import BuiltForSection from "@/components/maverick/BuiltForSection";
import TestimonialsSection from "@/components/maverick/TestimonialsSection";
import IdentitySection from "@/components/home/IdentitySection";
import SixPillarsSection from "@/components/home/SixPillarsSection";
import MaverickSpotlight from "@/components/home/MaverickSpotlight";
import PartnersStrip from "@/components/home/PartnersStrip";
import LegacyBanner from "@/components/home/LegacyBanner";
import ContactCTASection from "@/components/home/ContactCTASection";

export default function Index() {
  useEffect(() => {
    document.title =
      "RCIIF — Where Ideas Find Infrastructure";
    // Fire hero-reveal-done after the staggered hero finishes (~1.4s)
    const t = window.setTimeout(
      () => window.dispatchEvent(new CustomEvent("hero-reveal-done")),
      1500
    );
    return () => window.clearTimeout(t);
  }, []);

  return (
    <PageLayout
      title="RCIIF — Where Ideas Find Infrastructure"
      description="RCIIF is a DPIIT-recognised incubator in Kharghar, Navi Mumbai — nurturing startups from idea to scale. Backed by Rayat Shikshan Sanstha's 100-year legacy."
    >
      {/* 1. Hero — original editorial overlay */}
      <HeroOverlay />
      <MarqueeTicker />

      <div className="bg-white force-light-bg [&_section]:!bg-white">
        {/* 3. Identity */}
        <IdentitySection />

        {/* 4. Six pillars */}
        <SixPillarsSection />

        {/* 5. Maverick spotlight (dark) */}
        <div className="[&_section]:!bg-[#0a0a0a]">
          <MaverickSpotlight />
        </div>

        {/* 6. Built for three personas */}
        <BuiltForSection />

        {/* 7. Partners / associates */}
        <PartnersStrip />

        {/* 8. Voices from the cohort */}
        <TestimonialsSection />

        {/* 9. Legacy banner */}
        <div className="[&_section]:!bg-transparent">
          <LegacyBanner />
        </div>

        {/* 10. Contact CTA (dark) */}
        <div className="[&_section]:!bg-[#0a0a0a]">
          <ContactCTASection />
        </div>
      </div>
    </PageLayout>
  );
}
