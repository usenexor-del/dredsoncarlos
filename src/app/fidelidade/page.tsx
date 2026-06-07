import Navbar from "@/components/ui/Navbar";
import { Coins, UserPlus, Crown, Ticket, Star, Gift } from "lucide-react";
import { loyaltyBenefits } from "@/lib/data";

const ICONS: Record<string, React.ElementType> = { Coins, UserPlus, Crown, Ticket, Star, Gift };

export default function FidelidadePage() {
  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12 pb-24 md:pb-12">

        <div className="text-center mb-12">
          <p className="section-eyebrow">Programa exclusivo</p>
          <h1 className="section-title">Dr. Edson VIP</h1>
          <p className="section-sub">
            Cada visita gera benefícios reais para você. Quanto mais cuida, mais ganha.
          </p>
        </div>

        {/* VIP card */}
        <div className="rounded-3xl gradient-green p-7 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-8 border border-gold/20">
          <div className="flex-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">
              Seu saldo de pontos
            </p>
            <p className="text-5xl md:text-6xl font-bold text-gold tracking-tighter mb-1">3.180</p>
            <p className="text-sm text-white/40">= R$ 31,80 em cashback disponível</p>
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-3">Nível atual</p>
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-xl px-3 py-1.5 mb-3">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-sm font-bold text-gold">GOLD</span>
            </div>
            <div className="bg-white/10 rounded-full h-2 mb-2">
              <div className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light" style={{ width: "64%" }} />
            </div>
            <p className="text-xs text-white/35">1.820 pts para nível Diamond</p>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {loyaltyBenefits.map((b) => {
            const Icon = ICONS[b.icon] ?? Gift;
            return (
              <div key={b.title} className="card p-5 hover:border-green-400 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="text-sm font-bold text-green-900 mb-2">{b.title}</h3>
                <p className="text-xs text-green-600 leading-relaxed mb-3">{b.desc}</p>
                <p className="text-base font-bold text-gold-dark">{b.stat}</p>
              </div>
            );
          })}
        </div>

        {/* Tiers table */}
        <div className="card overflow-hidden">
          <div className="bg-cream-200 px-5 py-3.5 border-b border-cream-300">
            <h2 className="text-sm font-bold text-green-900">Níveis do programa</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-200">
                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-5 py-3">Nível</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-5 py-3">Pontos</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-5 py-3">Cashback</th>
                <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-5 py-3">Desconto extra</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name:"Silver",  pts:"0 – 1.000",   cashback:"3%", discount:"—"   },
                { name:"Gold",    pts:"1.001 – 5.000",cashback:"5%", discount:"—",    current:true },
                { name:"Diamond", pts:"5.001+",       cashback:"8%", discount:"15%"   },
              ].map((t) => (
                <tr key={t.name} className={`border-b border-cream-200 last:border-0 ${t.current ? "bg-green-50" : ""}`}>
                  <td className="px-5 py-3.5">
                    <span className={`text-sm font-bold ${t.current ? "text-green-800" : "text-green-600"}`}>
                      {t.name} {t.current && <span className="text-[10px] badge-green ml-1 px-1.5 py-0.5 rounded-full">atual</span>}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-green-700">{t.pts}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gold-dark">{t.cashback}</td>
                  <td className="px-5 py-3.5 text-sm text-green-700">{t.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
