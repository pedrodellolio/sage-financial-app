import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { AccountForm } from "../../../../../components/forms/account-form";

export const metadata: Metadata = {
  title: "Preferências: Conta",
  description: "",
};

export default async function Account() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
