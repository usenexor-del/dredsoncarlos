"use client";

import { User, Calendar, Clock, MapPin, Lock, ChevronRight } from "lucide-react";
import { cn, formatShortDate, formatCurrency } from "@/lib/utils";

interface BookingSummaryProps {
  service:  string;
  duration: string;
  price:    number;
  prof:     string;
  date:     Date | null;
  time:     string | null;
  onConfirm: () => void;
}

const paymentOptions = [
  { id: "pix",   label: "PIX"    },
  { id: "card",  label: "Cartão" },
  { id: "sinal", label: "Sinal"  },
];

export default function BookingSummary({
  service, duration, price, prof, date, time, onConfirm,
}: BookingSummaryProps) {
  return (
    <aside className="card p-5 sticky top-20">
      <p className="text-[10px] font-bold tracking-widest uppercase text-green-400 mb-4">
        Resumo do agendamento
      </p>

      {/* Service */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-3.5 mb-4">
        <p className="text-sm font-bold text-green-900 mb-0.5">{service}</p>
        <p className="text-xs text-green-500">Duração: {duration}</p>
      </div>

      {/* Details */}
      <ul className="flex flex-col gap-3 mb-4">
        <li className="flex items-center gap-2.5 text-xs text-green-700">
          <User className="w-4 h-4 text-green-500 flex-shrink-0" />
          {prof}
        </li>
        <li className="flex items-center gap-2.5 text-xs text-green-700">
          <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
          {date ? formatShortDate(date) : <span className="text-green-300">Nenhuma data</span>}
        </li>
        <li className="flex items-center gap-2.5 text-xs text-green-700">
          <Clock className="w-4 h-4 text-green-500 flex-shrink-0" />
          {time ?? <span className="text-green-300">Nenhum horário</span>}
        </li>
        <li className="flex items-center gap-2.5 text-xs text-green-700">
          <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
          Tatuapé · São Paulo, SP
        </li>
      </ul>

      <hr className="border-cream-300 mb-4" />

      {/* Payment */}
      <p className="text-[10px] font-bold tracking-wide uppercase text-green-400 mb-2">
        Pagamento
      </p>
      <div className="flex gap-2 mb-4">
        {paymentOptions.map((opt) => (
          <button
            key={opt.id}
            className={cn(
              "flex-1 py-2 rounded-xl border text-xs font-semibold transition-all",
              opt.id === "pix"
                ? "border-green-400 bg-green-50 text-green-800"
                : "border-cream-300 text-green-400 hover:border-green-300"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <hr className="border-cream-300 mb-4" />

      {/* Total */}
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-xs text-green-400">Total</span>
        <span className="text-2xl font-bold text-green-900">{formatCurrency(price)}</span>
      </div>

      <button
        onClick={onConfirm}
        className="w-full py-3.5 bg-green-800 border border-gold text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-green-900 hover:-translate-y-0.5 active:scale-95"
      >
        Confirmar agendamento <ChevronRight className="w-4 h-4" />
      </button>

      <p className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-green-400">
        <Lock className="w-3 h-3" />
        Pagamento seguro · Cancele grátis até 24h antes
      </p>
    </aside>
  );
}
