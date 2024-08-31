import { getLabelsFromFirstCreatedProfile } from "@/app/actions/labels";
import AddLabelOnboardingForm from "@/components/forms/add-label-onboarding-form";

export default async function LabelStep() {
  const labels = await getLabelsFromFirstCreatedProfile();
  return (
    <div className="flex flex-col items-center gap-24">
      <div className="flex flex-col justify-center items-center mt-14">
        <h2 className="text-3xl font-bold leading-relaxed">
          Selecione algumas categorias
        </h2>
        <p className="text-sm text-muted-foreground">
          Categorias ajudam a identificar movimentações realizadas por você
        </p>
        <div className="w-[28rem] h-[420px]">
          <AddLabelOnboardingForm data={labels} />
        </div>
      </div>
    </div>
  );
}
