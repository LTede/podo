import Link from "next/link";
import { symptoms } from "@/lib/trust";

/** 증상 기반 진입 — 방문자의 언어로 각 센터에 연결 */
export default function SymptomNav() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {symptoms.map((s) => (
        <Link
          key={s.href + s.text}
          href={s.href}
          className="group rounded-full border border-mist/15 bg-white/55 px-5 py-2.5 text-[13px] text-mist/65 transition-all hover:border-rose/50 hover:bg-rose/5 hover:text-rose md:text-sm"
        >
          {s.text}
          <span
            aria-hidden
            className="ml-2 inline-block text-gold transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
