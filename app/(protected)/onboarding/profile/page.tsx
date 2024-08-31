import { getFirstProfile } from "@/app/actions/profile";
import AddProfileOnboardingForm from "@/components/forms/add-profile-onboarding-form";

export default async function ProfileStep() {
  const profile = await getFirstProfile();
  return (
    <div className="flex flex-col items-center gap-24">
      <div className="flex flex-col justify-center items-center mt-14">
        <h2 className="text-3xl font-bold leading-relaxed">
          Crie seu primeiro perfil financeiro
        </h2>
        <p className="text-sm text-muted-foreground">
          Perfis ajudam a acompanhar suas finanças de forma independente.
        </p>
        <div className="w-[28rem] h-[420px]">
          <AddProfileOnboardingForm data={profile} />
        </div>
      </div>
    </div>
  );
}
