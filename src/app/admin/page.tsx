"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/ui/Navbar";
import Toast from "@/components/ui/Toast";
import {
  LayoutDashboard, Calendar, Sparkles, Users, BarChart3,
  Gift, Settings, Bell, TrendingUp, Download, Plus, Edit,
  RefreshCw, CheckCircle, Clock, XCircle, Loader2
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import type { Booking } from "@/lib/supabase";

const NAV = [
  { id: "dashboard",  label: "Dashboard",    icon: LayoutDashboard },
  { id: "agenda",     label: "Agenda",        icon: Calendar        },
  { id: "services",   label: "Procedimentos", icon: Sparkles        },
  { id: "clients",    label: "Pacientes",     icon: Users           },
  { id: "financeiro", label: "Faturamento",   icon: BarChart3       },
  { id: "fidelidade", label: "Fidelidade",    icon: Gift            },
  { id: "config",     label: "Config.",       icon: Settings        },
  { id: "notif",      label: "Notificações",  icon: Bell            },
];

const STATUS_MAP: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  pending:   { label: "Pendente",   cls: "bg-yellow-50 text-yellow-700",  icon: Clock        },
  confirmed: { label: "Confirmado", cls: "bg-emerald-50 text-emerald-700", icon: CheckCircle  },
  done:      { label: "Concluído",  cls: "bg-indigo-50 text-indigo-700",  icon: CheckCircle  },
  cancelled: { label: "Cancelado",  cls: "bg-red-50 text-red-600",        icon: XCircle      },
};

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_MAP[status] ?? STATUS_MAP.pending;
  return <span className={cn("badge text-[10px]", s.cls)}>{s.label}</span>;
}

const BAR_DATA = [4200,5800,3600,6400,5200,5400,0];
const BAR_DAYS = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];

