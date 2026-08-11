"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Tilt from "@/components/Tilt";
import { clinic } from "@/lib/clinic";

/* 영상의 'WHAT ARE YOU LOOKING FOR?' 모티브 */
const LOOKING_FOR = [
  { label: "소음순성형", href: "#services" },
  { label: "질성형 · 질시술", href: "#services" },
  { label: "요실금 클리닉", href: "#services" },
  { label: "여성 검진", href: "#services" },
];

/* 공중에 떠 있는 글래스 카드들 */
const FLOAT_CARDS = [
  {
    tag: "SIGNATURE",
    title: "여성성형\n교과서를 쓴 원장",
    grad: "from-wine via-grape to-rose-deep",
    cls: "right-[4%] top-[16%] w-52 rotate-[7deg] md:w-64",
    delay: "0s",
  },
  {
    tag: "PRIVATE",
    title: "VIP 입원실 6실\n1:1 프라이버시 동선",
    grad: "from-grape via-rose-deep to-gold",
    cls: "right-[20%] top-[46%] w-48 -rotate-[5deg] md:w-56",
    delay: "1.2s",
  },
  {
    tag: "NIGHT CLINIC",
    title: "평일 저녁 7시까지\n야간진료",
    grad: "from-noir-3 via-wine to-grape",
    cls: "right-[2%] top-[62%] w-44 rotate-[3deg] md:w-52",
    delay: "2.1s",
  },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      const introPending = !sessionStorage.getItem("podo-intro");
      const tl = gsap
        .timeline({ paused: introPending, defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-stage]",
          { scale: 0.94, rotationZ: -2.5, opacity: 0.3, transformOrigin: "50% 40%" },
          { scale: 1, rotationZ: 0, opacity: 1, duration: 1.3, ease: "power2.out" }
        )
        .fromTo(
          "[data-hero-line]",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.14 },
          "-=0.9"
        )
        .fromTo(
          "[data-hero-fade]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero-card]",
          { y: 60, opacity: 0, rotationX: 18, transformPerspective: 900 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.8"
        );

      if (introPending) {
        const play = () => tl.play();
        window.addEventListener("podo-intro-reveal", play, { once: true });
        return () => window.removeEventListener("podo-intro-reveal", play);
      }
    },
    { scope: ref }
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* 거대 외곽선 워터마크 */}
      <p
        aria-hidden
        className="text-outline pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 select-none whitespace-nowrap font-display text-[17vw] font-bold leading-none tracking-tight"
      >
        PODO
      </p>

      <div
        data-hero-stage
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 md:px-8"
      >
        <p
          data-hero-fade
          className="mb-6 text-[11px] font-semibold tracking-[0.35em] text-gold md:text-xs"
        >
          GANGNAM · PRIVATE WOMEN&apos;S CLINIC · SINCE 25 YEARS
        </p>

        <h1 className="font-display text-[3rem] font-medium leading-[1.12] tracking-tight text-mist md:text-[5.6rem]">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              가장 사적인
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              아름다움까지,
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-hero-line className="text-glow-gradient block">
              당당하게.
            </span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mt-7 max-w-lg text-[15px] leading-relaxed text-mist/55 md:text-lg"
        >
          여성성형 교과서를 집필한 산부인과 전문의가 상담부터 회복까지 직접.
          포도여성의원은 시술이 아니라{" "}
          <span className="font-semibold text-rose">당신의 자신감</span>을
          설계합니다.
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#visit"
            className="rounded-full bg-gradient-to-r from-wine to-grape px-8 py-4 text-[15px] font-semibold text-mist shadow-[0_0_36px_rgba(141,68,103,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(217,139,166,0.5)]"
          >
            나를 위한 상담 예약
          </a>
          <a
            href={clinic.phoneHref}
            className="glass rounded-full px-8 py-4 text-[15px] font-medium text-mist/85 transition-colors hover:border-rose/40 hover:text-rose"
          >
            {clinic.phone}
          </a>
        </div>

        {/* 무엇을 찾고 계신가요? — 영상의 좌측 리스트 모티브 */}
        <div data-hero-fade className="mt-14 md:mt-16">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-mist/35">
            무엇을 찾고 계신가요?
          </p>
          <ul className="mt-3 space-y-1.5">
            {LOOKING_FOR.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-[13px] font-medium text-mist/55 transition-colors hover:text-rose"
                >
                  <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 공중에 떠 있는 글래스 카드 (데스크톱) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
      >
        {FLOAT_CARDS.map((c) => (
          <div
            key={c.tag}
            data-hero-card
            className={`absolute ${c.cls}`}
            style={{
              animation: `float-slow 7s ease-in-out infinite`,
              animationDelay: c.delay,
            }}
          >
            <Tilt max={10} className="pointer-events-auto">
              <div className="glass overflow-hidden rounded-2xl">
                <div
                  className={`h-24 bg-gradient-to-br ${c.grad} opacity-80 md:h-28`}
                />
                <div className="p-4">
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-gold">
                    {c.tag}
                  </p>
                  <p className="font-display mt-1.5 whitespace-pre-line text-[13px] font-medium leading-snug text-mist/90">
                    {c.title}
                  </p>
                </div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>

      {/* 하단 스트립 */}
      <div data-hero-fade className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="relative h-8 w-[1px] overflow-hidden bg-mist/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-rose" />
            </span>
            <span className="text-[10px] tracking-[0.3em] text-mist/35">
              SCROLL
            </span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {["연세대 의대 · 의학박사", "여성성형 교과서 저자", "세계 100대 의료인"].map(
              (b) => (
                <p key={b} className="text-[11px] tracking-wide text-mist/40 md:text-xs">
                  {b}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
