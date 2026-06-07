import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { testimonials } from "@/lib/data";

type Testimonial = (typeof testimonials)[number];

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export default function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div className={cn("card p-5", className)}>
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-green-700 leading-relaxed mb-4 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-green-800 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-green-900">{testimonial.name}</p>
          <p className="text-xs text-green-500">{testimonial.procedure}</p>
        </div>
      </div>
    </div>
  );
}
