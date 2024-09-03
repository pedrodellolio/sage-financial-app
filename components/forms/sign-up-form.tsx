"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signIn } from "@/app/actions/account";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "../ui/label";
import Link from "next/link";
import AuthGoogleButton from "@/components/auth-google-button";

const initialState = {
  message: "",
};

export default function SignUpForm(props: React.ComponentProps<"form">) {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <form
      action={formAction}
      className={cn("grid items-start gap-5", props.className)}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            {/* <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link> */}
          </div>
          <Input id="password" type="password" required />
        </div>
        <SubmitButton />
        <AuthGoogleButton />
      </div>
      <div className="text-center text-sm">
        Ainda não tem uma conta?{" "}
        <Link href="#" className="underline">
          Registrar
        </Link>
      </div>
      <p aria-live="polite" className="sr-only">
        {state?.message}
      </p>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  );
}
