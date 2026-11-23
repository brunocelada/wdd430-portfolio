import { Suspense } from "react";
import { auth } from "@/auth";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";

async function DashboardContent() {
  const session = await auth();
    const user = session?.user;
    
    const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
        Portfolio Administration
      </p>

      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Welcome, {user?.name ?? "there"}!
      </h1>

      <p className="mt-3 text-gray-600">
        Manage your projects, update your portfolio, and keep your work up to
        date.
          </p>
          
          <nav aria-label="Quick navigation" className="mt-8">
  <ul className="flex flex-wrap gap-3">
    {navigationLinks.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
          </nav>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
  <SignOutButton />
</div>
    </section>
  );
}

export default function DashboardPage() {
  return (
    <main className="container mx-auto flex-1 px-4 py-12">
      <Suspense fallback={<p>Loading dashboard...</p>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}