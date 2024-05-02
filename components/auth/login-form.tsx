"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
// import { FormInput } from "@/components/forms/Input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (formData: z.infer<typeof FormSchema>) => {
    // await signIn(formData.email, formData.password);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            // <FormInput
            //   label="Email"
            //   placeholder="you@example.com"
            //   field={field}
            // />
            <></>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            // <FormInput
            //   label="Password"
            //   placeholder="••••••••"
            //   field={field}
            //   type="password"
            // />
            <></>
          )}
        />

        <Button
          aria-disabled={form.formState.isLoading}
          className="rounded-md px-4 py-2 text-white"
          type="submit"
        >
          {form.formState.isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
