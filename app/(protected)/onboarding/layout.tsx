import { OnboardingWrapper } from "@/components/wrappers/onboarding-wrapper";
import OnboardingHeader from "./components/header";
import OnboardingSteps from "./components/steps";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingWrapper>
      <OnboardingHeader />
      <div className="flex flex-col items-center gap-14">
        <main>{children}</main>
        <OnboardingSteps />
      </div>
    </OnboardingWrapper>
  );
}
