import type { MetadataRoute } from "next";
import { categories } from "@/lib/content";

const BASE = "https://www.podowoman.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/philosophy",
    "/services",
    "/doctor",
    "/care",
    "/about",
    "/visit",
  ].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const cats = categories.map((c) => ({
    url: `${BASE}/services/${c.key}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...statics, ...cats];
}
