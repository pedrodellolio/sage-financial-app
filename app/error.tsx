"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-2">
      <h1 className="text-2xl">Ops! Algo deu errado.</h1>
      <Button
        variant={"outline"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Voltar
      </Button>
    </div>
  );
}
