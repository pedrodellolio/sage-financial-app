import { hasAnyLabel } from "@/app/actions/labels";
import { hasAnyProfile } from "@/app/actions/profile";
import UserNavSection from "@/components/navbar/user-nav-section";
import { SideNav } from "@/components/side-nav";
import { TopNav } from "@/components/top-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    // <div className="flex flex-row w-full">
    //   {/* <div
    //     className={`bg-background fixed ${
    //       defaultCollapsed ? "w-14" : "w-64"
    //     } h-full py-4 px-4 flex flex-col gap-2 mt-1`}
    //   >
    //     <TooltipProvider delayDuration={0}>
    //       {!defaultCollapsed && <UserNavSection />}
    //       <SideNav isCollapsed={defaultCollapsed} />
    //     </TooltipProvider>
    //   </div> */}
    //   <div
    //     className={`${
    //       defaultCollapsed ? "ml-2" : "ml-64"
    //     } w-full border rounded-md m-2`}
    //   >
    //     <TopNav isCollapsed={defaultCollapsed} />
    //     <main className="mt-2">{children}</main>
    //   </div>
    // </div>

    <div className="flex flex-row w-full h-screen p-2">
      <div
        className={`h-full ${
          defaultCollapsed ? "w-14" : "w-64"
        } px-2 flex flex-col gap-2 mt-2`}
      >
        <TooltipProvider delayDuration={0}>
          {!defaultCollapsed && <UserNavSection />}
          <SideNav isCollapsed={defaultCollapsed} />
        </TooltipProvider>
      </div>
      <div className="flex flex-col w-full h-full border rounded-md">
        <TopNav isCollapsed={defaultCollapsed} />
        <main className="flex-grow mt-2 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
