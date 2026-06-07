"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, MONTH_NAMES, DAY_NAMES_SHORT, getDaysInMonth, getFirstDayOfMonth, isToday, isPast, AVAILABLE_DAYS } from "@/lib/utils";

interface CalendarProps {
  onSelect: (date: Date) => void;
  selected: Date | null;
}

export default function BookingCalendar({ onSelect, selected }: CalendarProps) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear]   = useState(today.getFullYear());

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const firstDay  = getFirstDayOfMonth(year, month);
  const daysCount = getDaysInMonth(year, month);

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysCount }, (_, i) => i + 1),
  ];

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-lg border border-cream-300 flex items-center justify-center text-green-600 hover:border-green-400 hover:text-green-800 transition-all"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold text-green-900">
          {MONTH_NAMES[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-lg border border-cream-300 flex items-center justify-center text-green-600 hover:border-green-400 hover:text-green-800 transition-all"
          aria-label="Próximo mês"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES_SHORT.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-green-400 py-1 tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const date    = new Date(year, month, day);
          const past    = isPast(date);
          const todayDay = isToday(date);
          const hasSlots = AVAILABLE_DAYS.has(day) && !past;
          const isSel    = selected
            ? selected.getDate() === day &&
              selected.getMonth() === month &&
              selected.getFullYear() === year
            : false;

          return (
            <button
              key={day}
              disabled={past}
              onClick={() => !past && onSelect(date)}
              className={cn(
                "cal-day-btn",
                isSel    && "selected",
                todayDay && !isSel && "today",
                past     && "disabled",
                hasSlots && !isSel && !past && "has-slots"
              )}
              aria-label={`${day} de ${MONTH_NAMES[month]}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-cream-300">
        <div className="flex items-center gap-1.5 text-[10px] text-green-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Disponível
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-green-500">
          <span className="w-2 h-2 rounded-full bg-gold inline-block" />
          Hoje
        </div>
      </div>
    </div>
  );
}
