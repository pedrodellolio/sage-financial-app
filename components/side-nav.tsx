"use client";

import Link from "next/link";
import {
  Banknote,
  LayoutDashboard,
  LucideIcon,
  ReceiptText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import UserNavSection from "./navbar/user-nav-section";
import { Separator } from "./ui/separator";

interface Props {
  isCollapsed: boolean;
}

interface NavLinks {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  to: string;
}

const links: NavLinks[] = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    variant: "ghost",
  },
  {
    title: "Movimentações",
    to: "/transactions",
    icon: Banknote,
    variant: "ghost",
  },
];

export function SideNav({ isCollapsed }: Props) {
  return (
    <div
      data-collapsed={isCollapsed}
      className={`h-full group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2`}
    >
      <div className="mt-2">
        <p className="px-2 mb-1 text-xs font-semibold text-secondary-foreground/60">
          Consultas
        </p>
        <nav className="mx-1 grid group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.to}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.to}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "default" }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start text-secondary-foreground/80 font-medium px-2"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
      {/* <Separator /> */}
      <div className="mt-2">
        <p className="px-2 mb-1 text-xs font-semibold text-secondary-foreground/60">
          Planejamento
        </p>
        <nav className="mx-1 grid group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {(
            [
              {
                title: "Metas",
                to: "/budget",
                icon: ReceiptText,
                variant: "ghost",
              },
            ] as NavLinks[]
          ).map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.to}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.to}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "default" }),
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start text-secondary-foreground/80 font-medium px-2"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    </div>
  );
}
