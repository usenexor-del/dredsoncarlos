import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import type { Booking } from "@/lib/supabase";
import { buildBookingEmailDoctor, buildBookingEmailClient } from "@/lib/emailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body: Booking = await req.json();

    // 1. Salvar no Supabase
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...body, status: "pending" }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Email premium para o Dr. Edson
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.DOCTOR_EMAIL!,
      subject: `📅 Novo agendamento: ${body.client_name} — ${body.service}`,
      html: buildBookingEmailDoctor({
        client_name:    body.client_name,
        client_phone:   body.client_phone,
        client_email:   body.client_email ?? "",
        service:        body.service,
        professional:   body.professional,
        date:           body.date,
        time:           body.time,
        price:          Number(body.price),
        payment_method: body.payment_method ?? "Não informado",
        notes:          body.notes,
      }),
    });

    // 3. Email premium de confirmação para o cliente
    if (body.client_email) {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: body.client_email,
        subject: `✅ Agendamento recebido — Dr. Edson Carlos`,
        html: buildBookingEmailClient({
          client_name:    body.client_name,
          service:        body.service,
          professional:   body.professional,
          date:           body.date,
          time:           body.time,
          price:          Number(body.price),
          payment_method: body.payment_method ?? "Não informado",
        }),
      });
    }

    // 4. Link WhatsApp com mensagem formatada
    const whatsappMsg = encodeURIComponent(
      `📅 *Novo Agendamento — Dr. Edson Carlos*\n\n` +
      `👤 *Paciente:* ${body.client_name}\n` +
      `📱 *WhatsApp:* ${body.client_phone}\n` +
      `💉 *Procedimento:* ${body.service}\n` +
      `📆 *Data:* ${body.date}\n` +
      `🕐 *Horário:* ${body.time}\n` +
      `💰 *Valor:* R$ ${Number(body.price).toLocaleString("pt-BR")}\n` +
      `💳 *Pagamento:* ${body.payment_method}` +
      (body.notes ? `\n📝 *Obs:* ${body.notes}` : "")
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.DOCTOR_WHATSAPP}&text=${whatsappMsg}`;

    return NextResponse.json({ success: true, booking: data, whatsappUrl });

  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookings: data });
}
