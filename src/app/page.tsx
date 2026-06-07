import Link from "next/link";
import { Award, CalendarCheck, CreditCard, ShieldCheck, Star, ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import ProcedureCard from "@/components/landing/ProcedureCard";
import TestimonialCard from "@/components/landing/TestimonialCard";
import { procedures, testimonials, clinicStats, professionals } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden gradient-green">
        <div className="hero-glow absolute inset-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center animate-fade-up">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 mb-6 border border-gold/40 rounded-full text-xs font-bold text-gold bg-gold/10 tracking-wide uppercase">
            <Award className="w-3 h-3" />
            Referência em harmonização no Tatuapé
          </span>

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-2 border-gold mb-6 bg-green-700 flex items-center justify-center text-5xl overflow-hidden">
            👨‍⚕️
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2">
            Dr.{" "}
            <span className="text-gold">Edson Carlos</span>
          </h1>
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white/40 mb-5">
            Harmonização Facial · Medicina Estética · Tatuapé — SP
          </p>
          <p className="text-base md:text-lg text-white/60 max-w-xl leading-relaxed mb-10">
            Resultados naturais e seguros que realçam sua beleza. Agende online
            em segundos — sem precisar chamar no WhatsApp.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            <Link href="/agendamento" className="btn-gold text-sm px-7 py-3.5">
              Quero agendar <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#procedimentos" className="btn-hero-secondary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 text-white/80 text-sm font-semibold hover:bg-white/5 transition-all">
              Ver procedimentos
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 justify-center">
            {clinicStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-gold">{s.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Nosso diferencial</p>
            <h2 className="section-title">Agende sem complicação</h2>
            <p className="section-sub">
              Chega de esperar resposta no WhatsApp. Aqui você vê tudo e agenda na hora.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: CalendarCheck, title: "Agendamento imediato",      desc: "Escolha data, horário e profissional em menos de 1 minuto, 24h por dia." },
              { icon: CreditCard,   title: "Preços transparentes",       desc: "Sem surpresas. Veja o valor exato de cada procedimento antes de confirmar." },
              { icon: ShieldCheck,  title: "Confirmação automática",     desc: "Receba confirmação instantânea e lembretes para não esquecer." },
              { icon: CreditCard,   title: "Pagamento online",           desc: "PIX, cartão ou sinal para reservar seu horário com total segurança." },
              { icon: Star,         title: "Resultados reais",           desc: "Galeria com fotos de antes e depois de pacientes reais do Dr. Edson." },
              { icon: Award,        title: "Programa fidelidade",        desc: "Acumule pontos e ganhe benefícios exclusivos a cada procedimento." },
            ].map((f) => (
              <div key={f.title} className="card p-5 hover:border-green-400 hover:-translate-y-1 transition-all duration-300 hover:shadow-md hover:shadow-green-900/5">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-green-700" />
                </div>
                <h3 className="text-sm font-bold text-green-900 mb-2">{f.title}</h3>
                <p className="text-xs text-green-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCEDURES ───────────────────────────────────── */}
      <section id="procedimentos" className="py-20 px-4 bg-cream-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Procedimentos</p>
            <h2 className="section-title">O que o Dr. Edson realiza</h2>
            <p className="section-sub">
              Técnicas avançadas com resultados naturais e seguros
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.map((p) => (
              <ProcedureCard key={p.id} procedure={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PROFESSIONALS ────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Nossa equipe</p>
            <h2 className="section-title">Especialistas certificados</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {professionals.map((p) => (
              <Link
                key={p.id}
                href={`/agendamento?profissional=${p.id}`}
                className="card p-5 text-center w-48 hover:border-green-400 transition-all hover:-translate-y-1 hover:shadow-md group"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gold bg-green-800 flex items-center justify-center text-3xl mx-auto mb-3 relative">
                  {p.emoji}
                  {p.available && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <p className="text-sm font-bold text-green-900 mb-1">{p.name}</p>
                <p className="text-xs text-green-500 mb-2">{p.specialty}</p>
                <p className="text-xs text-gold font-semibold">
                  {"★".repeat(Math.round(p.rating))} {p.rating}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-20 px-4 bg-cream-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
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

      {/* ── LOCATION CTA ─────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-eyebrow">Localização</p>
          <h2 className="section-title">Estamos no Tatuapé, SP</h2>
          <p className="section-sub mb-8">
            Atendimento de segunda a sábado, com horários flexíveis para caber na sua agenda.
          </p>
          <div className="card p-6 flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-green-700" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-green-900">@dredsoncarlos</p>
              <p className="text-sm text-green-600">Tatuapé, São Paulo — SP</p>
              <p className="text-xs text-green-400 mt-0.5">Seg–Sex: 8h–18h · Sáb: 8h–14h</p>
            </div>
            <Link href="/agendamento" className="btn-primary ml-auto flex-shrink-0">
              Agendar agora
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-green-900 text-white/50 py-8 px-4 text-center text-xs">
        <p className="text-white/70 font-semibold mb-1">Dr. Edson Carlos · Harmonização Facial</p>
        <p>© {new Date().getFullYear()} · Tatuapé, São Paulo · @dredsoncarlos</p>
      </footer>
    </>
  );
}
