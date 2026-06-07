"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import BookingCalendar from "@/components/booking/BookingCalendar";
import BookingSummary from "@/components/booking/BookingSummary";
import Toast from "@/components/ui/Toast";
import { professionals, procedures, generateTimeSlots } from "@/lib/data";
import { cn } from "@/lib/utils";

function BookingContent() {
  const searchParams = useSearchParams();
  const initialProc = searchParams.get("procedimento") ?? "harmonizacao-completa";
  const initialProf = searchParams.get("profissional")  ?? "dr-edson";

  const proc = procedures.find((p) => p.id === initialProc) ?? procedures[0];

  const [selProf, setSelProf]   = useState(initialProf);
  const [selDate, setSelDate]   = useState<Date | null>(null);
  const [selTime, setSelTime]   = useState<string | null>(null);
  const [toast,   setToast]     = useState({ show: false, msg: "" });

  const slots     = generateTimeSlots();
  const profData  = professionals.find((p) => p.id === selProf) ?? professionals[0];

  const showToast = (msg: string) => setToast({ show: true, msg });
  const closeToast = useCallback(() => setToast((t) => ({ ...t, show: false })), []);

  function handleDateSelect(date: Date) {
    setSelDate(date);
    setSelTime(null);
  }

  function handleConfirm() {
    if (!selDate) { showToast("Selecione uma data primeiro!"); return; }
    if (!selTime) { showToast("Selecione um horário!");        return; }
    showToast("✅ Agendamento confirmado! Em breve você receberá uma confirmação.");
  }

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-12">
        <div className="mb-8">
          <p className="section-eyebrow">Agendamento online</p>
          <h1 className="text-2xl md:text-3xl font-bold text-green-900">Escolha sua data e horário</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* Step 1 – Professional */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Passo 1 de 3</p>
              <h2 className="text-lg font-bold text-green-900 mb-4">Escolha o profissional</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {professionals.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelProf(p.id)}
                    className={cn(
                      "flex-shrink-0 flex flex-col items-center gap-1.5 p-3 w-20 rounded-xl border transition-all",
                      selProf === p.id
                        ? "border-green-600 bg-green-50"
                        : "border-cream-300 bg-white hover:border-green-300"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-800 border-2 border-gold flex items-center justify-center text-xl">
                      {p.emoji}
                    </div>
                    <span className="text-[10px] font-semibold text-green-700 text-center leading-tight">
                      {p.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => setSelProf("any")}
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center gap-1.5 p-3 w-20 rounded-xl border transition-all",
                    selProf === "any"
                      ? "border-green-600 bg-green-50"
                      : "border-cream-300 bg-white hover:border-green-300"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-cream-200 border border-cream-300 flex items-center justify-center text-green-400 text-xs font-semibold">
                    Qual.
                  </div>
                  <span className="text-[10px] font-semibold text-green-500 text-center">Qualquer</span>
                </button>
              </div>
            </div>

            {/* Step 2 – Date */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Passo 2 de 3</p>
              <h2 className="text-lg font-bold text-green-900 mb-4">Escolha a data</h2>
              <BookingCalendar onSelect={handleDateSelect} selected={selDate} />
            </div>

            {/* Step 3 – Time */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Passo 3 de 3</p>
              <h2 className="text-lg font-bold text-green-900 mb-2">Escolha o horário</h2>
              <p className="text-xs text-green-400 mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {selDate
                  ? `Horários disponíveis para ${selDate.toLocaleDateString("pt-BR")}`
                  : "Selecione uma data para ver os horários"}
              </p>
              <div className="card p-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
                {selDate ? (
                  slots.map(({ time, occupied }) => (
                    <button
                      key={time}
                      disabled={occupied}
                      onClick={() => !occupied && setSelTime(time)}
                      className={cn(
                        "time-slot-btn",
                        selTime === time && "selected",
                        occupied && "occupied"
                      )}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="col-span-4 sm:col-span-6 text-center text-xs text-green-300 py-6">
                    Selecione uma data no calendário acima.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT – Summary */}
          <BookingSummary
            service={proc.name}
            duration={proc.duration}
            price={proc.price}
            prof={selProf === "any" ? "Qualquer disponível" : profData.name}
            date={selDate}
            time={selTime}
            onConfirm={handleConfirm}
          />
        </div>
      </main>

      <Toast message={toast.msg} show={toast.show} onClose={closeToast} />
    </>
  );
}

export default function AgendamentoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-100 flex items-center justify-center text-green-400">Carregando...</div>}>
      <BookingContent />
    </Suspense>
  );
}
