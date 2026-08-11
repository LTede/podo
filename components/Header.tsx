"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/clinic";

const NAV = [
  { href: "#philosophy", label: "포도 철학" },
  { href: "#services", label: "진료 안내" },
  { href: "#doctor", label: "의료진" },
  { href: "#care", label: "안전수술 · 감성케어" },
  { href: "#visit", label: "예약 · 오시는길" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모바일 메뉴 열림 시 배경 스크롤 잠금
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/80 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        {/* 로고 */}
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-wine md:text-2xl">
            포도여성의원
          </span>
          <span className="hidden text-[10px] font-medium tracking-[0.22em] text-gold md:block">
            PODO WOMEN&apos;S CLINIC
          </span>
        </a>

        {/* 데스크톱 내비 */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium tracking-wide text-charcoal/70 transition-colors hover:text-wine"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={clinic.phoneHref}
            className="hidden text-sm font-semibold tracking-wide text-wine md:block"
          >
            {clinic.phone}
          </a>
          <a
            href="#visit"
            className="rounded-full bg-wine px-4 py-2 text-[13px] font-semibold text-ivory shadow-lg shadow-wine/20 transition-all hover:bg-wine-deep hover:shadow-wine/30 md:px-5 md:py-2.5"
          >
            상담 예약
          </a>
          {/* 모바일 햄버거 */}
          <button
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-[1.5px] w-5 bg-charcoal transition-transform duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-charcoal transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-charcoal transition-transform duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-ivory transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`font-display border-b border-line py-4 text-2xl font-medium text-charcoal transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="px-8 pb-12">
          <a
            href={clinic.phoneHref}
            className="block rounded-full bg-wine py-4 text-center text-base font-semibold text-ivory"
          >
            {clinic.phone} 전화 상담
          </a>
          <p className="mt-4 text-center text-xs text-stone">
            {clinic.addressShort} · 평일 야간진료
          </p>
        </div>
      </div>
    </header>
  );
}
