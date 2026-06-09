import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import type { Booking } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body: Booking = await req.json();

    // ── 1. Salvar no Supabase ──────────────────────────────
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...body, status: "pending" }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ── 2. Email para o Dr. Edson ──────────────────────────
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.DOCTOR_EMAIL!,
      subject: `📅 Novo agendamento: ${body.client_name} — ${body.service}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#F7F4EE;padding:32px;border-radius:16px">
          <div style="background:#1F3828;padding:20px 24px;border-radius:12px;margin-bottom:24px">
            <h1 style="color:#C9A44A;margin:0;font-size:20px">Dr. Edson Carlos</h1>
            <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px">Novo agendamento recebido</p>
          </div>

          <h2 style="color:#1A2E22;font-size:18px;margin-bottom:20px">📅 Detalhes do Agendamento</h2>

          <table style="width:100%;border-collapse:collapse">
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px;width:140px">👤 Paciente</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.client_name}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">📱 WhatsApp</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.client_phone}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">✉️ Email</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.client_email}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">💉 Procedimento</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.service}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">👨‍⚕️ Profissional</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.professional}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">📆 Data</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.date}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">🕐 Horário</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.time}</td>
            </tr>
            <tr style="border-bottom:1px solid #E2DDD4">
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">💰 Valor</td>
              <td style="padding:12px 0;color:#C9A44A;font-weight:700;font-size:16px">R$ ${body.price.toLocaleString("pt-BR")}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#6B7C74;font-size:13px">💳 Pagamento</td>
              <td style="padding:12px 0;color:#1A2E22;font-weight:600;font-size:14px">${body.payment_method}</td>
            </tr>
          </table>

          ${body.notes ? `<div style="background:#fff;border:1px solid #E2DDD4;border-radius:8px;padding:12px;margin-top:16px"><p style="color:#6B7C74;font-size:12px;margin:0 0 4px">Observações:</p><p style="color:#1A2E22;font-size:13px;margin:0">${body.notes}</p></div>` : ""}

          <div style="margin-top:24px;padding:16px;background:#1F3828;border-radius:12px;text-align:center">
            <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0">Acesse o painel para confirmar ou reagendar</p>
          </div>
        </div>
      `,
    });

    // ── 3. Email de confirmação para o cliente ─────────────
    if (body.client_email) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: body.client_email,
        subject: `✅ Agendamento confirmado — Dr. Edson Carlos`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#F7F4EE;padding:32px;border-radius:16px">
            <div style="background:#1F3828;padding:20px 24px;border-radius:12px;margin-bottom:24px;text-align:center">
              <h1 style="color:#C9A44A;margin:0;font-size:22px">Dr. Edson Carlos</h1>
              <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px">Harmonização Facial · Tatuapé, SP</p>
            </div>

            <h2 style="color:#1A2E22;font-size:18px;text-align:center;margin-bottom:8px">✅ Agendamento recebido!</h2>
            <p style="color:#4A5C52;text-align:center;font-size:14px;margin-bottom:24px">
              Olá, <strong>${body.client_name}</strong>! Seu agendamento foi recebido com sucesso. Em breve entraremos em contato para confirmar.
            </p>

            <div style="background:#fff;border:1px solid #E2DDD4;border-radius:12px;padding:20px;margin-bottom:20px">
              <p style="color:#6B7C74;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px">Resumo do agendamento</p>
              <p style="margin:8px 0;font-size:14px;color:#1A2E22"><strong>Procedimento:</strong> ${body.service}</p>
              <p style="margin:8px 0;font-size:14px;color:#1A2E22"><strong>Profissional:</strong> ${body.professional}</p>
              <p style="margin:8px 0;font-size:14px;color:#1A2E22"><strong>Data:</strong> ${body.date}</p>
              <p style="margin:8px 0;font-size:14px;color:#1A2E22"><strong>Horário:</strong> ${body.time}</p>
              <p style="margin:8px 0;font-size:16px;color:#C9A44A;font-weight:700"><strong>Valor:</strong> R$ ${body.price.toLocaleString("pt-BR")}</p>
            </div>

            <div style="background:#FEF9C3;border:1px solid #FDE68A;border-radius:8px;padding:12px;margin-bottom:20px">
              <p style="color:#92400E;font-size:13px;margin:0">⚠️ Cancelamentos devem ser feitos com pelo menos <strong>24 horas de antecedência</strong>.</p>
            </div>

            <p style="color:#6B7C74;font-size:12px;text-align:center">Dúvidas? Entre em contato pelo Instagram <strong>@dredsoncarlos</strong></p>
          </div>
        `,
      });
    }

    // ── 4. Mensagem WhatsApp (link direto) ─────────────────
    // O link abre o WhatsApp com mensagem pré-preenchida
    const whatsappMsg = encodeURIComponent(
      `📅 *Novo Agendamento — Dr. Edson Carlos*\n\n` +
      `👤 *Paciente:* ${body.client_name}\n` +
      `📱 *WhatsApp:* ${body.client_phone}\n` +
      `💉 *Procedimento:* ${body.service}\n` +
      `📆 *Data:* ${body.date}\n` +
      `🕐 *Horário:* ${body.time}\n` +
      `💰 *Valor:* R$ ${body.price.toLocaleString("pt-BR")}\n` +
      `💳 *Pagamento:* ${body.payment_method}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.DOCTOR_WHATSAPP}&text=${whatsappMsg}`;

    return NextResponse.json({
      success: true,
      booking: data,
      whatsappUrl,
    });

  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// GET — lista todos os agendamentos para o painel admin
export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data });
}
