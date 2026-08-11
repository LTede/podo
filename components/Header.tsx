"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/clinic";

const NAV = [
  { href: "/about", label: "소개" },
  { href: "/philosophy", label: "철학" },
  { href: "/services", label: "진료" },
  { href: "/doctor", label: "의료진" },
  { href: "/care", label: "케어" },
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

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        {/* 로고 */}
        <a href="/" className="flex items-center gap-2.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-rose to-wine shadow-[0_0_12px_rgba(168,78,110,0.5)]" />
          <span className="font-display text-lg font-semibold tracking-tight text-mist md:text-xl">
            포도여성의원
          </span>
        </a>

        {/* 알약형 플로팅 내비 (영상의 WORK — CONTACT 모티브) */}
        <div className="flex items-center gap-2.5">
          <nav
            className={`glass hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex ${
              scrolled ? "bg-noir/60" : ""
            }`}
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-mist/65 transition-colors hover:bg-white/70 hover:text-mist"
              >
                {item.label}
              </a>
            ))}
            <span className="mx-1 h-4 w-px bg-mist/15" />
            <a
              href={clinic.phoneHref}
              className="rounded-full px-4 py-2 text-[13px] font-semibold tracking-wide text-gold-soft transition-colors hover:bg-white/70"
            >
              {clinic.phone}
            </a>
          </nav>

          <a
            href="/visit"
            className="rounded-full bg-gradient-to-r from-wine to-grape px-5 py-2.5 text-[13px] font-semibold text-cream shadow-[0_0_24px_rgba(92,36,64,0.25)] transition-all hover:shadow-[0_0_32px_rgba(168,78,110,0.3)] md:px-6"
          >
            상담 예약
          </a>

          {/* 모바일 햄버거 */}
          <button
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen(!open)}
            className="glass flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
          >
            <span
              className={`h-[1.5px] w-4 bg-mist transition-transform duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-4 bg-mist transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-4 bg-mist transition-transform duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <div
        className={`fixed inset-0 -z-10 flex flex-col bg-noir/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8 pt-16">
          {[...NAV, { href: "/visit", label: "예약 · 오시는길" }].map(
            (item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                className={`font-display border-b border-mist/10 py-4 text-2xl font-medium text-mist transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
        <div className="px-8 pb-12">
          <a
            href={clinic.phoneHref}
            className="block rounded-full bg-gradient-to-r from-wine to-grape py-4 text-center text-base font-semibold text-cream"
          >
            {clinic.phone} 전화 상담
          </a>
          <p className="mt-4 text-center text-xs text-mist/40">
            {clinic.addressShort} · 평일 야간진료
          </p>
        </div>
      </div>
    </header>
  );
}
