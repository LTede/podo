"use client";

import { FormEvent, useState } from "react";
import { services } from "@/lib/clinic";

type Status = "idle" | "sending" | "done" | "error";

/** 비공개 상담 신청 폼 — 가명 허용, /api/consult 로 전송 */
export default function ConsultForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.phone || String(data.phone).replace(/\D/g, "").length < 9) {
      setError("연락받으실 번호를 확인해주세요.");
      return;
    }
    if (!data.agree) {
      setError("개인정보 수집·이용 동의가 필요합니다.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="glass rounded-3xl p-10 text-center">
        <p className="font-display text-2xl font-semibold text-mist">
          신청이 접수되었습니다
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mist/55">
          확인 후 선택하신 시간대에 <span className="text-rose">비공개로</span>{" "}
          연락드립니다.
          <br />
          발신번호는 병원명이 노출되지 않는 일반 번호로도 가능하니, 통화 시
          말씀해주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-7 md:p-10">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-[12px] font-medium text-mist/55">
            성함{" "}
            <em className="not-italic text-gold">— 가명도 괜찮습니다</em>
          </span>
          <input
            name="name"
            type="text"
            placeholder="예) 포도님"
            className="mt-1.5 w-full rounded-xl border border-mist/15 bg-noir-2/60 px-4 py-3 text-sm text-mist placeholder:text-mist/25 focus:border-rose/50 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[12px] font-medium text-mist/55">
            연락처 <em className="not-italic text-rose">*</em>
          </span>
          <input
            name="phone"
            type="tel"
            required
            placeholder="010-0000-0000"
            className="mt-1.5 w-full rounded-xl border border-mist/15 bg-noir-2/60 px-4 py-3 text-sm text-mist placeholder:text-mist/25 focus:border-rose/50 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[12px] font-medium text-mist/55">관심 분야</span>
          <select
            name="interest"
            className="mt-1.5 w-full rounded-xl border border-mist/15 bg-noir-2/60 px-4 py-3 text-sm text-mist focus:border-rose/50 focus:outline-none"
          >
            <option value="">아직 잘 모르겠어요</option>
            {services.map((s) => (
              <option key={s.key} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-[12px] font-medium text-mist/55">
            연락받기 편한 시간
          </span>
          <select
            name="time"
            className="mt-1.5 w-full rounded-xl border border-mist/15 bg-noir-2/60 px-4 py-3 text-sm text-mist focus:border-rose/50 focus:outline-none"
          >
            <option value="언제든">언제든 괜찮아요</option>
            <option value="오전">오전 (10시–12시)</option>
            <option value="오후">오후 (12시–5시)</option>
            <option value="저녁">저녁 (5시–7시)</option>
          </select>
        </label>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-[12px] leading-relaxed text-mist/50">
        <input
          name="agree"
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#b25f80]"
        />
        <span>
          상담 연락을 위한 개인정보 수집·이용에 동의합니다. 수집 항목은
          연락처·관심 분야이며, 상담 완료 후 파기됩니다. 상담 내용은 비공개로
          관리됩니다.
        </span>
      </label>

      {error && <p className="mt-3 text-[13px] text-rose">{error}</p>}
      {status === "error" && (
        <p className="mt-3 text-[13px] text-rose">
          전송에 실패했습니다. 전화(02-3442-4454)로 문의해주시면 빠르게
          도와드리겠습니다.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-gradient-to-r from-wine to-grape py-4 text-[15px] font-semibold text-mist shadow-[0_0_36px_rgba(141,68,103,0.55)] transition-all hover:-translate-y-0.5 disabled:opacity-60 md:w-auto md:px-12"
      >
        {status === "sending" ? "전송 중…" : "비공개 상담 신청하기"}
      </button>
    </form>
  );
}
