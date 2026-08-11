"use client";

import {
  Children,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** 챕터당 스크롤 길이(vh) — 클수록 회전이 느긋해짐 */
const CH_VH = 115;
/** 챕터당 나선 하강량(px) */
const DY = 100;
/** 링 기울기 — 0이면 정면 카드가 완전한 수직 (기울기는 카드가 젖혀 보이는 부작용이 있어 미사용) */
const TILT = 0;

/* 히어로(#top)는 랜딩 섹션이 담당 — 나선은 7챕터 완전 원형(각 360/7°).
   Nebula의 Vine도 같은 챕터 수·위상으로 동기 (components/gl/Nebula.tsx) */
const IDS = [
  "philosophy",
  "services",
  "centers",
  "doctor",
  "care",
  "about",
  "visit",
];
const LABELS = ["철학", "진료", "센터", "의료진", "케어", "소개", "예약"];

/** 나선형 스크롤 무대 — 스크롤이 링을 돌려 다음 챕터가 눈앞으로 회전해 들어온다 */
export default function SpiralStage({ children }: { children: ReactNode }) {
  const panels = Children.toArray(children);
  const n = panels.length;
  /** 챕터 간 회전각 — n등분 완전 원형 */
  const step = 360 / n;

  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActive = useRef(0);

  const [mode3d, setMode3d] = useState<boolean | null>(null);
  const [radius, setRadius] = useState(760);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setMode3d(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const measure = () => {
      const w = Math.min(window.innerWidth * 0.92, 780);
      // 이웃 카드와 여백을 두어 원형 간격이 읽히도록
      setRadius(
        Math.round(((w / 2) / Math.tan(((step / 2) * Math.PI) / 180)) * 1.12)
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [step]);

  useGSAP(
    () => {
      if (!mode3d || !wrap.current || !ring.current) return;

      const apply = (progress: number) => {
        const f = progress * (n - 1);
        if (ring.current) {
          ring.current.style.transform = `translateZ(${-radius}px) rotateX(${TILT}deg) rotateY(${
            -f * step
          }deg) translateY(${-f * DY}px)`;
        }
        panelRefs.current.forEach((p, i) => {
          if (!p) return;
          const d = Math.abs(i - f);
          // 이웃 두 장까지 은은하게 보이도록 — 원형 실루엣이 항상 읽힌다
          p.style.opacity = String(
            Math.max(0.06, Math.min(1, 1.22 - d * 0.52))
          );
          p.style.pointerEvents = d < 0.5 ? "auto" : "none";
        });
        const idx = Math.max(0, Math.min(n - 1, Math.round(f)));
        if (idx !== lastActive.current) {
          lastActive.current = idx;
          setActive(idx);
        }
      };

      apply(0);
      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.7,
        onUpdate: (self) => apply(self.progress),
      });

      // 인트로에서 이어받는 회전 입장
      const introPending = !sessionStorage.getItem("podo-intro");
      const enter = () =>
        gsap.fromTo(
          stage.current,
          { opacity: 0, scale: 0.9, rotationZ: -4 },
          { opacity: 1, scale: 1, rotationZ: 0, duration: 1.4, ease: "power3.out" }
        );
      if (introPending) {
        window.addEventListener("podo-intro-reveal", enter, { once: true });
      } else {
        enter();
      }

      return () => {
        st.kill();
        window.removeEventListener("podo-intro-reveal", enter);
      };
    },
    { dependencies: [mode3d, radius, n], scope: wrap }
  );

  /* 모션 최소화 설정: 평면 폴백 */
  if (mode3d === false) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-5 py-28">
        {panels.map((child, i) => (
          <div key={i} id={IDS[i]}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={wrap}
      id="spiral-track"
      className="relative"
      // 트랙 길이: 마지막 챕터 앵커(=(n-1)*CH_VH)에서 정확히 정면이 되도록 +100vh
      style={{ height: `${(n - 1) * CH_VH + 100}vh` }}
    >
      {/* 내비 앵커 타깃 */}
      {IDS.slice(0, n).map((id, i) => (
        <span
          key={id}
          id={id}
          aria-hidden
          className="absolute left-0 h-px w-px"
          style={{ top: `${i * CH_VH}vh` }}
        />
      ))}

      {/* 고정 무대 */}
      <div
        ref={stage}
        className="sticky top-0 h-svh overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        {/* 외곽선 워터마크 */}
        <p
          aria-hidden
          className="text-outline pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 select-none whitespace-nowrap font-display text-[15vw] font-bold leading-none"
        >
          PODO
        </p>

        {/* 나선 링 */}
        <div
          ref={ring}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(${-radius}px) rotateX(${TILT}deg)`,
          }}
        >
          {panels.map((child, i) => (
            <div
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 flex items-center"
              style={{
                // 마진으로 사전 센터링 — 회전 원점이 패널 중심이 되도록 (늦은 translate 금지)
                width: "min(92vw, 780px)",
                marginLeft: "calc(min(92vw, 780px) / -2)",
                height: "min(88svh, 680px)",
                marginTop: "calc(min(88svh, 680px) / -2)",
                backfaceVisibility: "hidden",
                transform: `rotateY(${i * step}deg) translateZ(${radius}px) translateY(${i * DY}px)`,
              }}
            >
              <div className="max-h-full w-full overflow-hidden rounded-[2rem]">
                {child}
              </div>
            </div>
          ))}
        </div>

        {/* 챕터 도트 내비 */}
        <nav
          aria-label="챕터 이동"
          className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2.5 md:right-7"
        >
          {panels.map((_, i) => (
            <button
              key={i}
              aria-label={`${LABELS[i] ?? i + 1} 챕터로 이동`}
              onClick={() =>
                window.scrollTo({
                  // 트랙은 랜딩 히어로 뒤에서 시작 — 트랙 기준 오프셋 보정
                  top:
                    (wrap.current?.offsetTop ?? 0) +
                    (i * CH_VH * window.innerHeight) / 100,
                  behavior: "smooth",
                })
              }
              className={`rounded-full transition-all duration-500 ${
                active === i
                  ? "h-7 w-1.5 bg-rose shadow-[0_0_10px_rgba(217,139,166,0.8)]"
                  : "h-1.5 w-1.5 bg-mist/25 hover:bg-mist/50"
              }`}
            />
          ))}
        </nav>

        {/* 진행 힌트 + 여정 건너뛰기 (빠른 길) — 모바일은 하단 상담 바 위로 올림 */}
        <div className="absolute bottom-24 left-1/2 flex -translate-x-1/2 items-center gap-5 md:bottom-5">
          <p className="text-[10px] tracking-[0.35em] text-mist/30">
            SCROLL — {String(active + 1).padStart(2, "0")} /{" "}
            {String(n).padStart(2, "0")}
          </p>
          <button
            onClick={() =>
              window.scrollTo({
                top:
                  (wrap.current?.offsetTop ?? 0) +
                  (wrap.current?.offsetHeight ?? 0),
                behavior: "smooth",
              })
            }
            className="rounded-full border border-mist/15 px-4 py-1.5 text-[10px] tracking-[0.15em] text-mist/45 transition-colors hover:border-rose/50 hover:text-rose"
          >
            여정 건너뛰기 · 상담 바로가기 ↓
          </button>
        </div>
      </div>
    </div>
  );
}
