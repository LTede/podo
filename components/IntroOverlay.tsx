"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** 첫 진입 시 회전하며 사이트 속으로 들어가는 인트로.
 *  세션당 1회만 재생, 모션 최소화 설정 시 생략.
 *  줌 시작 시점에 'podo-intro-reveal' 이벤트를 쏘아 히어로가 이어받는다. */
export default function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("podo-intro")) return;
    setShow(true);
  }, []);

  useGSAP(
    () => {
      if (!show || !ref.current) return;
      document.documentElement.style.overflow = "hidden";
      const done = () => {
        sessionStorage.setItem("podo-intro", "1");
        document.documentElement.style.overflow = "";
        setShow(false);
      };
      gsap
        .timeline({ onComplete: done })
        // 점 고리가 회전하며 형성
        .fromTo(
          "[data-intro-ring]",
          { rotation: -140, scale: 0.55, opacity: 0 },
          { rotation: 0, scale: 1, opacity: 1, duration: 1.15, ease: "power3.out" }
        )
        .fromTo(
          "[data-intro-dot]",
          { scale: 0 },
          { scale: 1, duration: 0.45, stagger: 0.035, ease: "back.out(2.2)" },
          "<0.12"
        )
        .fromTo(
          "[data-intro-logo]",
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.55"
        )
        .to({}, { duration: 0.5 }) // 잠깐의 정적
        .call(() => window.dispatchEvent(new Event("podo-intro-reveal")))
        // 문을 통과하듯 — 회전하며 화면 속으로 줌인
        .to("[data-intro-stage]", {
          scale: 7,
          rotation: 24,
          opacity: 0,
          duration: 1.1,
          ease: "power3.in",
        })
        .to(ref.current, { opacity: 0, duration: 0.4 }, "-=0.25");
    },
    { scope: ref, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[70] flex items-center justify-center bg-noir"
    >
      <div data-intro-stage className="flex flex-col items-center">
        <div data-intro-ring className="relative h-52 w-52 md:h-64 md:w-64">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-6.5rem)`,
              }}
            >
              <span
                data-intro-dot
                className={`block h-2.5 w-2.5 rounded-full md:h-3 md:w-3 ${
                  i % 3 === 0 ? "bg-gold-soft" : "bg-grape-soft"
                }`}
              />
            </span>
          ))}
          {/* 포도알 중심 */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              data-intro-dot
              className="h-16 w-16 rounded-full bg-gradient-to-br from-grape to-wine shadow-2xl shadow-black/40 md:h-20 md:w-20"
            />
          </span>
        </div>
        <p
          data-intro-logo
          className="font-display mt-8 text-2xl font-semibold tracking-tight text-ivory md:text-3xl"
        >
          포도여성의원
        </p>
        <p
          data-intro-logo
          className="mt-2 text-[10px] font-medium tracking-[0.4em] text-gold-soft"
        >
          PODO WOMEN&apos;S CLINIC
        </p>
      </div>
    </div>
  );
}
