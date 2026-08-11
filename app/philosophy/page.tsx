import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Philosophy from "@/components/sections/Philosophy";

export const metadata: Metadata = {
  title: "포도 철학 | 포도여성의원",
};

export default function PhilosophyPage() {
  return (
    <SubpageShell>
      <Philosophy />
    </SubpageShell>
  );
}
