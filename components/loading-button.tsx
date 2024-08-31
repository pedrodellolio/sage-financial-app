import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface Props {
  isLoading: boolean;
  children: ReactNode;
}

export function LoadingButton({ isLoading, children }: Props) {
  return (
    <Button disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Carregando..." : children}
    </Button>
  );
}
