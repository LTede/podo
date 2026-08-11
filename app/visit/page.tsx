import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Visit from "@/components/sections/Visit";

export const metadata: Metadata = {
  title: "예약 · 오시는길 | 포도여성의원",
};

export default function VisitPage() {
  return (
    <SubpageShell>
      <Visit />
    </SubpageShell>
  );
}
