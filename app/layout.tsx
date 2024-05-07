import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionWrapper } from "@/components/wrappers/session-wrapper";
import { UserPreferencesWrapper } from "@/components/wrappers/user-preferences-wrapper";

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
      <html lang="pt-br">
        <UserPreferencesWrapper>
          <body className={`dark ${inter.className}`}>{children}</body>
        </UserPreferencesWrapper>
      </html>
    </SessionWrapper>
  );
}
