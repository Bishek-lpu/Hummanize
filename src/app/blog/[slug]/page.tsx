import { Metadata } from 'next';
import { blogData } from '../../data/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Sparkles, Clock, User, Calendar } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hummanize.ai';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogData[resolvedParams.slug];
  
  if (!post) {
    return { title: 'Post Not Found | Hummanize Blog' };
  }

  const canonicalUrl = `${baseUrl}/blog/${resolvedParams.slug}`;

  return {
    title: `${post.title} | Hummanize Blog`,
    description: post.metaDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.metaDesc,
      url: canonicalUrl,
      siteName: 'Hummanize',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDesc,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = blogData[resolvedParams.slug];

  if (!post) {
    notFound();
  }

  // Build related posts (up to 3 other posts)
  const relatedPosts = Object.entries(blogData)
    .filter(([slug]) => slug !== resolvedParams.slug)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDesc,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'Hummanize',
      url: baseUrl,
    },
    url: `${baseUrl}/blog/${resolvedParams.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="bg-blobs">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>

      <div className="container">
        <header>
          <Link href="/" className="logo">
            <div className="logo-icon">
              <Sparkles size={20} strokeWidth={2.5} />
            </div>
            Hummanize
          </Link>
          <nav className="header-nav">
            <Link href="/#how-it-works">How it Works</Link>
            <Link href="/#features">Features</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/ai-humanizer" className="action-btn action-btn-primary" style={{padding:'0.4rem 1rem', fontSize:'0.875rem'}}>Try Free</Link>
          </nav>
        </header>

        <main className="blog-main">
          <div className="blog-container">
            <Link href="/" className="back-link">
              <ChevronLeft size={16} /> Back to Home
            </Link>

            <article className="blog-post" itemScope itemType="https://schema.org/Article">
              <header className="blog-header">
                <h1 itemProp="headline">{post.title}</h1>
                <div className="blog-meta">
                  <span className="meta-item"><Calendar size={14} /> <time itemProp="datePublished" dateTime={post.date}>{post.date}</time></span>
                  <span className="meta-item"><User size={14} /> <span itemProp="author">{post.author}</span></span>
                  <span className="meta-item"><Clock size={14} /> {post.readTime}</span>
                </div>
              </header>

              <div 
                className="blog-content seo-article" 
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="related-posts">
                <h2 className="related-title">Related Articles</h2>
                <div className="related-grid">
                  {relatedPosts.map(([slug, relPost]) => (
                    <Link key={slug} href={`/blog/${slug}`} className="related-card">
                      <h3>{relPost.title}</h3>
                      <p>{relPost.metaDesc.slice(0, 100)}...</p>
                      <span className="related-meta">{relPost.readTime} · {relPost.date}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <div className="cta-banner">
              <h3>Ready to Humanize Your Content?</h3>
              <p>Bypass AI detectors instantly with our advanced text humanizer tool.</p>
              <Link href="/" className="action-btn action-btn-primary cta-btn">
                <Sparkles size={18} />
                Try Hummanize for Free
              </Link>
            </div>
          </div>
        </main>
        
        {/* SEO Mega Footer */}
        <footer className="mega-footer">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Tools</h4>
              <ul>
                <li><Link href="/ai-detector">Free AI Detector</Link></li>
                <li><Link href="/ai-humanizer">AI Text Humanizer</Link></li>
                <li><Link href="/chatgpt-detector">ChatGPT Detector</Link></li>
                <li><Link href="/plagiarism-checker">AI Plagiarism Checker</Link></li>
                <li><Link href="/bypass-copyleaks">Bypass Copyleaks</Link></li>
                <li><Link href="/humanize-chatgpt-text">Humanize ChatGPT Text</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Use Cases</h4>
              <ul>
                <li><Link href="/ai-detector-for-students">AI Detector for Students</Link></li>
                <li><Link href="/seo-ai-humanizer">SEO AI Humanizer</Link></li>
                <li><Link href="/turnitin-ai-checker">Turnitin AI Checker</Link></li>
                <li><Link href="/gptzero-alternative">GPTZero Alternative</Link></li>
                <li><Link href="/free-ai-humanizer">Free AI Humanizer</Link></li>
                <li><Link href="/ai-humanizer-for-essays">Essay AI Humanizer</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Blog & Guides</h4>
              <ul>
                <li><Link href="/blog/how-ai-detectors-work">How Do AI Detectors Work?</Link></li>
                <li><Link href="/blog/can-turnitin-detect-chatgpt">Can Turnitin Detect ChatGPT?</Link></li>
                <li><Link href="/blog/best-ai-humanizer-for-bloggers">Best AI Humanizer for Bloggers</Link></li>
                <li><Link href="/blog/gptzero-vs-originality-ai">GPTZero vs Originality AI</Link></li>
                <li><Link href="/blog/how-to-bypass-ai-detection-free">How to Bypass AI Detection Free</Link></li>
                <li><Link href="/blog/undetectable-ai-essay-writer">Undetectable AI Essays</Link></li>
              </ul>
            </div>
            <div className="footer-col brand-col">
              <div className="logo-icon small-icon">
                <Sparkles size={14} strokeWidth={2.5} />
              </div>
              <span className="brand-name">Hummanize</span>
              <p>The #1 free AI detector and AI humanizer. Trusted by students, writers, and SEO professionals worldwide.</p>
              <p className="copyright">&copy; {new Date().getFullYear()} Hummanize Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}


