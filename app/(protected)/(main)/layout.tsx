import { hasAnyLabel } from "@/app/actions/labels";
import { hasAnyProfile } from "@/app/actions/profile";
import { UserDropdown } from "@/components/navbar/user-dropdown";
import UserNavSection from "@/components/navbar/user-nav-section";
import { SideNav } from "@/components/side-nav";
import { TopNav } from "@/components/top-nav";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ImportTransactionsWrapper } from "@/components/wrappers/import-transactions-wrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasProfile = await hasAnyProfile();
  const hasLabel = await hasAnyLabel();
  if (!hasProfile || !hasLabel) return redirect("/onboarding");

  const collapsed = cookies().get("navCollapsed");
  // const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;
  const defaultCollapsed = false;

  return (
    <div className="flex flex-row w-full h-screen p-2">
      <div
        className={`h-full ${
          defaultCollapsed ? "w-14" : "w-[275px]"
        } flex flex-col gap-2 mt-2 pr-2`}
      >
        <TooltipProvider delayDuration={0}>
          {!defaultCollapsed && <UserNavSection />}
          <SideNav isCollapsed={defaultCollapsed} />
          <Separator />
          <UserDropdown />
        </TooltipProvider>
      </div>
      <div className="flex flex-col w-full h-full border rounded-md dark:bg-foreground/5 bg-background">
        <TopNav isCollapsed={defaultCollapsed} />
        <ImportTransactionsWrapper>
          <main className="flex-grow overflow-auto">{children}</main>
        </ImportTransactionsWrapper>
      </div>
    </div>
  );
}
