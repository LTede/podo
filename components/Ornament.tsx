import { useId } from "react";

/** 덩굴 모티브의 장식 라인 — 아이브로우 아래 등 포인트 장식용 */
export default function Ornament({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 12" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="6" x2="120" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d98ba6" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#d4a763" />
          <stop offset="1" stopColor="#d98ba6" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d="M2 6 C 20 0.5, 38 11.5, 60 6 C 82 0.5, 100 11.5, 118 6"
        stroke={`url(#${id})`}
        strokeWidth="1"
      />
      <circle cx="60" cy="6" r="2" fill="#d4a763" />
      <circle cx="30" cy="4.2" r="1" fill="#d98ba6" opacity="0.8" />
      <circle cx="90" cy="7.8" r="1" fill="#d98ba6" opacity="0.8" />
    </svg>
  );
}
