import { hasAnyLabel } from "@/app/actions/labels";
import { hasAnyProfile } from "@/app/actions/profile";
import { redirect } from "next/navigation";

export default async function Onboarding() {
  const hasProfile = await hasAnyProfile();
  const hasLabel = await hasAnyLabel();

  if (!hasProfile) return redirect("/onboarding/profile");
  else if (!hasLabel) return redirect("/onboarding/label");
  else return redirect("/");
}
