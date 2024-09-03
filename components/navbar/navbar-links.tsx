"use client";

import Link from "next/link";

const links = [
  { title: "Dashboard", to: "/dashboard", icon: "" },
  { title: "Movimentações", to: "/transactions", icon: "" },
  { title: "Planejamento", to: "/budget", icon: "" },
];

export default function NavbarLinks() {
  return (
    <ul className="flex flex-row gap-8">
      {links.map((l, i) => (
        <li
          className="font-medium text-muted-foreground/95 hover:text-foreground"
          key={i}
        >
          <Link href={l.to}>{l.title}</Link>
        </li>
      ))}
    </ul>
  );
}
