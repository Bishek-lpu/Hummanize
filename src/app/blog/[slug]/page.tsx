import { Metadata } from 'next';
import { blogData } from '../../data/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Sparkles, Clock, User, Calendar } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogData[resolvedParams.slug];
  
  if (!post) {
    return { title: 'Post Not Found | Hummanize Blog' };
  }

  return {
    title: `${post.title} | Hummanize SEO Blog`,
    description: post.metaDesc,
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

  return (
    <>
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
          </nav>
        </header>

        <main className="blog-main">
          <div className="blog-container">
            <Link href="/" className="back-link">
              <ChevronLeft size={16} /> Back to Home
            </Link>

            <article className="blog-post">
              <header className="blog-header">
                <h1>{post.title}</h1>
                <div className="blog-meta">
                  <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                  <span className="meta-item"><User size={14} /> {post.author}</span>
                  <span className="meta-item"><Clock size={14} /> {post.readTime}</span>
                </div>
              </header>

              <div 
                className="blog-content seo-article" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>

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
              </ul>
            </div>
            <div className="footer-col">
              <h4>Use Cases</h4>
              <ul>
                <li><Link href="/ai-detector-for-students">AI Detector for Students</Link></li>
                <li><Link href="/seo-ai-humanizer">SEO AI Humanizer</Link></li>
                <li><Link href="/turnitin-ai-checker">Turnitin AI Checker Guide</Link></li>
                <li><Link href="/gptzero-alternative">GPTZero Alternative</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><Link href="/blog/how-ai-detectors-work">How Do AI Detectors Work?</Link></li>
                <li><Link href="/blog/can-turnitin-detect-chatgpt">Can Turnitin Detect ChatGPT?</Link></li>
                <li><Link href="/blog/best-ai-humanizer-for-bloggers">Best AI Humanizer for Bloggers</Link></li>
                <li><Link href="/blog/gptzero-vs-originality-ai">GPTZero vs Originality AI</Link></li>
              </ul>
            </div>
            <div className="footer-col brand-col">
              <div className="logo-icon small-icon">
                <Sparkles size={14} strokeWidth={2.5} />
              </div>
              <span className="brand-name">Hummanize</span>
              <p>The standard in AI content detection and natural humanization.</p>
              <p className="copyright">&copy; {new Date().getFullYear()} Hummanize Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
