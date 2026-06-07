// ─── Procedures ────────────────────────────────────────────────────────────
export const procedures = [
  {
    id: "harmonizacao-completa",
    name: "Harmonização Facial Completa",
    shortDesc: "Botox + Preenchimento + Rinomodelação em uma única sessão.",
    description:
      "Protocolo exclusivo do Dr. Edson que combina toxina botulínica, ácido hialurônico e rinomodelação para uma transformação completa e natural.",
    benefits: [
      "Resultado imediato e natural",
      "Protocolo personalizado",
      "Sem cirurgia ou internação",
      "Alta em menos de 2h",
    ],
    contraindications: ["Gestantes", "Lactantes", "Alergia ao produto"],
    duration: "90 min",
    price: 1200,
    installments: "4x R$ 300",
    badge: "Mais Procurado",
    badgeType: "gold" as const,
    emoji: "✨",
    category: "harmonizacao",
  },
  {
    id: "toxina-botulinica",
    name: "Toxina Botulínica (Botox)",
    shortDesc: "Aplicação precisa para rugas, sobrancelha e sorriso gengival.",
    description:
      "Técnica de aplicação ultrafina para relaxamento muscular, suavização de rugas de expressão e elevação da sobrancelha com resultado duradouro.",
    benefits: [
      "Suaviza rugas de expressão",
      "Eleva sobrancelha caída",
      "Corrige sorriso gengival",
      "Dura 4 a 6 meses",
    ],
    contraindications: ["Gestantes", "Doenças neuromusculares"],
    duration: "45 min",
    price: 600,
    installments: "2x R$ 300",
    badge: "Clássico",
    badgeType: "green" as const,
    emoji: "💉",
    category: "botox",
  },
  {
    id: "preenchimento-labial",
    name: "Preenchimento Labial",
    shortDesc: "Volume, contorno e hidratação com ácido hialurônico premium.",
    description:
      "Modelagem labial com ácido hialurônico de alta qualidade para volume natural, definição do contorno e hidratação duradoura.",
    benefits: [
      "Volume natural e simétrico",
      "Sem aspecto artificial",
      "Dura 9 a 12 meses",
      "Masculino e feminino",
    ],
    contraindications: ["Gestantes", "Herpética ativa"],
    duration: "50 min",
    price: 750,
    installments: "3x R$ 250",
    badge: "Feminino & Masculino",
    badgeType: "gold" as const,
    emoji: "💋",
    category: "preenchimento",
  },
  {
    id: "rinomodelacao",
    name: "Rinomodelação",
    shortDesc: "Correção do dorso nasal sem cirurgia, resultado imediato.",
    description:
      "Procedimento não cirúrgico para correção de dorso nasal, projeção da ponta e melhora do perfil com ácido hialurônico ou hidroxiapatita.",
    benefits: [
      "Sem cirurgia ou cortes",
      "Alta imediata",
      "Resultado imediato",
      "Reversível",
    ],
    contraindications: ["Cirurgia nasal recente", "Gestantes"],
    duration: "60 min",
    price: 850,
    installments: "3x R$ 284",
    badge: "Sem Cirurgia",
    badgeType: "green" as const,
    emoji: "👃",
    category: "rinomodelacao",
  },
  {
    id: "harmonizacao-masculina",
    name: "Harmonização Masculina",
    shortDesc: "Protocolo exclusivo para realce da masculinidade.",
    description:
      "Protocolo desenvolvido especialmente para o rosto masculino, com técnicas que respeitam e realçam as características de cada paciente.",
    benefits: [
      "Jawline definido",
      "Olhar mais marcado",
      "Natural e masculino",
      "Sem feminilizar",
    ],
    contraindications: ["Doenças autoimunes ativas"],
    duration: "90 min",
    price: 1100,
    installments: "4x R$ 275",
    badge: "Especialidade",
    badgeType: "gold" as const,
    emoji: "🧔",
    category: "harmonizacao",
  },
  {
    id: "bichectomia",
    name: "Bichectomia Não-cirúrgica",
    shortDesc: "Redução de bochechas e definição facial sem cortes.",
    description:
      "Técnica inovadora para redução do volume das bochechas e definição do contorno facial sem procedimento cirúrgico.",
    benefits: [
      "Rosto mais definido",
      "Sem cortes ou pontos",
      "Recuperação imediata",
      "Resultado progressivo",
    ],
    contraindications: ["Rosto muito magro", "Gestantes"],
    duration: "55 min",
    price: 680,
    installments: "2x R$ 340",
    badge: "Novidade",
    badgeType: "green" as const,
    emoji: "⚗️",
    category: "bichectomia",
  },
];

