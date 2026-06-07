"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Toast from "@/components/ui/Toast";
import { LayoutDashboard, Calendar, Sparkles, Users, BarChart3, Gift, Settings, Bell, TrendingUp, Download, Plus, Edit } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const NAV = [
  { id: "dashboard",  label: "Dashboard",      icon: LayoutDashboard },
  { id: "agenda",     label: "Agenda",          icon: Calendar        },
  { id: "services",   label: "Procedimentos",   icon: Sparkles        },
  { id: "clients",    label: "Pacientes",       icon: Users           },
  { id: "financeiro", label: "Faturamento",     icon: BarChart3       },
  { id: "fidelidade", label: "Fidelidade",      icon: Gift            },
  { id: "config",     label: "Configurações",   icon: Settings        },
  { id: "notif",      label: "Notificações",    icon: Bell            },
];

const AGENDA = [
  { time:"08:30", name:"Mariana Ferreira", service:"Harmonização Facial · 90 min", prof:"Dr. Edson", status:"done",      init:"MF" },
  { time:"10:30", name:"Rafael Lima",      service:"Harm. Masculina · 90 min",     prof:"Dr. Edson", status:"done",      init:"RL" },
  { time:"13:00", name:"Camila Santos",    service:"Rinomodelação · 60 min",       prof:"Dr. Edson", status:"confirmed", init:"CS" },
  { time:"14:30", name:"João Alves",       service:"Botox · 45 min",              prof:"Dr. Edson", status:"confirmed", init:"JA" },
  { time:"16:00", name:"Amanda Melo",      service:"Preench. Labial · 50 min",    prof:"Dra. Ana",  status:"pending",   init:"AM" },
];

const SERVICES = [
  { name:"Harmonização Facial Completa", sub:"Botox + Preench. + Rino", dur:"90 min", price:1200, active:true  },
  { name:"Toxina Botulínica",            sub:"Rugas + Sobrancelha",     dur:"45 min", price:600,  active:true  },
  { name:"Preenchimento Labial",         sub:"Ácido Hialurônico",       dur:"50 min", price:750,  active:true  },
  { name:"Harmonização Masculina",       sub:"Protocolo exclusivo",     dur:"90 min", price:1100, active:true  },
  { name:"Rinomodelação",                sub:"Sem cirurgia",            dur:"60 min", price:850,  active:false },
];

const CLIENTS = [
  { name:"Mariana Ferreira", last:"07/06 · Harmonização", total:3600, init:"MF" },
  { name:"Rafael Lima",      last:"07/06 · Harm. Masc.",  total:2200, init:"RL" },
  { name:"Camila Santos",    last:"05/06 · Rinomodelação",total:1700, init:"CS" },
  { name:"Bruno Oliveira",   last:"02/06 · Botox",        total:1200, init:"BO" },
];

const BAR_DATA = [4200,5800,3600,6400,5200,5400,0];
const BAR_DAYS = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
const MONTHLY  = [48000,52000,41000,62000,58000,68400,0,0,0,0,0,0];
const MONTHS   = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string,string> = {
    confirmed: "bg-emerald-50 text-emerald-700",
    pending:   "bg-yellow-50  text-yellow-700",
    done:      "bg-indigo-50  text-indigo-700",
  };
  const labels: Record<string,string> = { confirmed:"Confirmado", pending:"Pendente", done:"Concluído" };
  return (
    <span className={cn("badge", map[status])}>
      {labels[status]}
    </span>
  );
}

