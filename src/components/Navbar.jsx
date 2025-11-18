import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="relative z-20 w-full">
      <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-orange-500 shadow-[0_0_45px_rgba(239,68,68,0.35)]" />
          <span className="text-white/90 text-lg font-semibold tracking-tight">Nebula Labs</span>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition hover:bg-white/10">
          <Menu size={18} />
          Menu
        </button>
      </nav>
    </header>
  );
}
