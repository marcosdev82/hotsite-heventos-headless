import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentTemplate } from "@/components/content/ContentTemplate";
import { MainLayout } from "@/layouts/MainLayout";
import { buildContentMetadata } from "@/lib/seo";
import {
  getNodeByUri,
  normalizeUri,
} from "@/services/content.service";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const uri = normalizeUri(slug);
  const node = await getNodeByUri(uri);

  if (!node) {
    return { title: "Página não encontrada" };
  }

  return buildContentMetadata(node);
}

export default async function WordPressPage({ params }: PageProps) {
  const { slug } = await params;
  const uri = normalizeUri(slug);
  const node = await getNodeByUri(uri);

  if (!node) {
    notFound();
  }

  return (
    <MainLayout>
      <ContentTemplate node={node} />
    </MainLayout>
  );
}
