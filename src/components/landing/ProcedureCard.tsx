import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { procedures } from "@/lib/data";

type Procedure = (typeof procedures)[number];

interface ProcedureCardProps {
  procedure: Procedure;
  className?: string;
}

// Fotos reais para cada procedimento (Unsplash - free to use)
const PROC_IMAGES: Record<string, string> = {
  "harmonizacao-completa": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=250&fit=crop",
  "toxina-botulinica":     "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=250&fit=crop",
  "preenchimento-labial":  "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=400&h=250&fit=crop",
  "rinomodelacao":         "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=250&fit=crop",
  "harmonizacao-masculina":"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=250&fit=crop",
  "bichectomia":           "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=250&fit=crop",
};

export default function ProcedureCard({ procedure, className }: ProcedureCardProps) {
  const { name, shortDesc, duration, price, installments, badge, badgeType, id } = procedure;
  const imageUrl = PROC_IMAGES[id] ?? "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=250&fit=crop";

  return (
    <div className={cn(
      "card p-0 overflow-hidden group transition-all duration-300",
      "hover:border-gold/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/5",
      className
    )}>
      {/* Real photo */}
      <div className="h-44 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Badge over image */}
        <span className={cn(
          "absolute bottom-3 left-3 badge text-[10px]",
          badgeType === "gold" ? "badge-gold" : "badge-green"
        )}>
          {badge}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-green-900 mb-1 leading-tight">{name}</h3>
        <p className="text-xs text-green-600 leading-relaxed mb-3 line-clamp-2">{shortDesc}</p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-green-800">
              R$ {price.toLocaleString("pt-BR")}
            </p>
            <p className="text-[10px] text-green-500 flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" /> {duration}
              <span className="mx-1">·</span>
              {installments}
            </p>
          </div>
          <Link
            href={`/agendamento?procedimento=${id}&preco=${price}`}
            className="btn-primary text-xs py-2 px-3 gap-1"
          >
            Agendar <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
