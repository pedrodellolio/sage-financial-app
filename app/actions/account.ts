import { signInSchema } from "@/schemas/sign-in-schema";

export async function signIn(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    message: "Please enter a valid email",
  };
}
