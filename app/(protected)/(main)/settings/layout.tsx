import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../../../../components/settings/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Conta",
    href: "/settings/account",
  },
  {
    title: "Perfis",
    href: "/settings/profiles",
  },
  {
    title: "Categorias",
    href: "/settings/labels",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 px-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Preferências</h2>
          <p className="text-muted-foreground">
            Edite informações e preferências da sua conta.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/6">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </>
  );
}
