import "./globals.css";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Suspense
  fallback={
    <header className="bg-[#171717] py-4 text-white shadow-md">
      <div className="mx-auto max-w-4xl px-4 text-2xl font-bold">
        Bruno Celada
      </div>
    </header>
  }
>
  <Header />
</Suspense>
        <SessionProvider>
        {children}</SessionProvider>
        <Suspense
          fallback={
            <footer className="py-4 mt-12 text-center bg-gray-800 text-white">
              Loading...
            </footer>
          }
        >
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
