"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  bg: string;
}

function StatCard({ value, suffix, label, bg }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-8 flex flex-col items-center text-center"
      style={{ backgroundColor: bg }}
    >
      <div className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-2 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-[#777777] font-medium">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: 12000, suffix: "+", label: "invoices processed", bg: "#EDF1F5" },
    { value: 98, suffix: "%", label: "extraction accuracy", bg: "#F0F5EC" },
    { value: 4, suffix: "h", label: "saved per week on average", bg: "#F5EDF1" },
  ];

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <StatCard
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              bg={s.bg}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
