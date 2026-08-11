import { ReactNode } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Nebula from "@/components/gl/Nebula";
import ConsultBar from "@/components/ConsultBar";
import Footer from "@/components/Footer";

/** 서브페이지 공통 셸 — 네뷸라 배경 + 헤더 + 플로팅 상담 바 + 메인으로 돌아가기 */
export default function SubpageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nebula />
      <Header />
      <main className="pb-20 pt-24 md:pb-0">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-mist/50 transition-colors hover:text-rose"
          >
            <span aria-hidden>←</span> 메인으로
          </Link>
        </div>
        {children}
      </main>
      <ConsultBar />
      <Footer />
    </>
  );
}
