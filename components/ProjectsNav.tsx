"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Overview" },
  { href: "/projects/opensource", label: "Open Source" },
  { href: "/projects/school", label: "School" },
];

export default function ProjectsNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-wrap gap-2 border-b border-gray-200 mb-8">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-5 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}