"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/",             label: "Início"    },
  { href: "/agendamento",  label: "Agendar"   },
  { href: "/admin",        label: "Painel"    },
  { href: "/fidelidade",   label: "Fidelidade"},
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream-100/90 backdrop-blur-xl border-b border-cream-300">
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-green-800 border border-gold flex items-center justify-center">
              <Leaf className="w-4 h-4 text-gold" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-green-900 tracking-tight">Dr. Edson Carlos</p>
              <p className="text-[9px] font-bold tracking-widest uppercase text-gold-dark">
                Harmonização · Tatuapé
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 bg-cream-200 rounded-xl p-1 border border-cream-300">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  pathname === l.href
                    ? "bg-green-800 text-white"
                    : "text-green-600 hover:text-green-900 hover:bg-cream-100"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/agendamento" className="btn-ghost text-xs px-3 py-2">
              Entrar
            </Link>
            <Link href="/agendamento" className="btn-primary text-xs px-4 py-2">
              Agendar agora
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg border border-cream-300 text-green-700"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-cream-300 bg-cream-100 px-4 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  pathname === l.href
                    ? "bg-green-800 text-white"
                    : "text-green-700 hover:bg-cream-200"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/agendamento"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              Agendar agora
            </Link>
          </div>
        )}
      </header>

      {/* Bottom mobile nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-cream-100/95 backdrop-blur-xl border-t border-cream-300 pb-safe">
        <div className="flex justify-around py-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all",
                pathname === l.href ? "text-green-800" : "text-green-400"
              )}
            >
              <span className="text-xs font-semibold">{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
