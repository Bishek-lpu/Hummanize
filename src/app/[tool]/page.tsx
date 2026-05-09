import { Metadata } from 'next';
import { seoData } from '../data/seo';
import { notFound } from 'next/navigation';
import HomeClient from '@/components/HomeClient';

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const toolData = seoData[resolvedParams.tool];
  
  if (!toolData) {
    return { title: 'Not Found' };
  }

  return {
    title: `${toolData.title} | Hummanize`,
    description: toolData.metaDesc,
  };
}

export function generateStaticParams() {
  return Object.keys(seoData).map((tool) => ({ tool }));
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  const toolData = seoData[resolvedParams.tool];

  if (!toolData) {
    notFound();
  }

  // We reuse the main application logic, passing down the dynamic SEO content
  return <HomeClient seoContent={toolData} />;
}
