"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import BookingCalendar from "@/components/booking/BookingCalendar";
import Toast from "@/components/ui/Toast";
import { professionals, procedures, generateTimeSlots } from "@/lib/data";
import { formatCurrency, formatShortDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { User, Calendar, Clock, MapPin, Lock, ChevronRight, Loader2 } from "lucide-react";

function BookingContent() {
  const searchParams = useSearchParams();
  const initialProc = searchParams.get("procedimento") ?? "harmonizacao-completa";
  const initialProf = searchParams.get("profissional") ?? "dr-edson";

  const proc = procedures.find((p) => p.id === initialProc) ?? procedures[0];
  const profData = professionals.find((p) => p.id === initialProf) ?? professionals[0];

  const [selProf, setSelProf]     = useState(initialProf);
  const [selDate, setSelDate]     = useState<Date | null>(null);
  const [selTime, setSelTime]     = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState("PIX");
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);
  const [toast, setToast]         = useState({ show: false, msg: "", type: "success" as "success" | "error" });
  const [form, setForm]           = useState({ name: "", phone: "", email: "", notes: "" });

  const slots = generateTimeSlots();
  const currentProf = professionals.find((p) => p.id === selProf) ?? profData;

  const showToast = (msg: string, type: "success" | "error" = "success") =>
    setToast({ show: true, msg, type });
  const closeToast = useCallback(() => setToast((t) => ({ ...t, show: false })), []);

  async function handleConfirm() {
    if (!form.name.trim())  { showToast("Informe seu nome!", "error");    return; }
    if (!form.phone.trim()) { showToast("Informe seu WhatsApp!", "error"); return; }
    if (!selDate)           { showToast("Selecione uma data!", "error");   return; }
    if (!selTime)           { showToast("Selecione um horário!", "error"); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name:    form.name,
          client_phone:   form.phone,
          client_email:   form.email,
          service:        proc.name,
          professional:   selProf === "any" ? "Qualquer disponível" : currentProf.name,
          date:           formatShortDate(selDate),
          time:           selTime,
          price:          proc.price,
          payment_method: payMethod,
          notes:          form.notes,
          status:         "pending",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao agendar");
      setDone(true);
      if (data.whatsappUrl) setTimeout(() => window.open(data.whatsappUrl, "_blank"), 1500);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Erro ao confirmar. Tente novamente.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
            <h1 className="text-2xl font-bold text-green-900 mb-2">Agendamento enviado!</h1>
            <p className="text-green-600 mb-2"><strong>{form.name}</strong>, seu pedido foi recebido!</p>
            <p className="text-sm text-green-500 mb-6">O Dr. Edson receberá uma notificação e confirmará em breve. Você também receberá um email de confirmação.</p>
            <div className="card p-4 mb-4 text-left">
              <p className="text-xs font-bold text-green-400 uppercase tracking-wider mb-3">Resumo</p>
              <p className="text-sm text-green-800 mb-1"><strong>Procedimento:</strong> {proc.name}</p>
              <p className="text-sm text-green-800 mb-1"><strong>Data:</strong> {selDate ? formatShortDate(selDate) : ""}</p>
              <p className="text-sm text-green-800 mb-1"><strong>Horário:</strong> {selTime}</p>
              <p className="text-sm font-bold text-gold-dark mt-2">Valor: {formatCurrency(proc.price)}</p>
            </div>
            <p className="text-xs text-green-400">📱 O WhatsApp do Dr. Edson foi aberto para confirmar o horário.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-12">
        <div className="mb-8">
          <p className="section-eyebrow">Agendamento online</p>
          <h1 className="text-2xl md:text-3xl font-bold text-green-900">Escolha sua data e horário</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="flex flex-col gap-6">

            {/* Dados do cliente */}
            <div className="card p-5">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Seus dados</p>
              <h2 className="text-lg font-bold text-green-900 mb-4">Informações de contato</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-green-700 mb-1 block">Nome completo *</label>
                  <input className="input" placeholder="Seu nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-green-700 mb-1 block">WhatsApp *</label>
                  <input className="input" placeholder="(11) 99999-9999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-green-700 mb-1 block">Email (para confirmação)</label>
                  <input className="input" type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-green-700 mb-1 block">Observações</label>
                  <input className="input" placeholder="Alguma dúvida?" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Profissional */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Passo 1</p>
              <h2 className="text-lg font-bold text-green-900 mb-4">Escolha o profissional</h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {professionals.map((p) => (
                  <button key={p.id} onClick={() => setSelProf(p.id)}
                    className={cn("flex-shrink-0 flex flex-col items-center gap-1.5 p-3 w-20 rounded-xl border transition-all",
                      selProf === p.id ? "border-green-600 bg-green-50" : "border-cream-300 bg-white hover:border-green-300")}>
                    <div className="w-12 h-12 rounded-full bg-green-800 border-2 border-gold flex items-center justify-center text-xl">{p.emoji}</div>
                    <span className="text-[10px] font-semibold text-green-700 text-center leading-tight">{p.name.split(" ").slice(0, 2).join(" ")}</span>
                  </button>
                ))}
                <button onClick={() => setSelProf("any")}
                  className={cn("flex-shrink-0 flex flex-col items-center gap-1.5 p-3 w-20 rounded-xl border transition-all",
                    selProf === "any" ? "border-green-600 bg-green-50" : "border-cream-300 bg-white hover:border-green-300")}>
                  <div className="w-12 h-12 rounded-full bg-cream-200 border border-cream-300 flex items-center justify-center text-green-400 text-xs font-semibold">Qual.</div>
                  <span className="text-[10px] font-semibold text-green-500 text-center">Qualquer</span>
                </button>
              </div>
            </div>

            {/* Calendário */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Passo 2</p>
              <h2 className="text-lg font-bold text-green-900 mb-4">Escolha a data</h2>
              <BookingCalendar onSelect={(d) => { setSelDate(d); setSelTime(null); }} selected={selDate} />
            </div>

            {/* Horários */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-gold-dark mb-1">Passo 3</p>
              <h2 className="text-lg font-bold text-green-900 mb-2">Escolha o horário</h2>
              <p className="text-xs text-green-400 mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {selDate ? `Disponível para ${formatShortDate(selDate)}` : "Selecione uma data acima"}
              </p>
              <div className="card p-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
                {selDate ? slots.map(({ time, occupied }) => (
                  <button key={time} disabled={occupied} onClick={() => !occupied && setSelTime(time)}
                    className={cn("time-slot-btn", selTime === time && "selected", occupied && "occupied")}>
                    {time}
                  </button>
                )) : (
                  <p className="col-span-6 text-center text-xs text-green-300 py-6">Selecione uma data no calendário acima.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="card p-5 sticky top-20 h-fit">
            <p className="text-[10px] font-bold tracking-widest uppercase text-green-400 mb-4">Resumo</p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3.5 mb-4">
              <p className="text-sm font-bold text-green-900 mb-0.5">{proc.name}</p>
              <p className="text-xs text-green-500">Duração: {proc.duration}</p>
            </div>
            <ul className="flex flex-col gap-3 mb-4">
              <li className="flex items-center gap-2.5 text-xs text-green-700"><User className="w-4 h-4 text-green-500 flex-shrink-0" />{selProf === "any" ? "Qualquer disponível" : currentProf.name}</li>
              <li className="flex items-center gap-2.5 text-xs text-green-700"><Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />{selDate ? formatShortDate(selDate) : <span className="text-green-300">Nenhuma data</span>}</li>
              <li className="flex items-center gap-2.5 text-xs text-green-700"><Clock className="w-4 h-4 text-green-500 flex-shrink-0" />{selTime ?? <span className="text-green-300">Nenhum horário</span>}</li>
              <li className="flex items-center gap-2.5 text-xs text-green-700"><MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />Tatuapé · São Paulo, SP</li>
            </ul>
            <hr className="border-cream-300 mb-4" />
            <p className="text-[10px] font-bold tracking-wide uppercase text-green-400 mb-2">Pagamento</p>
            <div className="flex gap-2 mb-4">
              {["PIX", "Cartão", "Sinal"].map((opt) => (
                <button key={opt} onClick={() => setPayMethod(opt)}
                  className={cn("flex-1 py-2 rounded-xl border text-xs font-semibold transition-all",
                    payMethod === opt ? "border-green-400 bg-green-50 text-green-800" : "border-cream-300 text-green-400 hover:border-green-300")}>
                  {opt}
                </button>
              ))}
            </div>
            <hr className="border-cream-300 mb-4" />
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs text-green-400">Total</span>
              <span className="text-2xl font-bold text-green-900">{formatCurrency(proc.price)}</span>
            </div>
            <button onClick={handleConfirm} disabled={loading}
              className="w-full py-3.5 bg-green-800 border border-gold text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-green-900 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</> : <>Confirmar agendamento <ChevronRight className="w-4 h-4" /></>}
            </button>
            <p className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-green-400">
              <Lock className="w-3 h-3" />Pagamento seguro · Cancele grátis até 24h antes
            </p>
          </aside>
        </div>
      </main>
      <Toast message={toast.msg} show={toast.show} onClose={closeToast} type={toast.type} />
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
