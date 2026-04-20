import PageLayout from '@/components/PageLayout';
import Hero from '@/components/ui/animated-shader-hero';
import StatsMarquee from '@/components/maverick/StatsMarquee';
import BuiltForSection from '@/components/maverick/BuiltForSection';
import FounderNeedsSection from '@/components/maverick/FounderNeedsSection';
import JourneySection from '@/components/maverick/JourneySection';
import TestimonialsSection from '@/components/maverick/TestimonialsSection';
import ApplyCTASection from '@/components/maverick/ApplyCTASection';

export default function Maverick() {
  return (
    <PageLayout title="Maverick Pont" description="Maverick Pont — RCIIF's flagship accelerator program.">
      {/* Hero stays dark with shader animation — outside the white wrapper */}
      <Hero
        trustBadge={{
          icon: "✦",
          text: "By RCIIF · Rayat Centenary Innovation & Incubation Foundation"
        }}
        headline={{
          line1: "Where Founders",
          line2: "Become Builders"
        }}
        subtitle="Maverick Pont is RCIIF's curated incubation ecosystem — connecting early-stage startups with investors, mentors, and execution partners to accelerate from idea to impact."
        buttons={{
          primary: {
            text: "Apply as Startup",
            onClick: () => window.open("https://docs.google.com/forms/d/e/1FAIpQLScf9cywkF4ygMmKM6u3A42fqhrvv9lKsVgGomo_HV-ssvZ9HQ/viewform?usp=header", "_blank")
          },
          secondary: {
            text: "Become a Partner",
            onClick: () => window.open("https://docs.google.com/forms/d/e/1FAIpQLScYmFHkMTi3ZBYOFgQzy2MkVIHu8mGz5KWMcT5s0l0QAOjuqw/viewform?usp=publish-editor", "_blank")
          }
        }}
      />

      <div className="bg-white force-light-bg [&_section]:!bg-white">
        <StatsMarquee />
        <BuiltForSection />
        <FounderNeedsSection />
        <JourneySection />
        <TestimonialsSection />
        <ApplyCTASection />
      </div>
    </PageLayout>
  );
}
