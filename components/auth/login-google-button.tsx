"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginGoogleButton() {
  return (
    <>
      <p>or</p>
      <Button
        onClick={() => signIn("google")}
        className="rounded-md px-4 py-2 text-white"
        type="button"
      >
        Login with Google
      </Button>
    </>
  );
}
