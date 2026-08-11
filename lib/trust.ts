/** 신뢰 지표 · 증상 네비 · 연혁 — 전수조사 사실 기반 */

export const trustStats = [
  { value: 2003, label: "개원", suffix: "년", countFrom: 1980 },
  { value: 25, label: "원장 임상 경력", suffix: "년+", countFrom: 0 },
  { value: 30000, label: "누적 수술", suffix: "례+", countFrom: 0 },
  { value: 100, label: "세계 여성성형 의료인", suffix: "인 선정", countFrom: 0 },
  { value: 6, label: "VIP 1인 입원실", suffix: "실", countFrom: 0 },
  { value: 10, label: "무상 사후관리", suffix: "년", countFrom: 0 },
];

/** 증상 기반 진입 — 방문자의 언어로 쓰인 칩 */
export const symptoms = [
  { text: "소음순 모양이 오래된 고민이에요", href: "/services/vulvar" },
  { text: "출산 후 몸이 달라진 것 같아요", href: "/services/vaginal" },
  { text: "웃거나 뛸 때 소변이 새요", href: "/services/incontinence" },
  { text: "생리통이 점점 심해져요", href: "/services/obgy" },
  { text: "자궁근종 진단을 받았어요", href: "/services/hifu" },
  { text: "부부관계가 예전 같지 않아요", href: "/services/sexual" },
  { text: "몸의 노화가 느껴지기 시작했어요", href: "/services/stemcell" },
  { text: "피부까지 같이 관리하고 싶어요", href: "/services/skin" },
];

/** 연혁 — 연도 미상 항목은 마일스톤으로 표기 */
export const milestones = [
  { year: "2003", text: "강남 포도여성의원 개원 — 여성성형 전문 진료 시작" },
  { year: "", text: "여성성형 교과서 집필 — 전문의들이 참고하는 표준서" },
  { year: "", text: "무봉합 100% 레이저 3D 소음순성형 개발" },
  { year: "", text: "반영구 골반인대접합술 · 요실금 술식 · 성감 증진 필러 개발" },
  { year: "", text: "IBC 선정 여성성형 분야 세계 100대 의료인 · Marquis Who's Who 등재" },
  { year: "", text: "누적 수술 3만 례 — 개원 이래 의료 무사고 기록" },
  { year: "오늘", text: "VIP 1인실 6실 · 10년 무상 사후관리 · 다국어 진료 안내 운영" },
];
