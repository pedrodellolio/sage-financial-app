import AddLabelOnboardingForm from "@/components/forms/add-label-onboarding-form";

type Props = {};

export default function LabelStep({}: Props) {
  return (
    <div className="flex flex-col items-center gap-24">
      <div className="flex flex-col justify-center items-center mt-14">
        <h2 className="text-3xl font-bold leading-relaxed">
          Selecione algumas categorias
        </h2>
        <p className="text-sm text-muted-foreground">
          Categorias ajudam a identificar movimentações realizadas por você
        </p>
        <div>
          <AddLabelOnboardingForm />
        </div>
      </div>
    </div>
  );
}
