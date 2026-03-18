import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import FeatureSections from "@/components/FeatureSections";
import StatsSection from "@/components/StatsSection";
import ReferralSection from "@/components/ReferralSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#E8E4E0]">
      <div className="mx-4 md:mx-6 my-4 rounded-[20px] bg-white overflow-hidden shadow-sm">
        <Navbar />
        <Hero />
        <SocialProof />
        <FeatureSections />
        <StatsSection />
        <ReferralSection />
        <WaitlistSection />
        <Footer />
      </div>
    </div>
  );
}
