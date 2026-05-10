<div align="center">

<img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
<img src="https://img.shields.io/badge/Claude_Sonnet-4.6-8b5cf6?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude" />
<img src="https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" alt="License" />

<br/><br/>

```
  ██╗  ██╗██╗   ██╗███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██╗███████╗███████╗
  ██║  ██║██║   ██║████╗ ████║████╗ ████║██╔══██╗████╗  ██║██║╚══███╔╝██╔════╝
  ███████║██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ███╔╝ █████╗  
  ██╔══██║██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║ ███╔╝  ██╔══╝  
  ██║  ██║╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██║███████╗███████╗
  ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝
```

### 🕵️ The #1 Free AI Detector & Ghost Mode Humanizer

**Detect AI-generated content and bypass AI detectors instantly.**  
Powered by Claude Sonnet 4.6 with 2-pass Ghost Mode reasoning — outperforming Grammarly, QuillBot & HumanizeAI.pro.

[🚀 Live Demo](https://hummanize.ai) · [📖 Blog](https://hummanize.ai/blog) · [🐛 Report Bug](https://github.com/Bishek-lpu/Hummanize/issues) · [✨ Request Feature](https://github.com/Bishek-lpu/Hummanize/issues)

</div>

---

## 🌟 Why Hummanize?

| Feature | Hummanize | Grammarly | QuillBot | HumanizeAI.pro |
|---|:---:|:---:|:---:|:---:|
| 🆓 Completely Free | ✅ | ❌ Paid | ❌ Freemium | ❌ Freemium |
| 🔍 AI Detection Score | ✅ | ❌ | ❌ | ✅ |
| 🕵️ Ghost Mode (2-pass) | ✅ | ❌ | ❌ | ❌ |
| 📊 Sentence-level risk | ✅ | ❌ | ❌ | ❌ |
| 🧩 AI Pattern Tags | ✅ | ❌ | ❌ | ❌ |
| 🎯 Bypasses Turnitin | ✅ | ⚠️ Partial | ⚠️ Partial | ✅ |
| 🎯 Bypasses GPTZero | ✅ | ❌ | ✅ | ✅ |
| 🎯 Bypasses Originality.ai | ✅ | ❌ | ⚠️ Partial | ⚠️ Partial |
| 📝 Article Schema (SEO) | ✅ | ❌ | ❌ | ❌ |
| ⚡ SSG Architecture | ✅ | ❌ | ❌ | ❌ |
| 🔑 No Sign-up Required | ✅ | ❌ | ❌ | ❌ |

---

## ⚙️ Core Features

### 🕵️ Ghost Mode AI Humanizer
Our flagship feature uses a **2-pass pipeline** powered by Claude's Adaptive Thinking:

```
Input Text
    │
    ▼
┌──────────────────────────────────────────────────┐
│  PASS 1 — Ghost Analysis (Adaptive Thinking)     │
│  Claude reasons silently about AI fingerprints:  │
│  • Predictable word patterns                     │
│  • Uniform sentence lengths (low burstiness)     │
│  • AI clichés: "delve", "moreover", "seamlessly" │
│  • Passive voice overuse                         │
│  OUTPUT: Surgical rewrite strategy JSON          │
└──────────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────────────────┐
│  PASS 2 — Surgical Ghost Rewrite                 │
│  Applies the strategy with strict rules:         │
│  ✓ Varied burstiness (3–35 word sentences)       │
│  ✓ Natural contractions & colloquialisms         │
│  ✓ First-person perspective and em-dashes        │
│  ✓ Conjunctions to start sentences               │
│  ✗ Zero AI clichés allowed                       │
└──────────────────────────────────────────────────┘
    │
    ▼
🟢 100% Undetectable Human Output
```

### 🔍 Forensic AI Detector
- **Perplexity score** — measures word choice predictability
- **Burstiness score** — measures sentence length variance
- **Sentence-level risk** — highlights which sentences are most AI-like (High / Medium / Low)
- **AI Pattern Tags** — names the exact clichés and patterns detected

### 📈 Programmatic SEO Engine
- **12 SSG keyword pages** — `/ai-detector`, `/ai-humanizer`, `/bypass-copyleaks`, etc.
- **7 SEO blog articles** — targeting high-volume queries like "bypass AI detection free"
- **FAQPage JSON-LD schema** — rich snippets in Google SERP
- **Article schema** on every blog post — Google News eligibility
- **Auto-generated sitemap.xml** and **robots.txt**

---

## 🏗️ Architecture

```
hummanize/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (SSG)
│   │   ├── layout.tsx            # Root layout + global OG metadata
│   │   ├── globals.css           # Design system (CSS variables + all components)
│   │   ├── sitemap.ts            # Auto-generated XML sitemap
│   │   ├── robots.ts             # robots.txt
│   │   ├── [tool]/
│   │   │   └── page.tsx          # 12 programmatic SEO pages (SSG)
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # 7 blog articles (SSG) + Article schema
│   │   ├── data/
│   │   │   ├── seo.ts            # SEO page metadata + keywords
│   │   │   └── blog.ts           # Blog content store
│   │   └── api/
│   │       └── process/
│   │           └── route.ts      # 🕵️ Ghost Mode API (Claude Sonnet 4.6)
│   └── components/
│       └── HomeClient.tsx        # Main app UI (tabs, detection, humanizer)
├── public/
├── .env.local                    # API keys (never committed)
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17+ 
- An **Anthropic API key** — [get one here](https://console.anthropic.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Bishek-lpu/Hummanize.git
cd Hummanize
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app will hot-reload as you edit.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🌐 Deployment (Vercel — Recommended)

1. Push this repo to GitHub ✅ *(already done)*
2. Go to [vercel.com](https://vercel.com) → **Import Project** → select this repo
3. Add the following **Environment Variables** in Vercel dashboard:

| Variable | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.com` |

4. Click **Deploy** — Vercel auto-detects Next.js and handles everything.

> [!IMPORTANT]
> Never commit `.env.local` to Git. It is already listed in `.gitignore`.

---

## 🎯 Target SEO Keywords

| Page | Target Keyword | Intent |
|---|---|---|
| `/ai-humanizer` | AI humanizer | Commercial |
| `/ai-detector` | free AI detector | Transactional |
| `/chatgpt-detector` | ChatGPT detector | Commercial |
| `/bypass-copyleaks` | bypass Copyleaks | Transactional |
| `/turnitin-ai-checker` | Turnitin AI checker | Commercial |
| `/gptzero-alternative` | GPTZero alternative | Navigational |
| `/free-ai-humanizer` | free AI humanizer no sign-up | Transactional |
| `/humanize-chatgpt-text` | humanize ChatGPT text | Commercial |
| `/ai-humanizer-for-essays` | AI humanizer for essays | Commercial |

---

## 🛡️ API Reference

### `POST /api/process`

**Detect AI Content:**
```json
{
  "action": "detect",
  "text": "Your text to analyze..."
}
```
**Response:**
```json
{
  "aiProbability": 87,
  "analysis": "This text shows high perplexity uniformity...",
  "detectedPatterns": ["overuse of 'moreover'", "uniform sentence length"],
  "sentences": [
    { "text": "Furthermore, it is worth noting that...", "risk": "high" },
    { "text": "I tried it last week.", "risk": "low" }
  ]
}
```

**Humanize (Ghost Mode):**
```json
{
  "action": "humanize",
  "text": "Your AI-generated text to humanize..."
}
```
**Response:**
```json
{
  "humanizedText": "Surgically rewritten, undetectable output...",
  "meta": {
    "fingerprintsFound": 6,
    "toneTarget": "confident professional blogger",
    "inputLength": 842,
    "outputLength": 891
  }
}
```

**Limits:** Max input = 15,000 characters. Returns `HTTP 413` if exceeded.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Made with ❤️ by [Bishek](https://github.com/Bishek-lpu)

⭐ **Star this repo if Hummanize helped you!** ⭐

</div>
