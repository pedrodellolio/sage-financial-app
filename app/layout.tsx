import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionWrapper } from "@/components/wrappers/session-wrapper";
import { BudgetWrapper } from "@/components/wrappers/budget-wrapper";
import { UserWrapper } from "@/components/wrappers/user-wrapper";
import { DashboardWrapper } from "@/components/wrappers/dashboard-wrapper";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sage",
  description: "Sage Financial App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <UserWrapper>
        <DashboardWrapper>
          <BudgetWrapper>
            <html lang="pt-br">
              <body className={`${inter.className}`}>
                {children}
                <Toaster richColors />
              </body>
            </html>
          </BudgetWrapper>
        </DashboardWrapper>
      </UserWrapper>
    </SessionWrapper>
  );
}
