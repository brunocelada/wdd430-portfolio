"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
    const pathname = usePathname();
    
    return (
        <ul className="flex gap-6">
            {links.map((link) => {
                const isActive =
  link.href === "/"
    ? pathname === "/"
    : pathname === link.href || pathname.startsWith(`${link.href}/`);
            
            return (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`transition-colors hover:text-blue-400 ${
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-white"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
                        {link.label}
                    </Link>
                </li>
            );
        })}
        </ul>
    );
}