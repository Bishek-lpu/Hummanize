import { Metadata } from 'next';
import { seoData } from '../data/seo';
import { notFound } from 'next/navigation';
import HomeClient from '@/components/HomeClient';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hummanize.ai';

interface Props {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const toolData = seoData[resolvedParams.tool];
  
  if (!toolData) {
    return { title: 'Not Found' };
  }

  const canonicalUrl = `${baseUrl}/${toolData.canonicalSlug}`;

  return {
    title: `${toolData.title} | Hummanize`,
    description: toolData.metaDesc,
    keywords: toolData.keywords,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: toolData.title,
      description: toolData.metaDesc,
      url: canonicalUrl,
      siteName: 'Hummanize',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: toolData.title,
      description: toolData.metaDesc,
    },
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

  return <HomeClient seoContent={toolData} />;
}
