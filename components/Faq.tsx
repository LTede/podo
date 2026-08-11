"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faq";

/** FAQ 아코디언 — 글래스 패널, 부드러운 펼침 */
export default function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="glass overflow-hidden rounded-2xl">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="font-display text-[15px] font-semibold text-mist md:text-base">
                <span aria-hidden className="mr-2.5 text-gold">Q.</span>
                {f.q}
              </span>
              <span
                aria-hidden
                className={`shrink-0 text-rose transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-mist/60">
                  {f.a}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