function MiniBar({ data, days, highlight }: { data:number[]; days:string[]; highlight:number }) {
  const max = Math.max(...data.filter(Boolean));
  return (
    <div className="flex items-end gap-1.5">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: v > 0 ? `${Math.round((v / max) * 72)}px` : "3px",
              background: i === highlight ? "#1F3828" : "#D4E6DA",
              minHeight: "3px",
            }}
          />
          <span className="text-[9px] text-green-400">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [section, setSection] = useState("dashboard");
  const [toast, setToast]     = useState({ show: false, msg: "" });

  const showToast = (msg: string) => setToast({ show: true, msg });
  const closeToast = () => setToast((t) => ({ ...t, show: false }));

  return (
    <>
      <Navbar />
      <div className="flex" style={{ minHeight: "calc(100vh - 56px)" }}>

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-52 bg-white border-r border-cream-300 py-5 flex-shrink-0">
          <div className="px-3 mb-4">
            <p className="text-[9px] font-bold tracking-widest uppercase text-green-300 px-2 mb-2">Principal</p>
            {NAV.slice(0,5).map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "admin-nav-item w-full text-left",
                  section === item.id && "active"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="px-3">
            <p className="text-[9px] font-bold tracking-widest uppercase text-green-300 px-2 mb-2">Configurações</p>
            {NAV.slice(6).map((item) => (
              <button key={item.id} className="admin-nav-item w-full text-left">
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-5 md:p-8 bg-cream-100 overflow-auto pb-24 md:pb-8">

          {/* ── DASHBOARD ─────────────────────────────────── */}
          {section === "dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Dashboard</h1>
                  <p className="text-xs text-green-400 mt-0.5">Domingo, 7 de Junho · Boa tarde, Dr. Edson 👋</p>
                </div>
                <button onClick={() => showToast("Relatório exportado!")} className="btn-primary text-xs gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Exportar
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label:"Faturamento hoje",  value:"R$ 5.400", change:"+22% vs ontem", up:true,  color:"text-green-800" },
                  { label:"Agendamentos",       value:"9",        change:"+2 vs ontem",  up:true,  color:"text-green-900" },
                  { label:"Novos pacientes",    value:"4",        change:"+1 esta semana",up:true, color:"text-green-900" },
                  { label:"Avaliação média",    value:"4.9 ★",   change:"+0.1 este mês", up:true, color:"text-gold-dark"  },
                ].map((m) => (
                  <div key={m.label} className="card p-4">
                    <p className="text-[10px] text-green-400 font-semibold mb-2">{m.label}</p>
                    <p className={cn("text-2xl font-bold mb-1", m.color)}>{m.value}</p>
                    <p className="text-[10px] flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="w-3 h-3" /> {m.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="card p-5">
                  <p className="text-xs font-bold text-green-700 mb-4">Faturamento semanal</p>
                  <MiniBar data={BAR_DATA} days={BAR_DAYS} highlight={5} />
                </div>
                <div className="card p-5">
                  <p className="text-xs font-bold text-green-700 mb-4">Procedimentos mais realizados</p>
                  <div className="flex items-center gap-4">
                    <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0" aria-hidden="true">
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#E2DDD4" strokeWidth="14"/>
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#1F3828" strokeWidth="14" strokeDasharray="75 113" strokeDashoffset="-28" strokeLinecap="round"/>
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#C9A44A" strokeWidth="14" strokeDasharray="38 150" strokeDashoffset="-103" strokeLinecap="round"/>
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#4D8463" strokeWidth="14" strokeDasharray="25 163" strokeDashoffset="-141" strokeLinecap="round"/>
                    </svg>
                    <ul className="flex flex-col gap-1.5">
                      {[["#1F3828","Harmonização 40%"],["#C9A44A","Botox 20%"],["#4D8463","Labial 13%"],["#E2DDD4","Outros 27%"]].map(([c,l])=>(
                        <li key={l} className="flex items-center gap-2 text-xs text-green-600">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{background:c}} />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AGENDA ────────────────────────────────────── */}
          {section === "agenda" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Agenda do dia</h1>
                  <p className="text-xs text-green-400 mt-0.5">Domingo, 7 de Junho de 2026</p>
                </div>
                <button onClick={() => showToast("Horário adicionado!")} className="btn-primary text-xs gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Novo horário
                </button>
              </div>
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-cream-200 border-b border-cream-300">
                  <p className="text-xs font-bold text-green-900">{AGENDA.length} procedimentos hoje</p>
                </div>
                {AGENDA.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors cursor-pointer">
                    <span className="text-xs font-bold text-gold-dark w-10 flex-shrink-0">{item.time}</span>
                    <div className="w-8 h-8 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{item.init}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-green-900 truncate">{item.name}</p>
                      <p className="text-xs text-green-500 truncate">{item.service} · {item.prof}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
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
                <button onClick={() => showToast("Procedimento adicionado!")} className="btn-primary text-xs gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Novo
                </button>
              </div>
              <div className="card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cream-200 border-b border-cream-300">
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-3">Procedimento</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-3">Duração</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-3">Valor</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-green-400 px-4 py-3">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {SERVICES.map((s, i) => (
                      <tr key={i} className="border-b border-cream-200 last:border-0 hover:bg-cream-50 transition-colors">
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-bold text-green-900">{s.name}</p>
                          <p className="text-xs text-green-400">{s.sub}</p>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-green-700">{s.dur}</td>
                        <td className="px-4 py-3.5 text-sm font-bold text-green-800">{formatCurrency(s.price)}</td>
                        <td className="px-4 py-3.5">
                          <span className={cn("badge", s.active ? "badge-success" : "badge-warning")}>
                            {s.active ? "Ativo" : "Em pausa"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <button onClick={() => showToast("Salvo com sucesso!")} className="btn-ghost text-xs py-1.5 px-3 gap-1">
                            <Edit className="w-3 h-3" /> Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CLIENTS ───────────────────────────────────── */}
          {section === "clients" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-green-900">Pacientes</h1>
                  <p className="text-xs text-green-400 mt-0.5">Base com 5.000+ pacientes atendidos</p>
                </div>
                <button className="btn-primary text-xs gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Exportar lista
                </button>
              </div>
              <div className="card overflow-hidden">
                {CLIENTS.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3.5 border-b border-cream-200 last:border-0 hover:bg-cream-50 cursor-pointer">
                    <div className="w-9 h-9 rounded-full bg-green-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{c.init}</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-900">{c.name}</p>
                      <p className="text-xs text-green-400">Última: {c.last}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-800">{formatCurrency(c.total)}</p>
                      <p className="text-[10px] text-green-400">total gasto</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FINANCEIRO ────────────────────────────────── */}
          {section === "financeiro" && (
            <div>
              <div className="mb-6">
                <h1 className="text-xl font-bold text-green-900">Faturamento</h1>
                <p className="text-xs text-green-400 mt-0.5">Junho 2026</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[
                  { label:"Mês atual",    value:"R$ 68.400", note:"+28% vs maio",  color:"text-green-800" },
                  { label:"Meta do mês",  value:"R$ 80.000", note:"85% atingida",  color:"text-green-900" },
                  { label:"Ticket médio", value:"R$ 760",    note:"+R$ 90",        color:"text-green-900" },
                  { label:"Recorrência",  value:"72%",       note:"+7%",           color:"text-gold-dark"  },
                ].map((m) => (
                  <div key={m.label} className="card p-4">
                    <p className="text-[10px] text-green-400 font-semibold mb-2">{m.label}</p>
                    <p className={cn("text-2xl font-bold mb-1", m.color)}>{m.value}</p>
                    <p className="text-[10px] flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="w-3 h-3" /> {m.note}
                    </p>
                  </div>
                ))}
              </div>
              <div className="card p-5">
                <p className="text-xs font-bold text-green-700 mb-4">Faturamento mensal (2026)</p>
                <MiniBar data={MONTHLY} days={MONTHS} highlight={5} />
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile section tabs */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white border-t border-cream-300 flex overflow-x-auto scrollbar-hide px-2 py-1.5 gap-1">
        {NAV.slice(0,5).map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={cn(
              "flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              section === item.id ? "bg-green-800 text-white" : "text-green-500 hover:bg-cream-200"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Toast message={toast.msg} show={toast.show} onClose={closeToast} />
    </>
  );
}
