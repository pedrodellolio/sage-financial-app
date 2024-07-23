"use client";

import SuccessSvg from "@/components/svg/success";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SuccessStep() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center gap-24">
      <div className="flex flex-col justify-center items-center mt-14 gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-relaxed">Tudo pronto!</h2>
          <p className="text-sm text-muted-foreground">Comece a usar o Sage.</p>
        </div>
        <div className="w-80">
          <SuccessSvg />
        </div>
        <Button
          variant={"default"}
          className="mt-10"
          onClick={() => router.replace("/")}
        >
          Ir para dashboard
        </Button>
      </div>
    </div>
  );
}
