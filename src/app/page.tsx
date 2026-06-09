import Link from "next/link";
import Image from "next/image";
import { Award, CalendarCheck, CreditCard, ShieldCheck, Star, ArrowRight, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import ProcedureCard from "@/components/landing/ProcedureCard";
import TestimonialCard from "@/components/landing/TestimonialCard";
import { procedures, testimonials, clinicStats, professionals } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO MOBILE-FIRST ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F7F4EE]">

        {/* MOBILE: stack vertical */}
        <div className="flex flex-col md:hidden">
          {/* Foto no topo no mobile */}
          <div className="relative w-full h-72 overflow-hidden">
            <Image
              src="/dr-edson.jpg"
              alt="Dr. Edson Carlos"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Gradiente embaixo da foto para transição suave */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F4EE] to-transparent" />
          </div>

          {/* Texto abaixo da foto no mobile */}
          <div className="px-5 pb-10 pt-2 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 border border-gold/50 rounded-full text-[10px] font-bold text-gold-dark bg-gold/10 tracking-wide uppercase">
              <Award className="w-3 h-3 text-gold" />
              Referência em harmonização no Tatuapé
            </span>
            <h1 className="text-4xl font-bold text-green-900 mb-2 leading-tight">
              Dr. <span className="text-gold">Edson</span> Carlos
            </h1>
            <div className="w-12 h-0.5 bg-gold rounded-full mx-auto mb-3" />
            <p className="text-[10px] font-bold tracking-widest uppercase text-green-500 mb-4">
              Harmonização Facial · Tatuapé — SP
            </p>
            <p className="text-sm text-green-700 leading-relaxed mb-6 max-w-sm mx-auto">
              Resultados naturais e seguros. Agende online em segundos — sem precisar chamar no WhatsApp.
            </p>
            <div className="flex gap-3 justify-center mb-8">
              <Link href="/agendamento" className="inline-flex items-center gap-2 px-5 py-3 bg-gold text-green-900 font-bold text-sm rounded-xl hover:bg-gold-dark hover:text-white transition-all shadow-lg shadow-gold/25">
                <Calendar className="w-4 h-4" /> Agendar
              </Link>
              <a href="#procedimentos" className="inline-flex items-center gap-2 px-4 py-3 border border-green-200 text-green-700 font-semibold text-sm rounded-xl hover:border-green-400 transition-all">
                Ver mais <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* Stats mobile */}
            <div className="grid grid-cols-2 gap-3">
              {clinicStats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-3 border border-cream-300">
                  <p className="text-xl font-bold text-green-900">{s.value}</p>
                  <p className="text-[10px] text-green-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESKTOP: side by side */}
        <div className="hidden md:flex items-center min-h-[92vh]">
          {/* Decorative circles */}
          <div className="absolute right-0 top-0 w-[55vw] h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] right-[-8%] w-[520px] h-[520px] rounded-full border-[40px] border-gold/10" />
            <div className="absolute top-[5%] right-[-2%] w-[440px] h-[440px] rounded-full border-[2px] border-gold/20" />
            <div className="absolute top-[8%] right-[2%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#F0E8D0] to-[#E8DFC8] shadow-2xl overflow-hidden">
              <Image src="/dr-edson.jpg" alt="Dr. Edson Carlos" width={400} height={400} className="w-full h-full object-cover object-top scale-105" priority />
            </div>
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-12 py-20 w-full">
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-7 border border-gold/50 rounded-full text-xs font-bold text-gold-dark bg-gold/10 tracking-wide uppercase">
                <Award className="w-3 h-3 text-gold" /> Referência em harmonização no Tatuapé
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-900 mb-3 leading-[1.02]">
                Dr. <span className="text-gold">Edson</span><br />Carlos
              </h1>
              <div className="w-16 h-1 bg-gold rounded-full mb-5" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-green-500 mb-5">
                Harmonização Facial · Medicina Estética · Tatuapé — SP
              </p>
              <p className="text-base text-green-700 max-w-md leading-relaxed mb-10">
                Resultados naturais e seguros que realçam sua beleza. Agende online em segundos — sem precisar chamar no WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3 mb-14">
                <Link href="/agendamento" className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-green-900 font-bold text-sm rounded-xl hover:bg-gold-dark hover:text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-gold/25">
                  <Calendar className="w-4 h-4" /> Quero agendar
                </Link>
                <a href="#procedimentos" className="inline-flex items-center gap-2 px-6 py-3.5 border border-green-200 text-green-700 font-semibold text-sm rounded-xl hover:border-green-400 hover:bg-green-50 transition-all">
                  Ver procedimentos <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap gap-8">
                {clinicStats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-green-900">{s.value}</p>
                    <p className="text-xs text-green-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature pills desktop */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex gap-3 z-10">
            {[
              { icon: ShieldCheck, label: "Segurança em primeiro lugar", sub: "Protocolos rigorosos e materiais de alta qualidade." },
              { icon: Star,        label: "Resultados naturais",         sub: "Realce sua beleza com equilíbrio e harmonia."        },
              { icon: CalendarCheck,label:"Agendamento online",          sub: "Agende de forma rápida, prática e segura."           },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3 bg-white/90 backdrop-blur border border-cream-300 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-gold-dark" />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-900">{f.label}</p>
                  <p className="text-[10px] text-green-500 max-w-[140px]">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-eyebrow">Nosso diferencial</p>
            <h2 className="section-title">Agende sem complicação</h2>
            <p className="section-sub">Chega de esperar resposta no WhatsApp. Aqui você vê tudo e agenda na hora.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: CalendarCheck, title: "Agendamento imediato",  desc: "Escolha data, horário e profissional em menos de 1 minuto, 24h por dia." },
              { icon: CreditCard,    title: "Preços transparentes",   desc: "Sem surpresas. Veja o valor exato de cada procedimento antes de confirmar." },
              { icon: ShieldCheck,   title: "Confirmação automática", desc: "Receba confirmação instantânea e lembretes para não esquecer." },
              { icon: CreditCard,    title: "Pagamento online",       desc: "PIX, cartão ou sinal para reservar seu horário com total segurança." },
              { icon: Star,          title: "Resultados reais",       desc: "Galeria com fotos de antes e depois de pacientes reais do Dr. Edson." },
              { icon: Award,         title: "Programa fidelidade",    desc: "Acumule pontos e ganhe benefícios exclusivos a cada procedimento." },
            ].map((f) => (
              <div key={f.title} className="card p-5 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="text-sm font-bold text-green-900 mb-2">{f.title}</h3>
                <p className="text-xs text-green-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCEDURES ───────────────────────────────────── */}
      <section id="procedimentos" className="py-16 md:py-20 px-4 bg-cream-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-eyebrow">Procedimentos</p>
            <h2 className="section-title">O que o Dr. Edson realiza</h2>
            <p className="section-sub">Técnicas avançadas com resultados naturais e seguros</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((p) => (
              <ProcedureCard key={p.id} procedure={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSIONALS ────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-eyebrow">Nossa equipe</p>
            <h2 className="section-title">Especialistas certificados</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {professionals.map((p) => (
              <Link key={p.id} href={`/agendamento?profissional=${p.id}`}
                className="card p-5 text-center w-44 hover:border-gold/40 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 rounded-full border-2 border-gold bg-green-800 flex items-center justify-center text-3xl mx-auto mb-3 relative">
                  {p.emoji}
                  {p.available && <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />}
                </div>
                <p className="text-sm font-bold text-green-900 mb-1">{p.name}</p>
                <p className="text-xs text-green-500 mb-2">{p.specialty}</p>
                <p className="text-xs text-gold font-semibold">{"★".repeat(Math.round(p.rating))} {p.rating}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 bg-cream-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="section-eyebrow">Depoimentos</p>
            <h2 className="section-title">O que nossos pacientes dizem</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCATION ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-eyebrow">Localização</p>
          <h2 className="section-title">Estamos no Tatuapé, SP</h2>
          <p className="section-sub mb-8">Atendimento de segunda a sábado, com horários flexíveis.</p>
          <div className="card p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-gold-dark" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-green-900">@dredsoncarlos</p>
              <p className="text-sm text-green-600">Tatuapé, São Paulo — SP</p>
              <p className="text-xs text-green-400 mt-0.5">Seg–Sex: 8h–18h · Sáb: 8h–14h</p>
            </div>
            <Link href="/agendamento" className="btn-primary sm:ml-auto w-full sm:w-auto justify-center">
              Agendar agora
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-green-900 text-white/50 py-8 px-4 text-center text-xs">
        <p className="text-white/70 font-semibold mb-1">Dr. Edson Carlos · Harmonização Facial</p>
        <p>© {new Date().getFullYear()} · Tatuapé, São Paulo · @dredsoncarlos</p>
      </footer>
    </>
  );
}
