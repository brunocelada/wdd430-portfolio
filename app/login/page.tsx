import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
              Portfolio Administration
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your portfolio projects.
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Restricted access · Portfolio owner only
        </p>
      </div>
    </main>
  );
}