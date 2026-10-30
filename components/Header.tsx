import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#171717] text-white py-4 shadow-md">
          <div id="header-title" className="max-w-4xl mx-auto px-4 text-2xl font-bold">
              Bruno Celada
          </div>
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <ul className="flex gap-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}