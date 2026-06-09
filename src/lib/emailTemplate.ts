// Imagens dos procedimentos para o email
const PROC_IMAGES: Record<string, string> = {
  "Harmonização Facial Completa": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=240&fit=crop",
  "Toxina Botulínica (Botox)":    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=240&fit=crop",
  "Preenchimento Labial":         "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600&h=240&fit=crop",
  "Rinomodelação":                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&h=240&fit=crop",
  "Harmonização Masculina":       "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=240&fit=crop",
  "Bichectomia Não-cirúrgica":    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=240&fit=crop",
};

const PROC_DESC: Record<string, string> = {
  "Harmonização Facial Completa": "Realce sua beleza com equilíbrio, harmonia e naturalidade.",
  "Toxina Botulínica (Botox)":    "Suavize rugas e conquiste uma expressão mais jovem e natural.",
  "Preenchimento Labial":         "Lábios mais volumosos, definidos e hidratados com naturalidade.",
  "Rinomodelação":                "Corrija o contorno nasal sem cirurgia, com resultado imediato.",
  "Harmonização Masculina":       "Realce sua masculinidade com sofisticação e naturalidade.",
  "Bichectomia Não-cirúrgica":    "Defina o contorno facial sem cortes para um rosto mais elegante.",
};

// SVG icons inline (dourado)
const ICONS = {
  user:    `<img src="https://img.icons8.com/ios/24/C9A44A/user-male-circle.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  phone:   `<img src="https://img.icons8.com/ios/24/C9A44A/whatsapp.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  email:   `<img src="https://img.icons8.com/ios/24/C9A44A/mail.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  needle:  `<img src="https://img.icons8.com/ios/24/C9A44A/syringe.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  doctor:  `<img src="https://img.icons8.com/ios/24/C9A44A/doctor-male.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  cal:     `<img src="https://img.icons8.com/ios/24/C9A44A/calendar.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  clock:   `<img src="https://img.icons8.com/ios/24/C9A44A/clock.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  money:   `<img src="https://img.icons8.com/ios/24/C9A44A/money-bag.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
  card:    `<img src="https://img.icons8.com/ios/24/C9A44A/card-in-use.png" width="20" height="20" style="vertical-align:middle;" alt=""/>`,
};

