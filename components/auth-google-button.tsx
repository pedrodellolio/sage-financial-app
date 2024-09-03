"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function AuthGoogleButton() {
  return (
    <Button
      variant={"default"}
      onClick={() => signIn("google")}
    >
      Entrar com uma conta Google
    </Button>
  );
}
