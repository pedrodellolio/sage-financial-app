import { OnboardingWrapper } from "@/components/wrappers/onboarding-wrapper";
import OnboardingHeader from "./components/header";
import OnboardingSteps from "./components/steps";
import { redirect } from "next/navigation";
import { hasAnyLabel } from "@/app/actions/labels";
import { hasAnyProfile } from "@/app/actions/profile";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasProfile = await hasAnyProfile();
  const hasLabel = await hasAnyLabel();
  if (hasProfile && hasLabel) return redirect("/");

  return (
    <OnboardingWrapper>
      <OnboardingHeader />
      <div className="flex flex-col items-center">
        <main>{children}</main>
        <OnboardingSteps />
      </div>
    </OnboardingWrapper>
  );
}
