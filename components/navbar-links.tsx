"use client";

const links = [
  { title: "Dashboard", to: "/dashboard", icon: "" },
  { title: "Movimentações", to: "/transactions", icon: "" },
];

export default function NavbarLinks() {
  return (
    <ul className="flex flex-row gap-8">
      {links.map((l, i) => (
        <li
          className="font-medium text-muted-foreground/95 hover:text-foreground cursor-pointer"
          key={i}
        >
          {l.title}
        </li>
      ))}
    </ul>
  );
}
