import { hasAnyLabel } from "@/app/actions/labels";
import { hasAnyProfile } from "@/app/actions/profile";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasProfile = await hasAnyProfile();
  const hasLabel = await hasAnyLabel();
  if (!hasProfile || !hasLabel) return redirect("/onboarding");
  
  return (
    <div>
      <Header />
      <main className="min-h-screen flex flex-col py-10 px-14">{children}</main>
      <Footer />
    </div>
  );
}
