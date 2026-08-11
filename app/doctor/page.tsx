import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Doctor from "@/components/sections/Doctor";

export const metadata: Metadata = {
  title: "의료진 소개 | 포도여성의원",
};

export default function DoctorPage() {
  return (
    <SubpageShell>
      <Doctor />
    </SubpageShell>
  );
}
