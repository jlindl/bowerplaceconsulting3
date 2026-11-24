import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Demo build: block all crawling until the client approves going live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
