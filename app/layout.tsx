import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const SITE_TITLE = "포도여성의원 | 강남역 여성성형 · 산부인과";
const SITE_DESC =
  "여성성형 교과서를 쓴 산부인과 전문의 모형진 원장. 무봉합 레이저 3D 소음순성형, 질성형, 요실금, 하이푸, 줄기세포 — 강남역 포도여성의원. 평일 야간진료, 전 객실 VIP 1인실.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.podowoman.com"),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESC,
  keywords: [
    "포도여성의원",
    "강남 여성성형",
    "소음순성형",
    "무봉합 소음순성형",
    "질성형",
    "요실금",
    "강남역 산부인과",
    "야간진료 산부인과",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: "website",
    locale: "ko_KR",
    siteName: "포도여성의원",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

/** 구조화 데이터 — 검색엔진에 병원·의료진 정보 제공 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "포도여성의원",
  alternateName: "PODO Women's Clinic",
  telephone: "+82-2-3442-4454",
  address: {
    "@type": "PostalAddress",
    streetAddress: "강남대로 428 만이빌딩 2층",
    addressLocality: "강남구",
    addressRegion: "서울",
    addressCountry: "KR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "17:00",
    },
  ],
  medicalSpecialty: "Gynecologic",
  founder: {
    "@type": "Physician",
    name: "모형진",
    jobTitle: "대표원장 · 산부인과 전문의 · 의학박사",
  },
};

export const viewport: Viewport = {
  themeColor: "#120a10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
