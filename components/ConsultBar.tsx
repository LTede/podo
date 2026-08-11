"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/lib/clinic";

/** 플로팅 상담 바 — 모바일 하단 고정 3버튼, 데스크톱 우하단 플로팅.
 *  모든 페이지에서 상시 노출되는 1차 전환 장치 */
export default function ConsultBar() {
  const [visible, setVisible] = useState(false);

  // 메인에서 인트로가 재생 중일 때만 끝나기를 기다렸다가 표시
  useEffect(() => {
    const introPending =
      window.location.pathname === "/" &&
      !sessionStorage.getItem("podo-intro") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (introPending) {
      const show = () => setVisible(true);
      window.addEventListener("podo-intro-reveal", show, { once: true });
      const fallback = setTimeout(show, 4500);
      return () => {
        window.removeEventListener("podo-intro-reveal", show);
        clearTimeout(fallback);
      };
    }
    setVisible(true);
  }, []);

  return (
    <>
      {/* 모바일 — 하단 고정 바 */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-mist/10 bg-noir/85 backdrop-blur-xl transition-transform duration-700 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="grid grid-cols-3">
          <a
            href={clinic.phoneHref}
            className="flex flex-col items-center gap-0.5 py-3 text-mist"
          >
            <span className="text-base" aria-hidden>📞</span>
            <span className="text-[11px] font-semibold">전화 상담</span>
          </a>
          {clinic.kakaoUrl ? (
            <a
              href={clinic.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 border-x border-mist/10 py-3 text-mist"
            >
              <span className="text-base" aria-hidden>💬</span>
              <span className="text-[11px] font-semibold">카톡 상담</span>
            </a>
          ) : (
            <a
              href={clinic.naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 border-x border-mist/10 py-3 text-mist"
            >
              <span className="text-base" aria-hidden>📍</span>
              <span className="text-[11px] font-semibold">오시는 길</span>
            </a>
          )}
          <a
            href="/visit#consult"
            className="flex flex-col items-center gap-0.5 bg-gradient-to-r from-wine to-grape py-3 text-cream"
          >
            <span className="text-base" aria-hidden>🗓</span>
            <span className="text-[11px] font-semibold">비공개 상담</span>
          </a>
        </div>
      </div>

      {/* 데스크톱 — 우하단 플로팅 */}
      <a
        href="/visit#consult"
        className={`fixed bottom-7 right-7 z-40 hidden items-center gap-3 rounded-full bg-gradient-to-r from-wine to-grape py-3.5 pl-5 pr-6 text-sm font-semibold text-cream shadow-[0_0_36px_rgba(92,36,64,0.3)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(168,78,110,0.3)] md:flex ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-soft" />
        </span>
        비공개 상담 신청
      </a>
    </>
  );
}
