import LandingContent from "@/components/customComponents/landing/landing-content";
import LandingHero from "@/components/customComponents/landing/landing-hero";
import LandingNavbar from "@/components/customComponents/navbar/landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
