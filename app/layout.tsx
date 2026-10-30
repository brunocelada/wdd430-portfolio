import "./globals.css";
import { Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <Suspense fallback={<footer className="py-4 mt-12 text-center bg-gray-800 text-white">Cargando...</footer>}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
