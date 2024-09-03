"use client";

import Logo from "@/components/logo";
import { UserDropdown } from "@/components/navbar/user-dropdown";

export default function OnboardingHeader() {
  return (
    <div className="flex flex-row justify-between items-center px-12 py-6">
      <Logo />
      <UserDropdown />
    </div>
  );
}
