import { NextResponse } from "next/server";

/** 비공개 상담 신청 수신.
 *  운영 연동 지점: 아래 TODO에서 알림톡/이메일/CRM API 호출로 교체.
 *  (예: 카카오 알림톡, 스티비/센드그리드, 채널톡/솔라피 등) */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const phone = String(body.phone ?? "").replace(/\D/g, "");
  if (phone.length < 9) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // TODO(운영): 여기서 병원 측 채널로 전달 — 알림톡/이메일/CRM.
  // 개인정보는 로그에 남기지 않는다.
  console.log(
    `[consult] 신규 상담 신청 접수 (관심: ${String(body.interest || "미정")}, 시간대: ${String(
      body.time || "무관"
    )})`
  );

  return NextResponse.json({ ok: true });
}