// ─── Professionals ──────────────────────────────────────────────────────────
export const professionals = [
  {
    id: "dr-edson",
    name: "Dr. Edson Carlos",
    title: "Médico · CRM/SP 000000",
    specialty: "Harmonização Facial · Medicina Estética",
    rating: 4.9,
    reviews: 312,
    emoji: "👨‍⚕️",
    available: true,
    bio: "Especialista em harmonização facial com mais de 8 anos de experiência. Referência no Tatuapé e reconhecido nas redes sociais por resultados naturais.",
  },
  {
    id: "dra-ana",
    name: "Dra. Ana Cristina",
    title: "Médica assistente",
    specialty: "Preenchimento · Botox",
    rating: 4.8,
    reviews: 148,
    emoji: "👩‍⚕️",
    available: true,
    bio: "Especialista em procedimentos minimamente invasivos com foco em naturalidade e segurança.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: "Mariana Ferreira",
    procedure: "Harmonização Facial",
    text: "Dr. Edson é incrível! O resultado ficou absolutamente natural, ninguém descobriu que fiz harmonização. Agendei pelo app em 2 minutos e o atendimento foi impecável.",
    rating: 5,
    initials: "MF",
  },
  {
    id: 2,
    name: "Rafael Lima",
    procedure: "Harmonização Masculina",
    text: "Fiz harmonização masculina com o Dr. Edson e o resultado ficou exatamente o que eu queria. Muito profissional e super atencioso. Super recomendo!",
    rating: 5,
    initials: "RL",
  },
  {
    id: 3,
    name: "Camila Santos",
    procedure: "Rinomodelação",
    text: "A rinomodelação transformou meu rosto! Melhor investimento que já fiz. E o app é muito prático, acabou aquela espera no WhatsApp.",
    rating: 5,
    initials: "CS",
  },
  {
    id: 4,
    name: "Bruno Oliveira",
    procedure: "Botox",
    text: "Primeira vez fazendo botox e o Dr. Edson me deixou muito tranquilo. Resultado natural, sem aquele aspecto de 'congelado'. Voltarei com certeza.",
    rating: 5,
    initials: "BO",
  },
  {
    id: 5,
    name: "Fernanda Costa",
    procedure: "Preenchimento Labial",
    text: "Amei o resultado do meu preenchimento! Ficou exatamente o volume que eu queria, sem exageros. O sistema de agendamento online é excelente.",
    rating: 5,
    initials: "FC",
  },
  {
    id: 6,
    name: "Lucas Mendes",
    procedure: "Harmonização Masculina",
    text: "Fui indicado por um amigo e não me arrependo. Jawline muito mais definido, resultado natural. Dr. Edson é referência mesmo.",
    rating: 5,
    initials: "LM",
  },
];

// ─── Time slots ──────────────────────────────────────────────────────────────
export const generateTimeSlots = () => {
  const all = [
    "08:00","08:30","09:00","09:30","10:00","10:30",
    "11:00","11:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30",
  ];
  // Simulate some occupied slots
  const occupied = ["09:00","11:00","13:00","15:30","17:00"];
  return all.map((t) => ({ time: t, occupied: occupied.includes(t) }));
};

// ─── Stats ───────────────────────────────────────────────────────────────────
export const clinicStats = [
  { value: "5.000+", label: "procedimentos realizados" },
  { value: "99%",   label: "satisfação dos pacientes" },
  { value: "8 anos", label: "de experiência" },
  { value: "5★",    label: "avaliação no Google" },
];

// ─── Loyalty tiers ───────────────────────────────────────────────────────────
export const loyaltyTiers = [
  { name: "Silver", min: 0,    max: 1000, discount: 0,  cashback: 3  },
  { name: "Gold",   min: 1001, max: 5000, discount: 0,  cashback: 5  },
  { name: "Diamond",min: 5001, max: null, discount: 15, cashback: 8  },
];

export const loyaltyBenefits = [
  {
    icon: "Coins",
    title: "Cashback em pontos",
    desc: "Ganhe 5% de volta em cada procedimento, resgatável como desconto.",
    stat: "5% back",
  },
  {
    icon: "UserPlus",
    title: "Indique e ganhe",
    desc: "Indique um amigo e receba R$ 80 de crédito no 1º procedimento dele.",
    stat: "R$ 80 / indicação",
  },
  {
    icon: "Crown",
    title: "Área Diamond",
    desc: "Agenda prioritária, acesso antecipado e 15% de desconto permanente.",
    stat: "15% off sempre",
  },
  {
    icon: "Ticket",
    title: "Cupons especiais",
    desc: "Cupons exclusivos no aniversário e em datas comemorativas.",
    stat: "4 cupons ativos",
  },
  {
    icon: "Star",
    title: "Acesso antecipado",
    desc: "Membros VIP agendam com 72h de antecedência antes do público geral.",
    stat: "+72h antecipado",
  },
  {
    icon: "Gift",
    title: "Brinde no aniversário",
    desc: "Tratamento surpresa gratuito no mês do seu aniversário.",
    stat: "1 gift / ano",
  },
];
