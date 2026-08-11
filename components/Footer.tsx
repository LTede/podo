import { clinic } from "@/lib/clinic";

export default function Footer() {
  // 모바일: 하단 고정 상담 바에 가리지 않도록 pb-32 여유 패딩
  return (
    <footer className="border-t border-line pb-32 pt-14 text-mist/45 md:pb-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <p className="font-display text-xl font-semibold text-mist">
            포도여성의원
            <span className="ml-3 text-[10px] font-normal tracking-[0.25em] text-gold">
              PODO WOMEN&apos;S CLINIC
            </span>
          </p>
          <a
            href={clinic.phoneHref}
            className="text-sm font-semibold text-mist/75"
          >
            {clinic.phone}
          </a>
        </div>

        <div className="mt-8 space-y-1.5 border-t border-mist/10 pt-8 text-[13px] leading-relaxed">
          <p>{clinic.address}</p>
          <p>대표원장 모형진 · 산부인과 전문의</p>
        </div>

        <p className="mt-8 text-[11px] leading-relaxed text-mist/30">
          본 홈페이지의 내용은 의료 정보 제공을 목적으로 하며, 개인에 따라
          시술·수술의 결과와 회복 기간은 다를 수 있고 부작용이 발생할 수
          있으므로 반드시 전문의와 충분한 상담 후 결정하시기 바랍니다.
        </p>
        <p className="mt-4 text-[11px] text-mist/25">
          © {new Date().getFullYear()} PODO WOMEN&apos;S CLINIC. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
