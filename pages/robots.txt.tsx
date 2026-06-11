import type { GetServerSideProps } from "next";
import { env } from "@/lib/env";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = env.siteUrl.replace(/\/$/, "");

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /preview/\nSitemap: ${baseUrl}/sitemap.xml\n`);
  res.end();

  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