export function buildBookingEmailDoctor(data: {
  client_name: string; client_phone: string; client_email: string;
  service: string; professional: string; date: string; time: string;
  price: number; payment_method: string; notes?: string;
}): string {
  const price = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(data.price);
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:24px 16px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);">

  <!-- HEADER -->
  <tr><td style="background:#F9F5EE;padding:32px 40px 24px;border-bottom:1px solid #E8E0D0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <div style="width:44px;height:44px;border:1.5px solid #C9A44A;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:10px;text-align:center;line-height:44px;">🌿</div>
        <h1 style="margin:0 0 2px;font-family:Georgia,serif;font-size:22px;color:#1A1A1A;"><span style="color:#C9A44A;">Dr.</span> Edson Carlos</h1>
        <p style="margin:0;font-size:10px;color:#8A7A6A;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Harmonização Facial · Medicina Estética · Tatuapé – SP</p>
        <div style="width:36px;height:1.5px;background:#C9A44A;margin:10px 0;"></div>
        <p style="margin:0;font-size:12px;color:#8A7A6A;font-style:italic;">"Realçando sua melhor versão com naturalidade e segurança."</p>
      </td>
      <td style="vertical-align:middle;text-align:right;width:130px;">
        <div style="width:110px;height:110px;border-radius:50%;border:3px solid #C9A44A;overflow:hidden;display:inline-block;">
          <img src="https://pjzvqvuiwlcuvnadjayj.supabase.co/storage/v1/object/public/assets/dr-edson.jpg" width="110" height="110" style="object-fit:cover;display:block;" alt="Dr. Edson Carlos" onerror="this.style.display='none'"/>
        </div>
      </td>
    </tr></table>
  </td></tr>

  <!-- BADGE -->
  <tr><td style="background:linear-gradient(135deg,#C9A44A,#B8933A);padding:12px 40px;text-align:center;">
    <p style="margin:0;color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">📅 Novo Agendamento Recebido</p>
  </td></tr>

  <!-- BODY -->
  <tr><td style="padding:36px 40px;">
    <h2 style="margin:0 0 6px;font-family:Georgia,serif;font-size:18px;color:#1A1A1A;">Novo paciente agendou!</h2>
    <p style="margin:0 0 28px;font-size:13px;color:#6B6B6B;line-height:1.6;font-family:Arial,sans-serif;">Confira os detalhes completos do agendamento abaixo.</p>

    <!-- CARD DETALHES -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E0D0;border-radius:12px;overflow:hidden;margin-bottom:28px;">
      <tr><td style="padding:14px 20px;background:#FAF7F2;border-bottom:1px solid #E8E0D0;text-align:center;">
        <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C9A44A;font-family:Arial,sans-serif;">📋 DETALHES DO AGENDAMENTO</span>
      </td></tr>
      <tr><td style="padding:20px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PACIENTE</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.client_name}</p>
            </td>
            <td width="50%" style="padding:8px 0 8px 12px;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">DATA</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.date}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">WHATSAPP</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.client_phone}</p>
            </td>
            <td width="50%" style="padding:8px 0 8px 12px;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">HORÁRIO</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.time}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">E-MAIL</p>
              <p style="margin:0;font-size:13px;color:#C9A44A;font-weight:600;font-family:Arial,sans-serif;">${data.client_email || "Não informado"}</p>
            </td>
            <td width="50%" style="padding:8px 0 8px 12px;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">VALOR</p>
              <p style="margin:0;font-size:16px;color:#C9A44A;font-weight:700;font-family:Arial,sans-serif;">${price}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:8px 12px 8px 0;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PROCEDIMENTO</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:700;font-family:Arial,sans-serif;">${data.service}</p>
            </td>
            <td width="50%" style="padding:8px 0 8px 12px;vertical-align:top;border-bottom:1px solid #F0EBE2;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PAGAMENTO</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.payment_method}</p>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding:8px 0 0;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PROFISSIONAL</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.professional}</p>
            </td>
          </tr>
          ${data.notes ? `<tr><td colspan="2" style="padding:12px 0 0;"><div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:10px 14px;"><p style="margin:0;font-size:12px;color:#92400E;font-family:Arial,sans-serif;"><strong>Obs:</strong> ${data.notes}</p></div></td></tr>` : ""}
        </table>
      </td></tr>
    </table>

    <!-- CTA -->
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <a href="https://wa.me/${data.client_phone.replace(/\D/g,"")}" style="display:inline-block;background:linear-gradient(135deg,#C9A44A,#B8933A);color:#FFFFFF;text-decoration:none;padding:14px 36px;border-radius:50px;font-size:13px;font-weight:700;letter-spacing:0.5px;font-family:Arial,sans-serif;">📱 Falar com o Paciente</a>
      </td></tr>
    </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="background:#F9F5EE;border-top:1px solid #E8E0D0;padding:24px 40px;text-align:center;">
    <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:14px;color:#C9A44A;font-weight:700;">Dr. Edson Carlos</p>
    <p style="margin:0 0 12px;font-size:10px;color:#A09080;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,sans-serif;">Harmonização Facial · Tatuapé, São Paulo — SP</p>
    <p style="margin:0;font-size:10px;color:#C0B8B0;font-family:Arial,sans-serif;">© ${new Date().getFullYear()} Dr. Edson Carlos. Todos os direitos reservados.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}

