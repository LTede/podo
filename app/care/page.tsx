import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Care from "@/components/sections/Care";

export const metadata: Metadata = {
  title: "안전수술 · 감성케어 | 포도여성의원",
};

export default function CarePage() {
  return (
    <SubpageShell>
      <Care />
    </SubpageShell>
  );
}
