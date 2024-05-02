import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionWrapper } from "@/components/session-wrapper";
import { OptionsWrapper } from "@/components/options-wrapper";

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
        <OptionsWrapper>
          <body className={inter.className}>{children}</body>
        </OptionsWrapper>
      </html>
    </SessionWrapper>
  );
}