export function buildBookingEmailClient(data: {
  client_name: string; service: string; professional: string;
  date: string; time: string; price: number; payment_method: string;
}): string {
  const price = new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(data.price);
  const firstName = data.client_name.split(" ")[0];
  const procImg = PROC_IMAGES[data.service] ?? PROC_IMAGES["Harmonização Facial Completa"];
  const procDesc = PROC_DESC[data.service] ?? "Realce sua beleza com naturalidade e segurança.";

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:24px 16px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);">

  <!-- HEADER -->
  <tr><td style="background:#F9F5EE;padding:36px 40px 28px;border-bottom:1px solid #E8E0D0;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;">
        <div style="width:44px;height:44px;border:1.5px solid #C9A44A;border-radius:50%;text-align:center;line-height:44px;margin-bottom:12px;">🌿</div>
        <h1 style="margin:0 0 2px;font-family:Georgia,serif;font-size:24px;color:#1A1A1A;"><span style="color:#C9A44A;">Dr.</span> Edson Carlos</h1>
        <p style="margin:0 0 8px;font-size:10px;color:#8A7A6A;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Harmonização Facial · Medicina Estética · Tatuapé – SP</p>
        <div style="width:36px;height:1.5px;background:#C9A44A;margin:0 0 10px;"></div>
        <p style="margin:0;font-size:12px;color:#8A7A6A;font-style:italic;">"Realçando sua melhor versão com naturalidade e segurança."</p>
      </td>
      <td style="vertical-align:middle;text-align:right;width:130px;">
        <div style="width:110px;height:110px;border-radius:50%;border:3px solid #C9A44A;overflow:hidden;display:inline-block;background:#F0EBE2;">
          <img src="https://pjzvqvuiwlcuvnadjayj.supabase.co/storage/v1/object/public/assets/dr-edson.jpg" width="110" height="110" style="width:110px;height:110px;object-fit:cover;display:block;" alt="Dr. Edson Carlos" onerror="this.style.display='none'"/>
        </div>
      </td>
    </tr></table>
  </td></tr>

  <!-- SUCCESS BADGE -->
  <tr><td style="background:linear-gradient(135deg,#C9A44A,#B8933A);padding:14px 40px;text-align:center;">
    <p style="margin:0;color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">✅ Agendamento Recebido com Sucesso</p>
  </td></tr>

  <!-- WELCOME -->
  <tr><td style="padding:36px 40px 28px;text-align:center;border-bottom:1px solid #F0EBE2;">
    <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:26px;color:#C9A44A;">Olá, ${firstName}!</h2>
    <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#1A1A1A;font-family:Arial,sans-serif;">Seu agendamento foi recebido com sucesso.</p>
    <p style="margin:0 0 6px;font-size:13px;color:#6B6B6B;line-height:1.7;font-family:Arial,sans-serif;">Estamos muito felizes em fazer parte da sua jornada de autoestima e bem-estar.</p>
    <p style="margin:0;font-size:13px;color:#6B6B6B;line-height:1.7;font-family:Arial,sans-serif;">Nossa equipe já recebeu sua solicitação e em breve você receberá as confirmações necessárias.</p>
  </td></tr>

  <!-- CARD DETALHES -->
  <tr><td style="padding:28px 40px;border-bottom:1px solid #F0EBE2;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8E0D0;border-radius:12px;overflow:hidden;">
      <tr><td style="padding:14px 20px;background:#FAF7F2;border-bottom:1px solid #E8E0D0;text-align:center;">
        <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C9A44A;font-family:Arial,sans-serif;">📋 DETALHES DO AGENDAMENTO</span>
      </td></tr>
      <tr><td style="padding:20px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="50%" style="padding:9px 12px 9px 0;border-bottom:1px solid #F0EBE2;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PACIENTE</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.client_name}</p>
            </td>
            <td width="50%" style="padding:9px 0 9px 12px;border-bottom:1px solid #F0EBE2;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">DATA</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.date}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:9px 12px 9px 0;border-bottom:1px solid #F0EBE2;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PROCEDIMENTO</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:700;font-family:Arial,sans-serif;">${data.service}</p>
            </td>
            <td width="50%" style="padding:9px 0 9px 12px;border-bottom:1px solid #F0EBE2;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">HORÁRIO</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.time}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:9px 12px 9px 0;border-bottom:1px solid #F0EBE2;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PROFISSIONAL</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.professional}</p>
            </td>
            <td width="50%" style="padding:9px 0 9px 12px;border-bottom:1px solid #F0EBE2;vertical-align:top;">
              <p style="margin:0 0 3px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">PAGAMENTO</p>
              <p style="margin:0;font-size:13px;color:#1A1A1A;font-weight:600;font-family:Arial,sans-serif;">${data.payment_method}</p>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding:12px 0 0;text-align:center;">
              <p style="margin:0 0 2px;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">VALOR DO PROCEDIMENTO</p>
              <p style="margin:0;font-size:28px;color:#C9A44A;font-weight:800;font-family:Arial,sans-serif;letter-spacing:-0.5px;">${price}</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- BANNER PROCEDIMENTO -->
  <tr><td style="padding:0 40px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #E8E0D0;">
      <tr>
        <td width="55%" style="padding:24px;background:#FAF7F2;vertical-align:middle;">
          <p style="margin:0 0 4px;font-size:9px;color:#C9A44A;text-transform:uppercase;letter-spacing:2px;font-weight:700;font-family:Arial,sans-serif;">PROCEDIMENTO</p>
          <h3 style="margin:0 0 8px;font-family:Georgia,serif;font-size:18px;color:#1A1A1A;line-height:1.2;">${data.service}</h3>
          <div style="width:28px;height:1.5px;background:#C9A44A;margin:0 0 10px;"></div>
          <p style="margin:0;font-size:12px;color:#6B6B6B;line-height:1.6;font-family:Arial,sans-serif;">${procDesc}</p>
        </td>
        <td width="45%" style="padding:0;vertical-align:middle;">
          <img src="${procImg}" width="240" style="width:100%;display:block;height:160px;object-fit:cover;" alt="${data.service}"/>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- BENEFÍCIOS -->
  <tr><td style="padding:0 40px 28px;border-bottom:1px solid #F0EBE2;">
    <p style="margin:0 0 18px;text-align:center;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C9A44A;font-family:Arial,sans-serif;">POR QUE ESCOLHER NOSSOS SERVIÇOS?</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        ${["👤 Atendimento\npersonalizado","🛡️ Procedimentos\nseguros","💎 Equipamentos\nde ponta","🌿 Resultados\nnaturais","⭐ Acompanhamento\nprofissional"].map(b => {
          const [icon, ...rest] = b.split(" ");
          return `<td style="text-align:center;padding:0 4px;vertical-align:top;">
            <div style="width:44px;height:44px;border:1.5px solid #E8E0D0;border-radius:50%;margin:0 auto 8px;line-height:44px;text-align:center;font-size:20px;">${icon}</div>
            <p style="margin:0;font-size:10px;color:#6B6B6B;line-height:1.4;font-family:Arial,sans-serif;">${rest.join(" ").replace("\n","<br/>")}</p>
          </td>`;
        }).join("")}
      </tr>
    </table>
  </td></tr>

  <!-- BOTÕES -->
  <tr><td style="padding:24px 40px;border-bottom:1px solid #F0EBE2;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="padding:0 6px 0 0;" width="34%">
        <a href="https://wa.me/5585989014145" style="display:block;background:linear-gradient(135deg,#C9A44A,#B8933A);color:#FFFFFF;text-decoration:none;padding:12px 8px;border-radius:10px;font-size:11px;font-weight:700;text-align:center;font-family:Arial,sans-serif;">📱 Falar com<br/>a Clínica</a>
      </td>
      <td style="padding:0 3px;" width="33%">
        <a href="https://calendar.google.com/calendar/r/eventedit" style="display:block;background:#FFFFFF;color:#1A1A1A;text-decoration:none;padding:12px 8px;border-radius:10px;font-size:11px;font-weight:700;text-align:center;border:1px solid #E8E0D0;font-family:Arial,sans-serif;">📅 Adicionar<br/>à Agenda</a>
      </td>
      <td style="padding:0 0 0 6px;" width="33%">
        <a href="https://maps.google.com/?q=Tatuapé+São+Paulo" style="display:block;background:#FFFFFF;color:#1A1A1A;text-decoration:none;padding:12px 8px;border-radius:10px;font-size:11px;font-weight:700;text-align:center;border:1px solid #E8E0D0;font-family:Arial,sans-serif;">📍 Como<br/>Chegar</a>
      </td>
    </tr></table>
  </td></tr>

  <!-- AVISO -->
  <tr><td style="padding:16px 40px 0;">
    <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:8px;padding:12px 16px;">
      <p style="margin:0;color:#92400E;font-size:12px;font-family:Arial,sans-serif;">⚠️ <strong>Cancelamentos</strong> devem ser feitos com pelo menos <strong>24 horas de antecedência</strong>.</p>
    </div>
  </td></tr>

  <!-- FOOTER -->
  <tr><td style="padding:28px 40px;background:#F9F5EE;border-top:1px solid #E8E0D0;margin-top:24px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="vertical-align:middle;" width="50%">
        <div style="width:36px;height:36px;border:1.5px solid #C9A44A;border-radius:50%;text-align:center;line-height:36px;margin-bottom:8px;">🌿</div>
        <p style="margin:0 0 2px;font-family:Georgia,serif;font-size:14px;color:#C9A44A;font-weight:700;">Dr. Edson Carlos</p>
        <p style="margin:0;font-size:9px;color:#A09080;text-transform:uppercase;letter-spacing:1px;font-family:Arial,sans-serif;">Harmonização Facial · Medicina Estética</p>
        <div style="margin-top:10px;display:flex;gap:8px;">
          <a href="https://instagram.com/dredsoncarlos" style="color:#C9A44A;font-size:11px;font-family:Arial,sans-serif;text-decoration:none;">📸 Instagram</a>
        </div>
      </td>
      <td style="vertical-align:middle;text-align:right;" width="50%">
        <p style="margin:0 0 4px;font-size:11px;color:#6B6B6B;font-family:Arial,sans-serif;">📍 Rua Itapura, 1234 – Tatuapé<br/>São Paulo – SP</p>
        <p style="margin:4px 0;font-size:11px;color:#6B6B6B;font-family:Arial,sans-serif;">📱 (85) 98901-4145</p>
        <p style="margin:4px 0;font-size:11px;color:#C9A44A;font-family:Arial,sans-serif;">✉️ contato@dredsoncarlos.com.br</p>
      </td>
    </tr></table>
    <div style="margin-top:16px;padding-top:14px;border-top:1px solid #E8E0D0;text-align:center;">
      <p style="margin:0;font-size:10px;color:#C0B8B0;font-family:Arial,sans-serif;">© ${new Date().getFullYear()} Dr. Edson Carlos. Todos os direitos reservados.</p>
    </div>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;
}
