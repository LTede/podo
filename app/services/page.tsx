import type { Metadata } from "next";
import SubpageShell from "@/components/SubpageShell";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "진료 안내 | 포도여성의원",
};

export default function ServicesPage() {
  return (
    <SubpageShell>
      <Services />
    </SubpageShell>
  );
}
