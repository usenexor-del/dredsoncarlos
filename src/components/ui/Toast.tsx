"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  type?: "success" | "error" | "warning";
}

export default function Toast({ message, show, onClose, type = "success" }: ToastProps) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed bottom-24 md:bottom-6 right-4 z-[200] flex items-center gap-3",
        "bg-green-900 border border-gold text-white text-sm rounded-xl px-4 py-3.5",
        "shadow-xl transition-all duration-300",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      )}
    >
      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100" aria-label="Fechar">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
