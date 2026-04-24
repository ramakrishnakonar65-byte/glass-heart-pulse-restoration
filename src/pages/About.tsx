import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RCIIFAboutIntro from '@/components/about/RCIIFAboutIntro';
import MeetOurTeam from "@/components/about/MeetOurTeam";
import { RCIIFWhyUs } from "@/components/ui/rciif-why-us";
import { RCIIFStoryTimeline } from "@/components/ui/rciif-story-timeline";
import { RCIIFIncubatees } from "@/components/ui/rciif-incubatees";
import { RCIIFAssociates } from "@/components/ui/rciif-associates";
import { RCIIFBoard } from "@/components/ui/rciif-board";

export default function About() {
  return (
    <div className="min-h-screen bg-white force-light-bg [&_section]:!bg-white">
      <Navbar />
      <RCIIFAboutIntro />
      <RCIIFWhyUs />
      <MeetOurTeam />
      <RCIIFStoryTimeline />

      {/* Portfolio with breathing room */}
      <div className="py-12">
        <RCIIFIncubatees />
      </div>

      <RCIIFAssociates />
      <RCIIFBoard />
      <Footer />
    </div>
  );
}