function MiniBar({ data, days, highlight }: { data:number[]; days:string[]; highlight:number }) {
  const max = Math.max(...data.filter(Boolean));
  return (
    <div className="flex items-end gap-1.5">
      {data.map((v,i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md" style={{ height:`${v>0?Math.round((v/max)*72):3}px`, background: i===highlight?"#1F3828":"#D4E6DA", minHeight:"3px" }} />
          <span className="text-[9px] text-green-400">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [section, setSection]   = useState("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState({ show: false, msg: "" });

  const showToast = (msg: string) => setToast({ show: true, msg });
  const closeToast = useCallback(() => setToast(t => ({ ...t, show: false })), []);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setBookings(data as Booking[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    showToast(`Status atualizado para "${STATUS_MAP[status]?.label}"!`);
    fetchBookings();
  }

  // Metrics from real data
  const today = new Date().toLocaleDateString("pt-BR");
  const todayBookings  = bookings.filter(b => b.date === today);
  const todayRevenue   = todayBookings.reduce((s, b) => s + Number(b.price), 0);
  const pendingCount   = bookings.filter(b => b.status === "pending").length;
  const totalRevenue   = bookings.reduce((s, b) => s + Number(b.price), 0);
  const uniqueClients  = new Set(bookings.map(b => b.client_phone)).size;

  return (
    <>
      <Navbar />
      <div className="flex" style={{ minHeight: "calc(100vh - 56px)" }}>

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 bg-white border-r border-cream-300 py-5 flex-shrink-0">
          <div className="px-3 mb-4">
            <p className="text-[9px] font-bold tracking-widest uppercase text-green-300 px-2 mb-2">Principal</p>
            {NAV.slice(0,5).map(item => (
              <button key={item.id} onClick={() => { setSection(item.id); if(item.id==="agenda"||item.id==="dashboard"||item.id==="clients"||item.id==="financeiro") fetchBookings(); }}
                className={cn("admin-nav-item w-full text-left", section===item.id && "active")}>
                <item.icon className="w-4 h-4" />{item.label}
              </button>
            ))}
          </div>
          <div className="px-3">
            <p className="text-[9px] font-bold tracking-widest uppercase text-green-300 px-2 mb-2">Outros</p>
            {NAV.slice(5).map(item => (
              <button key={item.id} className="admin-nav-item w-full text-left">
                <item.icon className="w-4 h-4" />{item.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-5 md:p-8 bg-cream-100 overflow-auto pb-24 md:pb-8">

          {/* ── DASHBOARD ─────────────────────────────────── */}
          {section === "dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Dashboard</h1>
                  <p className="text-xs text-green-400 mt-0.5">Boa tarde, Dr. Edson 👋</p>
                </div>
                <button onClick={fetchBookings} className="btn-ghost text-xs gap-1.5">
                  <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} /> Atualizar
                </button>
              </div>

              {/* Metrics from real data */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label:"Faturamento hoje",  value: formatCurrency(todayRevenue), note:`${todayBookings.length} agendamentos`, color:"text-green-800" },
                  { label:"Total de pacientes",value: String(uniqueClients),        note:"pacientes únicos",                    color:"text-green-900" },
                  { label:"Pendentes",         value: String(pendingCount),         note:"aguardando confirmação",              color:"text-yellow-700" },
                  { label:"Receita total",     value: formatCurrency(totalRevenue), note:"todos os períodos",                  color:"text-gold-dark"  },
                ].map(m => (
                  <div key={m.label} className="card p-4">
                    <p className="text-[10px] text-green-400 font-semibold mb-2">{m.label}</p>
                    <p className={cn("text-xl font-bold mb-1", m.color)}>{m.value}</p>
                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {m.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div className="card overflow-hidden mb-4">
                <div className="flex items-center justify-between px-4 py-3 bg-cream-200 border-b border-cream-300">
                  <p className="text-xs font-bold text-green-900">Agendamentos recentes</p>
                  <button onClick={() => setSection("agenda")} className="text-[10px] text-green-500 hover:text-green-700">Ver todos →</button>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-green-400" />
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="py-10 text-center text-xs text-green-300">
                    Nenhum agendamento ainda. Compartilhe o link do site!
                  </div>
                ) : (
                  bookings.slice(0,5).map((b, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-cream-200 last:border-0 hover:bg-cream-50">
                      <div className="w-8 h-8 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {b.client_name.slice(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-green-900 truncate">{b.client_name}</p>
                        <p className="text-xs text-green-500 truncate">{b.service} · {b.date} às {b.time}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-green-800">{formatCurrency(Number(b.price))}</p>
                        <StatusBadge status={b.status ?? "pending"} />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="card p-5">
                <p className="text-xs font-bold text-green-700 mb-4">Faturamento semanal (simulado)</p>
                <MiniBar data={BAR_DATA} days={BAR_DAYS} highlight={5} />
              </div>
            </div>
          )}

          {/* ── AGENDA ────────────────────────────────────── */}
          {section === "agenda" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Todos os agendamentos</h1>
                  <p className="text-xs text-green-400 mt-0.5">{bookings.length} agendamentos no total</p>
                </div>
                <button onClick={fetchBookings} className="btn-ghost text-xs gap-1.5">
                  <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} /> Atualizar
                </button>
              </div>

              <div className="card overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin text-green-400" />
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-green-300 text-sm">Nenhum agendamento ainda.</p>
                    <p className="text-green-400 text-xs mt-1">Compartilhe o link do site para receber agendamentos!</p>
                  </div>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="flex items-start gap-3 px-4 py-4 border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {b.client_name.slice(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-bold text-green-900">{b.client_name}</p>
                          <StatusBadge status={b.status ?? "pending"} />
                        </div>
                        <p className="text-xs text-green-600 mb-0.5">{b.service}</p>
                        <p className="text-xs text-green-400">
                          📅 {b.date} às {b.time} · 👨‍⚕️ {b.professional} · 📱 {b.client_phone}
                        </p>
                        {b.notes && <p className="text-xs text-green-500 mt-1 italic">"{b.notes}"</p>}
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p className="text-sm font-bold text-green-800">{formatCurrency(Number(b.price))}</p>
                        <p className="text-[10px] text-green-400">{b.payment_method}</p>
                        {/* Status actions */}
                        {b.status === "pending" && (
                          <div className="flex gap-1">
                            <button onClick={() => updateStatus(b.id!, "confirmed")}
                              className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-all">
                              ✓ Confirmar
                            </button>
                            <button onClick={() => updateStatus(b.id!, "cancelled")}
                              className="text-[10px] px-2 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-all">
                              ✗ Cancelar
                            </button>
                          </div>
                        )}
                        {b.status === "confirmed" && (
                          <button onClick={() => updateStatus(b.id!, "done")}
                            className="text-[10px] px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-all">
                            ✓ Concluído
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ── CLIENTS ───────────────────────────────────── */}
          {section === "clients" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Pacientes</h1>
                  <p className="text-xs text-green-400 mt-0.5">{uniqueClients} pacientes únicos</p>
                </div>
                <button className="btn-primary text-xs gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Exportar
                </button>
              </div>
              <div className="card overflow-hidden">
                {bookings.length === 0 ? (
                  <div className="py-16 text-center text-xs text-green-300">Nenhum paciente ainda.</div>
                ) : (
                  bookings.map((b) => (
                    <div key={b.id} className="flex items-center gap-3 px-4 py-3.5 border-b border-cream-200 last:border-0 hover:bg-cream-50">
                      <div className="w-9 h-9 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {b.client_name.slice(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-green-900">{b.client_name}</p>
                        <p className="text-xs text-green-400">📱 {b.client_phone}{b.client_email ? ` · ✉️ ${b.client_email}` : ""}</p>
                        <p className="text-xs text-green-500">{b.service} · {b.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-800">{formatCurrency(Number(b.price))}</p>
                        <StatusBadge status={b.status ?? "pending"} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ── FINANCEIRO ────────────────────────────────── */}
          {section === "financeiro" && (
            <div>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-green-900">Faturamento</h1>
                <p className="text-xs text-green-400 mt-0.5">Dados reais dos agendamentos</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
                {[
                  { label:"Receita total",     value: formatCurrency(totalRevenue),                                   note:"todos os períodos",       color:"text-green-800" },
                  { label:"Ticket médio",      value: formatCurrency(bookings.length > 0 ? totalRevenue/bookings.length : 0), note:"por agendamento", color:"text-green-900" },
                  { label:"Total agendamentos",value: String(bookings.length),                                         note:"agendamentos",            color:"text-gold-dark" },
                ].map(m => (
                  <div key={m.label} className="card p-4">
                    <p className="text-[10px] text-green-400 font-semibold mb-2">{m.label}</p>
                    <p className={cn("text-2xl font-bold mb-1", m.color)}>{m.value}</p>
                    <p className="text-[10px] text-green-400">{m.note}</p>
                  </div>
                ))}
              </div>
              {/* Bookings table */}
              <div className="card overflow-hidden">
                <div className="px-4 py-3 bg-cream-200 border-b border-cream-300">
                  <p className="text-xs font-bold text-green-900">Detalhamento de receita</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-2.5">Paciente</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-2.5">Procedimento</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-2.5">Data</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-2.5">Valor</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-b border-cream-200 last:border-0 hover:bg-cream-50">
                        <td className="px-4 py-3 text-sm font-semibold text-green-900">{b.client_name}</td>
                        <td className="px-4 py-3 text-xs text-green-600">{b.service}</td>
                        <td className="px-4 py-3 text-xs text-green-500">{b.date} · {b.time}</td>
                        <td className="px-4 py-3 text-sm font-bold text-green-800">{formatCurrency(Number(b.price))}</td>
                        <td className="px-4 py-3"><StatusBadge status={b.status ?? "pending"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SERVICES ──────────────────────────────────── */}
          {section === "services" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Procedimentos</h1>
                  <p className="text-xs text-green-400 mt-0.5">Gerencie preços e disponibilidade</p>
                </div>
                <button onClick={() => showToast("Em breve!")} className="btn-primary text-xs gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Novo
                </button>
              </div>
              <div className="card overflow-hidden">
                {[
                  { name:"Harmonização Facial Completa", sub:"Botox + Preench. + Rino", dur:"90 min", price:1200, active:true  },
                  { name:"Toxina Botulínica",            sub:"Rugas + Sobrancelha",     dur:"45 min", price:600,  active:true  },
                  { name:"Preenchimento Labial",         sub:"Ácido Hialurônico",       dur:"50 min", price:750,  active:true  },
                  { name:"Harmonização Masculina",       sub:"Protocolo exclusivo",     dur:"90 min", price:1100, active:true  },
                  { name:"Rinomodelação",                sub:"Sem cirurgia",            dur:"60 min", price:850,  active:false },
                ].map((s,i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-cream-200 last:border-0 hover:bg-cream-50">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-900">{s.name}</p>
                      <p className="text-xs text-green-400">{s.sub} · {s.dur}</p>
                    </div>
                    <p className="text-sm font-bold text-green-800">{formatCurrency(s.price)}</p>
                    <span className={cn("badge", s.active ? "badge-success" : "badge-warning")}>
                      {s.active ? "Ativo" : "Pausado"}
                    </span>
                    <button onClick={() => showToast("Salvo!")} className="btn-ghost text-xs py-1.5 px-3 gap-1">
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-cream-300 flex overflow-x-auto scrollbar-hide px-2 py-1.5 gap-1">
        {NAV.slice(0,5).map(item => (
          <button key={item.id} onClick={() => setSection(item.id)}
            className={cn("flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              section===item.id ? "bg-green-800 text-white" : "text-green-500 hover:bg-cream-200")}>
            {item.label}
          </button>
        ))}
      </div>

      <Toast message={toast.msg} show={toast.show} onClose={closeToast} />
    </>
  );
}
