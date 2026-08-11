"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clinic } from "@/lib/clinic";

const ParticleField = dynamic(() => import("@/components/hero/ParticleField"), {
  ssr: false,
});

const BADGES = [
  "연세대 의대 · 의학박사",
  "여성성형 교과서 저자",
  "세계 100대 의료인 선정",
  "VIP 입원실 6실",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  // WebGL 캔버스는 첫 페인트 이후 마운트 (모션 최소화 설정 시 생략)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = requestAnimationFrame(() => setShowCanvas(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-line]",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.14, delay: 0.15 }
        )
        .fromTo(
          "[data-hero-fade]",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          "-=0.55"
        );
    },
    { scope: ref }
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* 배경 그라데이션 오브 */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-[34rem] w-[34rem] rounded-full bg-blush blur-[110px]" />
        <div className="absolute -right-24 top-8 h-[26rem] w-[26rem] rounded-full bg-grape-soft/25 blur-[110px]" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[30rem] rounded-full bg-gold-soft/25 blur-[110px]" />
      </div>

      {/* 파티클 캔버스 */}
      {showCanvas && (
        <div aria-hidden className="fade-in-slow absolute inset-0 opacity-0">
          <ParticleField />
        </div>
      )}

      {/* 카피 */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pt-24 md:px-8">
        <p
          data-hero-fade
          className="mb-5 text-[11px] font-semibold tracking-[0.3em] text-gold md:text-xs"
        >
          {clinic.addressShort.toUpperCase()} · 여성성형 25년
        </p>

        <h1 className="font-display text-[2.6rem] font-medium leading-[1.18] tracking-tight text-charcoal md:text-7xl">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">
              가장 사적인 아름다움까지,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-wine">
              당당하게.
            </span>
          </span>
        </h1>

        <p
          data-hero-fade
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-charcoal/65 md:text-lg"
        >
          여성성형 교과서를 집필한 산부인과 전문의가 상담부터 수술, 회복까지
          직접 함께합니다. 포도여성의원은 시술이 아니라{" "}
          <span className="font-semibold text-wine">당신의 자신감</span>을
          설계합니다.
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#visit"
            className="rounded-full bg-wine px-8 py-4 text-[15px] font-semibold text-ivory shadow-xl shadow-wine/25 transition-all hover:-translate-y-0.5 hover:bg-wine-deep"
          >
            나를 위한 상담 예약
          </a>
          <a
            href="#services"
            className="rounded-full border border-charcoal/15 bg-white/40 px-8 py-4 text-[15px] font-medium text-charcoal backdrop-blur transition-colors hover:border-wine/40 hover:text-wine"
          >
            진료 안내 보기
          </a>
        </div>
      </div>

      {/* 하단 신뢰 배지 스트립 */}
      <div data-hero-fade className="relative z-10 border-t border-line/70">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-5 py-6 md:grid-cols-4 md:px-8">
          {BADGES.map((b) => (
            <p
              key={b}
              className="text-center text-[11px] font-medium tracking-wide text-charcoal/55 md:text-[13px]"
            >
              {b}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
