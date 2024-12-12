import HeroSection from "@/components/HeroSection";
import ReferralForm from "@/components/ReferralForm";

export default function ReferralPage() {
  const heroBackgroundColor = "#DCD4C9";
  const herobuttonColor = "#ECE8E3";
  return (
    <div>
      <HeroSection
        title="Dental Treatment Fee Guide"
        titleTextSize={48}
        titleLineHeight={60}
        descriptionTextSize={18}
        descriptionLineHeight={28}
        description="Explore our fee structure and treatment options."
        backgroundColor={heroBackgroundColor}
        buttonColor={herobuttonColor}
        textColor="white"
      />
      <ReferralForm />
    </div>
  );
}
