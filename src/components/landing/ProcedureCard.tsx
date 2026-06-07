import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { procedures } from "@/lib/data";

type Procedure = (typeof procedures)[number];

interface ProcedureCardProps {
  procedure: Procedure;
  className?: string;
}

export default function ProcedureCard({ procedure, className }: ProcedureCardProps) {
  const { name, shortDesc, emoji, duration, price, installments, badge, badgeType } = procedure;

  return (
    <div
      className={cn(
        "card p-0 overflow-hidden group transition-all duration-300",
        "hover:border-green-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/5",
        className
      )}
    >
      {/* Image area */}
      <div
        className={cn(
          "h-36 flex items-center justify-center text-5xl",
          badgeType === "gold"
            ? "bg-gradient-to-br from-gold/10 to-green-100"
            : "bg-gradient-to-br from-green-50 to-cream-200"
        )}
      >
        {emoji}
      </div>

      <div className="p-4">
        {/* Badge */}
        <span
          className={cn(
            "badge mb-2",
            badgeType === "gold" ? "badge-gold" : "badge-green"
          )}
        >
          {badge}
        </span>

        {/* Title & desc */}
        <h3 className="text-sm font-bold text-green-900 mb-1 leading-tight">{name}</h3>
        <p className="text-xs text-green-600 leading-relaxed mb-3 line-clamp-2">{shortDesc}</p>

        {/* Footer */}
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
            href={`/agendamento?procedimento=${procedure.id}&preco=${price}`}
            className="btn-primary text-xs py-2 px-3 gap-1"
          >
            Agendar <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
