export function buildBookingEmailDoctor(data: {
  client_name: string;
  client_phone: string;
  client_email: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  price: number;
  payment_method: string;
  notes?: string;
}): string {
  const priceFormatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(data.price);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Novo Agendamento — Dr. Edson Carlos</title>
</head>
<body style="margin:0;padding:0;background:#F0EDE6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EDE6;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(160deg,#1A2E22 0%,#2A4A35 60%,#1F3828 100%);border-radius:20px 20px 0 0;padding:40px 40px 32px;text-align:center;">
    <div style="width:56px;height:56px;background:rgba(201,164,74,0.15);border:2px solid rgba(201,164,74,0.4);border-radius:14px;margin:0 auto 16px;display:inline-flex;align-items:center;justify-content:center;font-size:24px;">🌿</div>
    <h1 style="margin:0 0 4px;color:#C9A44A;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Dr. Edson Carlos</h1>
    <p style="margin:0 0 12px;color:rgba(255,255,255,0.5);font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Harmonização Facial · Medicina Estética</p>
    <div style="width:48px;height:2px;background:linear-gradient(90deg,transparent,#C9A44A,transparent);margin:0 auto 16px;"></div>
    <p style="margin:0;color:rgba(255,255,255,0.45);font-size:13px;font-style:italic;">"Realçando sua melhor versão com naturalidade e segurança."</p>
  </td></tr>

  <!-- NOVO AGENDAMENTO BADGE -->
  <tr><td style="background:#C9A44A;padding:12px 40px;text-align:center;">
    <p style="margin:0;color:#1A2E22;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">📅 Novo Agendamento Recebido</p>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#FFFFFF;padding:40px;">

    <h2 style="margin:0 0 8px;color:#1A2E22;font-size:20px;font-weight:700;">Novo paciente agendou!</h2>
    <p style="margin:0 0 28px;color:#4A5C52;font-size:14px;line-height:1.6;">Um novo agendamento foi realizado pelo site. Confira os detalhes abaixo.</p>

    <!-- CARD AGENDAMENTO -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EE;border:1px solid #E2DDD4;border-radius:16px;overflow:hidden;margin-bottom:28px;">
      <tr><td style="background:linear-gradient(135deg,#1F3828,#2A4A35);padding:16px 20px;">
        <p style="margin:0;color:#C9A44A;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Detalhes do Agendamento</p>
      </td></tr>
      <tr><td style="padding:20px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${[
            ["👤","Paciente", data.client_name],
            ["📱","WhatsApp", data.client_phone],
            ["✉️","E-mail", data.client_email || "Não informado"],
            ["💉","Procedimento", data.service],
            ["👨‍⚕️","Profissional", data.professional],
            ["📅","Data", data.date],
            ["🕐","Horário", data.time],
            ["💳","Pagamento", data.payment_method],
          ].map(([icon, label, value]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #E2DDD4;width:32px;vertical-align:middle;">
              <span style="font-size:18px;">${icon}</span>
            </td>
            <td style="padding:10px 12px 10px 8px;border-bottom:1px solid #E2DDD4;width:130px;vertical-align:middle;">
              <span style="color:#6B7C74;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #E2DDD4;vertical-align:middle;">
              <span style="color:#1A2E22;font-size:13px;font-weight:600;">${value}</span>
            </td>
          </tr>`).join("")}
          <tr>
            <td style="padding:14px 0 0;vertical-align:middle;"><span style="font-size:18px;">💰</span></td>
            <td style="padding:14px 12px 0 8px;vertical-align:middle;"><span style="color:#6B7C74;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Valor</span></td>
            <td style="padding:14px 0 0;vertical-align:middle;"><span style="color:#C9A44A;font-size:18px;font-weight:800;">${priceFormatted}</span></td>
          </tr>
          ${data.notes ? `<tr><td colspan="3" style="padding:12px 0 0;"><div style="background:#FEF9C3;border:1px solid #FDE68A;border-radius:8px;padding:10px 12px;"><p style="margin:0;color:#92400E;font-size:12px;"><strong>Obs:</strong> ${data.notes}</p></div></td></tr>` : ""}
        </table>
      </td></tr>
    </table>

    <!-- CTA BUTTON -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td align="center">
          <a href="https://wa.me/${data.client_phone.replace(/\D/g,'')}" style="display:inline-block;background:linear-gradient(135deg,#1F3828,#2A4A35);color:#C9A44A;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:13px;font-weight:700;letter-spacing:0.5px;border:1px solid rgba(201,164,74,0.3);">📱 Falar com o Paciente</a>
        </td>
      </tr>
    </table>

    <div style="background:#F7F4EE;border:1px solid #E2DDD4;border-radius:12px;padding:16px 20px;text-align:center;">
      <p style="margin:0;color:#6B7C74;font-size:12px;">Acesse o painel para confirmar ou reagendar este atendimento.</p>
    </div>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#1A2E22;border-radius:0 0 20px 20px;padding:28px 40px;text-align:center;">
    <p style="margin:0 0 4px;color:#C9A44A;font-size:14px;font-weight:700;">Dr. Edson Carlos</p>
    <p style="margin:0 0 12px;color:rgba(255,255,255,0.4);font-size:11px;">Harmonização Facial · Tatuapé, São Paulo — SP</p>
    <p style="margin:0;color:rgba(255,255,255,0.3);font-size:10px;">© ${new Date().getFullYear()} Dr. Edson Carlos. Todos os direitos reservados.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildBookingEmailClient(data: {
  client_name: string;
  service: string;
  professional: string;
  date: string;
  time: string;
  price: number;
  payment_method: string;
}): string {
  const priceFormatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(data.price);
  const firstName = data.client_name.split(" ")[0];
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Agendamento Confirmado — Dr. Edson Carlos</title>
</head>
<body style="margin:0;padding:0;background:#F0EDE6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EDE6;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- HEADER -->
  <tr><td style="background:linear-gradient(160deg,#1A2E22 0%,#2A4A35 60%,#1F3828 100%);border-radius:20px 20px 0 0;padding:48px 40px 40px;text-align:center;">
    <div style="width:64px;height:64px;background:rgba(201,164,74,0.15);border:2px solid rgba(201,164,74,0.4);border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;font-size:28px;">🌿</div>
    <h1 style="margin:0 0 4px;color:#C9A44A;font-size:26px;font-weight:700;letter-spacing:-0.5px;">Dr. Edson Carlos</h1>
    <p style="margin:0 0 16px;color:rgba(255,255,255,0.45);font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;">Harmonização Facial · Medicina Estética · Tatuapé</p>
    <div style="width:60px;height:1px;background:linear-gradient(90deg,transparent,#C9A44A,transparent);margin:0 auto 18px;"></div>
    <p style="margin:0;color:rgba(255,255,255,0.5);font-size:13px;font-style:italic;max-width:380px;margin:0 auto;">"Realçando sua melhor versão com naturalidade e segurança."</p>
  </td></tr>

  <!-- SUCCESS BADGE -->
  <tr><td style="background:linear-gradient(135deg,#C9A44A,#D4AE52);padding:14px 40px;text-align:center;">
    <p style="margin:0;color:#1A2E22;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">✅ Agendamento Recebido com Sucesso</p>
  </td></tr>

  <!-- BODY -->
  <tr><td style="background:#FFFFFF;padding:44px 40px;">

    <!-- Welcome -->
    <h2 style="margin:0 0 6px;color:#1A2E22;font-size:22px;font-weight:700;">Olá, ${firstName}! 👋</h2>
    <p style="margin:0 0 8px;color:#1A2E22;font-size:16px;font-weight:600;">Seu agendamento foi recebido com sucesso.</p>
    <p style="margin:0 0 32px;color:#4A5C52;font-size:14px;line-height:1.75;">Estamos muito felizes em fazer parte da sua jornada de autoestima e bem-estar. Nossa equipe já recebeu sua solicitação e em breve você receberá a confirmação do horário.</p>

    <!-- CARD AGENDAMENTO -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F4EE;border:1px solid #E2DDD4;border-radius:20px;overflow:hidden;margin-bottom:32px;">
      <tr><td style="background:linear-gradient(135deg,#1F3828,#2A4A35);padding:18px 24px;">
        <p style="margin:0;color:#C9A44A;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">📋 Resumo do seu Agendamento</p>
      </td></tr>
      <tr><td style="padding:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          ${[
            ["💉","Procedimento", data.service, true],
            ["👨‍⚕️","Profissional", data.professional, false],
            ["📅","Data", data.date, false],
            ["🕐","Horário", data.time, false],
            ["💳","Forma de pagamento", data.payment_method, false],
          ].map(([icon, label, value, highlight]) => `
          <tr>
            <td style="padding:11px 0;border-bottom:1px solid #E2DDD4;width:36px;vertical-align:middle;font-size:18px;">${icon}</td>
            <td style="padding:11px 12px 11px 8px;border-bottom:1px solid #E2DDD4;vertical-align:middle;">
              <p style="margin:0;color:#6B7C74;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${label}</p>
              <p style="margin:3px 0 0;color:${highlight ? "#1F3828" : "#1A2E22"};font-size:${highlight ? "14px" : "13px"};font-weight:${highlight ? "700" : "600"};">${value}</p>
            </td>
          </tr>`).join("")}
          <!-- Valor destaque -->
          <tr>
            <td style="padding:16px 0 0;font-size:20px;vertical-align:middle;">💰</td>
            <td style="padding:16px 12px 0 8px;vertical-align:middle;">
              <p style="margin:0;color:#6B7C74;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Valor do procedimento</p>
              <p style="margin:4px 0 0;color:#C9A44A;font-size:24px;font-weight:800;letter-spacing:-0.5px;">${priceFormatted}</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>

    <!-- BENEFÍCIOS -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#F7F4EE,#EDE9E0);border:1px solid #E2DDD4;border-radius:16px;margin-bottom:32px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 16px;color:#1A2E22;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;">✦ Nossos Compromissos com Você</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${[
            ["🛡️","Atendimento personalizado e exclusivo"],
            ["⚗️","Procedimentos seguros e certificados"],
            ["🔬","Equipamentos de última geração"],
            ["✨","Resultados naturais e harmoniosos"],
            ["👨‍⚕️","Acompanhamento profissional completo"],
          ].map(([icon, text]) => `
          <tr>
            <td style="padding:6px 0;width:30px;font-size:16px;vertical-align:middle;">${icon}</td>
            <td style="padding:6px 0;color:#345C42;font-size:13px;font-weight:500;">${text}</td>
          </tr>`).join("")}
        </table>
      </td></tr>
    </table>

    <!-- AVISO CANCELAMENTO -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;margin-bottom:32px;">
      <tr><td style="padding:14px 18px;">
        <p style="margin:0;color:#92400E;font-size:13px;">⚠️ <strong>Cancelamentos</strong> devem ser feitos com pelo menos <strong>24 horas de antecedência</strong> para evitar cobrança.</p>
      </td></tr>
    </table>

    <!-- BOTÕES -->
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <tr>
        <td style="padding:0 6px 0 0;" width="50%">
          <a href="https://wa.me/5585989014145" style="display:block;background:linear-gradient(135deg,#1F3828,#2A4A35);color:#C9A44A;text-decoration:none;padding:14px 16px;border-radius:12px;font-size:12px;font-weight:700;text-align:center;border:1px solid rgba(201,164,74,0.3);">📱 Falar com a Clínica</a>
        </td>
        <td style="padding:0 0 0 6px;" width="50%">
          <a href="https://www.instagram.com/dredsoncarlos" style="display:block;background:#F7F4EE;color:#1A2E22;text-decoration:none;padding:14px 16px;border-radius:12px;font-size:12px;font-weight:700;text-align:center;border:1px solid #E2DDD4;">📸 @dredsoncarlos</a>
        </td>
      </tr>
    </table>

  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#1A2E22;border-radius:0 0 20px 20px;padding:32px 40px;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="text-align:center;">
          <p style="margin:0 0 4px;color:#C9A44A;font-size:15px;font-weight:700;">Dr. Edson Carlos</p>
          <p style="margin:0 0 12px;color:rgba(255,255,255,0.45);font-size:11px;letter-spacing:1px;text-transform:uppercase;">Harmonização Facial · Medicina Estética</p>
          <div style="width:40px;height:1px;background:rgba(201,164,74,0.3);margin:0 auto 14px;"></div>
          <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:11px;">📍 Tatuapé, São Paulo — SP</p>
          <p style="margin:0 0 4px;color:rgba(255,255,255,0.45);font-size:11px;">📱 (85) 98901-4145</p>
          <p style="margin:0 0 14px;color:rgba(255,255,255,0.45);font-size:11px;">📸 @dredsoncarlos</p>
          <p style="margin:0;color:rgba(255,255,255,0.25);font-size:10px;">© ${new Date().getFullYear()} Dr. Edson Carlos. Todos os direitos reservados.</p>
        </td>
      </tr>
    </table>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
