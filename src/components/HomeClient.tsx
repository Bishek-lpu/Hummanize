'use client';

import { useState } from 'react';
import { ShieldAlert, Sparkles, Copy, RefreshCw, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import Link from 'next/link';

type Tab = 'detect' | 'humanize';

interface DetectionResult {
  aiProbability: number;
  analysis: string;
}

interface SeoContent {
  h1?: string;
  description?: string;
}

export default function HomeClient({ seoContent }: { seoContent?: SeoContent }) {
  const [activeTab, setActiveTab] = useState<Tab>('detect');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [humanizedText, setHumanizedText] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to process.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          action: activeTab,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      if (activeTab === 'detect') {
        setDetectionResult({
          aiProbability: data.aiProbability,
          analysis: data.analysis,
        });
        setHumanizedText('');
      } else {
        setHumanizedText(data.humanizedText);
        setDetectionResult(null);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (humanizedText) {
      navigator.clipboard.writeText(humanizedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getScoreColor = (prob: number) => {
    if (prob < 30) return 'var(--success-color)'; 
    if (prob < 70) return '#f59e0b'; 
    return 'var(--error-text)'; 
  };

  const getScoreLabel = (prob: number) => {
    if (prob < 30) return 'Likely Human';
    if (prob < 70) return 'Mixed Content';
    return 'Likely AI Generated';
  };

  // Use dynamic content or fallback to the homepage defaults
  const h1Text = seoContent?.h1 || "Free AI Detector & AI Humanizer Tool";
  const heroDescription = seoContent?.description || "Detect AI-generated content instantly and humanize ChatGPT text to bypass AI detectors naturally. The ultimate undetectable AI writer for students, bloggers, and SEO marketers.";

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

        <main>
          {/* Hero Section */}
          <section className="hero">
            <h1>
              <span className="gradient-text">{h1Text}</span>
            </h1>
            <p>{heroDescription}</p>
          </section>

          {/* App Workspace */}
          <section className="app-section">
            <div className="tabs-container">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'detect' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('detect'); setError(''); }}
                >
                  <ShieldAlert size={16} />
                  AI Detector
                </button>
                <button
                  className={`tab ${activeTab === 'humanize' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('humanize'); setError(''); }}
                >
                  <RefreshCw size={16} />
                  AI Humanizer
                </button>
              </div>
            </div>

            {error && (
              <div className="error-banner">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <div className="workspace">
              {/* Left Panel - Input */}
              <div className="panel">
                <div className="panel-header">
                  <h2 className="panel-title">Source Text</h2>
                  <span className="char-count">{inputText.length} chars</span>
                </div>
                
                <div className="text-area-wrapper">
                  <textarea
                    placeholder={activeTab === 'detect' 
                      ? "Paste your essay, article, or text here to check for AI probability..." 
                      : "Paste ChatGPT or AI-generated text here to humanize it naturally..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>

                <button 
                  className="action-btn action-btn-primary" 
                  onClick={handleProcess}
                  disabled={loading || !inputText.trim()}
                >
                  {loading ? (
                    <>
                      <div className="loader"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      {activeTab === 'detect' ? <ShieldAlert size={18} /> : <Sparkles size={18} />}
                      {activeTab === 'detect' ? 'Scan for AI Content' : 'Humanize AI Text'}
                    </>
                  )}
                </button>
              </div>

              {/* Right Panel - Output */}
              <div className="panel">
                <div className="panel-header">
                  <h2 className="panel-title">Results</h2>
                </div>

                <div className="output-area">
                  {!detectionResult && !humanizedText && !loading && (
                    <div className="placeholder-content">
                      {activeTab === 'detect' ? (
                        <ShieldAlert className="placeholder-icon" />
                      ) : (
                        <RefreshCw className="placeholder-icon" />
                      )}
                      <p>Your analysis and humanized text will appear here</p>
                    </div>
                  )}

                  {loading && (
                    <div className="placeholder-content">
                      <div className="loader loader-dark" style={{ width: '40px', height: '40px', borderWidth: '3px' }}></div>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        {activeTab === 'detect' ? 'Running advanced Turnitin & GPTZero level detection...' : 'Applying human-like burstiness to bypass detectors...'}
                      </p>
                    </div>
                  )}

                  {!loading && activeTab === 'detect' && detectionResult && (
                    <div className="result-display">
                      <div className="score-card">
                        <div 
                          className="score-circle"
                          style={{ 
                            '--score-pct': `${detectionResult.aiProbability}%`,
                            '--score-color': getScoreColor(detectionResult.aiProbability)
                          } as any}
                        >
                          {detectionResult.aiProbability}%
                        </div>
                        <div className="score-info">
                          <h3>{getScoreLabel(detectionResult.aiProbability)}</h3>
                          <p>Probability of AI generation</p>
                          <div style={{ marginTop: '0.75rem' }}>
                            <span className={`badge ${detectionResult.aiProbability > 60 ? 'badge-ai' : detectionResult.aiProbability < 40 ? 'badge-human' : 'badge-mixed'}`}>
                              {detectionResult.aiProbability > 60 ? 'High AI Risk' : detectionResult.aiProbability < 40 ? 'Human Written' : 'Mixed Signals'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="analysis-text">
                        <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-primary)', fontSize: '1rem' }}>Detailed Analysis</h4>
                        {detectionResult.analysis}
                      </div>
                    </div>
                  )}

                  {!loading && activeTab === 'humanize' && humanizedText && (
                    <div className="humanized-output">
                      <button className="copy-btn" onClick={handleCopy} title="Copy to clipboard">
                        {copied ? <CheckCircle2 size={16} color="var(--success-color)" /> : <Copy size={16} />}
                      </button>
                      <div style={{ paddingRight: '2.5rem', whiteSpace: 'pre-wrap' }}>
                        {humanizedText}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SEO Optimized Content Sections */}
          <section id="features" className="seo-content">
            <div className="seo-grid">
              <div className="seo-card">
                <ShieldAlert size={32} className="seo-icon" />
                <h3>Highly Accurate AI Content Detector</h3>
                <p>
                  Whether you're a teacher looking for an <strong>AI detector for students</strong> or a blogger checking freelance work, our advanced AI checker instantly scans text. It functions as a powerful <strong>ChatGPT detector</strong> and provides sentence-by-sentence analysis to identify robotic writing patterns.
                </p>
              </div>
              <div className="seo-card">
                <Sparkles size={32} className="seo-icon" />
                <h3>Bypass AI Detectors Naturally</h3>
                <p>
                  Need to <strong>humanize AI text</strong>? Our proprietary <strong>AI text humanizer</strong> rewrites robotic ChatGPT content into authentic, human-like text. Say goodbye to awkward phrasing. Make AI text sound human while retaining your original meaning and intent.
                </p>
              </div>
              <div className="seo-card">
                <Check size={32} className="seo-icon" />
                <h3>SEO AI Humanizer for Rankings</h3>
                <p>
                  Google prioritizes helpful, human-first content. Use our <strong>best AI humanizer for SEO</strong> to ensure your blog posts bypass AI detection tools like Originality AI and Surfer SEO checks, keeping your content safe from algorithm penalties.
                </p>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="seo-article">
            <h2>How to Humanize ChatGPT Text and Bypass Detectors</h2>
            <p>
              AI detectors look for two main things: <strong>Perplexity</strong> (predictability of words) and <strong>Burstiness</strong> (variation in sentence length). Standard AI output from GPT-4 is highly predictable. Our <strong>undetectable AI writer</strong> specifically injects human-like burstiness, conversational idioms, and varied pacing.
            </p>
            <ul>
              <li><strong>Step 1:</strong> Paste your content into the Free AI Detector to check its baseline AI probability.</li>
              <li><strong>Step 2:</strong> Switch to the AI Humanizer tab and click "Humanize AI Text".</li>
              <li><strong>Step 3:</strong> Copy the rewritten text. It is now completely undetectable and reads naturally.</li>
            </ul>
            <h3>The Best AI Humanizer Tool for Students and Writers</h3>
            <p>
              If you are searching for a <strong>Turnitin AI detector alternative</strong> or a way to ensure your essays and articles pass strict <strong>AI plagiarism detectors</strong>, Hummanize is built for you. We provide a <strong>free AI humanizer</strong> tier so you can rewrite AI text to human text instantly.
            </p>
          </section>

          {/* SEO FAQ Section */}
          <section id="faq" className="seo-content faq-section">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-grid">
              <details className="faq-item">
                <summary>What is Hummanize AI?</summary>
                <div className="faq-answer">
                  Hummanize AI is a leading online AI-to-human text converter, transforming AI-generated content into human-like, engaging text. It's ideal for various applications, ensuring content is relatable and completely free from a robotic tone.
                </div>
              </details>

              <details className="faq-item">
                <summary>How does the AI text humanizer work?</summary>
                <div className="faq-answer">
                  The tool uses advanced NLP algorithms to rewrite AI-generated content, maintaining the original meaning and context while adding a natural, human touch (burstiness and perplexity). It's explicitly designed to be SEO-friendly and to bypass AI detectors.
                </div>
              </details>

              <details className="faq-item">
                <summary>Is the AI Humanizer tool free to use?</summary>
                <div className="faq-answer">
                  Yes, our core AI Humanizer features are completely free, offering you rapid access to undetectable AI writing without any hidden charges.
                </div>
              </details>

              <details className="faq-item">
                <summary>Can it handle content in multiple languages?</summary>
                <div className="faq-answer">
                  Absolutely. The tool supports a variety of global languages, ensuring versatility in AI text conversion for international marketers and students.
                </div>
              </details>

              <details className="faq-item">
                <summary>Is registration required to use the text tool?</summary>
                <div className="faq-answer">
                  No, there's no need for registration or sign-up, allowing you to use the tool directly and save valuable time.
                </div>
              </details>

              <details className="faq-item">
                <summary>How do you ensure the confidentiality of my content?</summary>
                <div className="faq-answer">
                  We prioritize the security and confidentiality of your content. We employ stringent, enterprise-grade measures to ensure your text remains safe, private, and is never stored or used to train public models.
                </div>
              </details>

              <details className="faq-item">
                <summary>Can this tool improve the SEO of my content?</summary>
                <div className="faq-answer">
                  Yes, the tool is designed to retain essential keywords and optimize the content for SEO. By making it read naturally, it prevents Google's "Helpful Content Update" algorithms from penalizing your blog for robotic writing.
                </div>
              </details>

              <details className="faq-item">
                <summary>Is the output plagiarism-free?</summary>
                <div className="faq-answer">
                  Definitely. Our tool guarantees 100% plagiarism-free content, ensuring originality and uniqueness that easily passes Copyscape and standard plagiarism checkers.
                </div>
              </details>

              <details className="faq-item">
                <summary>Who can benefit from using this tool?</summary>
                <div className="faq-answer">
                  The tool is highly versatile and beneficial for content creators, marketers, business professionals, students, developers, PR professionals, SEO experts, researchers, bloggers, and freelance writers.
                </div>
              </details>
            </div>
          </section>

          {/* JSON-LD Schema for Google Rich Snippets */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is Hummanize AI?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Hummanize AI is a leading online AI-to-human text converter, transforming AI-generated content into human-like, engaging text. It's ideal for various applications, ensuring content is relatable and completely free from a robotic tone."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How does the AI text humanizer work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The tool uses advanced NLP algorithms to rewrite AI-generated content, maintaining the original meaning and context while adding a natural, human touch (burstiness and perplexity). It's explicitly designed to be SEO-friendly and to bypass AI detectors."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the AI Humanizer tool free to use?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, our core AI Humanizer features are completely free, offering you rapid access to undetectable AI writing without any hidden charges."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can this tool improve the SEO of my content?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, the tool is designed to retain essential keywords and optimize the content for SEO. By making it read naturally, it prevents Google's 'Helpful Content Update' algorithms from penalizing your blog for robotic writing."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Is the output plagiarism-free?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Definitely. Our tool guarantees 100% plagiarism-free content, ensuring originality and uniqueness that easily passes Copyscape and standard plagiarism checkers."
                    }
                  }
                ]
              })
            }}
          />

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
