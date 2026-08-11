"use client";

import { useEffect, useRef, useState } from "react";
import { trustStats } from "@/lib/trust";

/** 숫자 신뢰 스트립 — 뷰포트 진입 시 카운트업 */
export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(trustStats.map((s) => s.countFrom));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValues(trustStats.map((s) => s.value));
      return;
    }
    const D = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / D);
      const e = 1 - Math.pow(1 - p, 3);
      setValues(
        trustStats.map((s) =>
          Math.round(s.countFrom + (s.value - s.countFrom) * e)
        )
      );
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6"
    >
      {trustStats.map((s, i) => (
        <div key={s.label} className="text-center">
          <p className="text-glow-gradient font-display text-3xl font-semibold tabular-nums md:text-4xl">
            {values[i].toLocaleString()}
            <span className="text-xl md:text-2xl">{s.suffix}</span>
          </p>
          <p className="mt-2 text-[11px] tracking-wide text-mist/45 md:text-[12px]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
