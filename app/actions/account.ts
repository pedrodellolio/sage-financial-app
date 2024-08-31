import { AuthRequiredError } from "@/lib/exceptions";
import { isAuthenticated } from "./user";

export async function ensureAuthenticatedUser() {
  const user = await isAuthenticated();
  if (!user) throw new AuthRequiredError();
  return user;
}

// export async function signIn(prevState: any, formData: FormData) {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return {
//     message: "Please enter a valid email",
//   };
// }
