import React, { useState } from 'react';

// =================== ARTICLE DATA ===================
export const articlesData = [
  {
    slug: 'crafting-design-system',
    date: 'September 5, 2024',
    title: 'Crafting a design system for a multiplanetary future',
    excerpt: 'Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.',
    body: [
      'Most companies try to stay ahead of the curve when it comes to visual design, but for Planetaria we needed to create a brand that would still inspire us 100 years from now when humanity has spread across our entire solar system.',
      'I was recently tasked with leading the development of our new design system, and through that process, I realized the importance of building systems that can adapt over time. We needed something that would work just as well on Mars as it does on Earth.',
      'The first challenge was color. How do you design a color system that works under the harsh red tones of Martian sunlight? We consulted with atmospheric scientists and learned that the human eye adapts remarkably fast to shifts in ambient color temperature. This gave us confidence that our earth-based color palette would largely translate, but we still built in a dynamic theming layer.',
      'Typography was another interesting challenge. In reduced gravity environments, people tend to hold devices at slightly different distances. We developed a fluid type scale that adjusts not just to viewport size, but to input from environmental sensors about gravitational context.',
      'Spacing was perhaps the most surprising area of innovation. Traditional design systems use 4px or 8px base units. We found that in microgravity environments where UI elements float slightly, a 6px base unit with optical compensation provided the most visually stable layouts.',
      'Component architecture was where we spent the most time. Every component needed to work across three interaction paradigms: touch (smartphones), pointer (desktop), and gesture (AR headsets used in EVA scenarios). We built a universal interaction layer that normalizes events from all three input types.',
      'The design token system we built is entirely context-aware. It doesn\'t just switch between light and dark mode — it adapts to atmospheric conditions, time of day on whatever planet you\'re on, and even the stress level of the user as measured by their suit\'s biometric sensors.',
      'Looking back, the most valuable decision we made was to invest heavily in documentation. Every token, every component, every pattern is extensively documented with examples from both terrestrial and extraterrestrial contexts. This has proven invaluable for onboarding new designers who join from companies that only design for Earth.',
    ],
  },
  {
    slug: 'introducing-animaginary',
    date: 'September 2, 2024',
    title: 'Introducing Animaginary: High performance web animations',
    excerpt: 'When you\'re building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.',
    body: [
      'When you\'re building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.',
      'That\'s why we built Animaginary — a high-performance animation library written entirely in optimized WebAssembly. It compiles directly from Rust, giving us the safety guarantees and performance characteristics we need while still running in any modern browser.',
      'The key innovation in Animaginary is our physics engine. Unlike traditional animation libraries that use easing functions to approximate physical motion, Animaginary runs a full rigid-body physics simulation at 120fps. This means that when elements collide, bounce, or spring, they do so with physically accurate behavior.',
      'We\'ve also developed a novel approach to GPU utilization. Most web animation libraries batch operations at the JavaScript level and then hand them off to the compositor. Animaginary intercepts this process and uses WebGPU (with WebGL fallback) to run particle simulations and complex mesh deformations directly on the graphics card.',
      'Performance benchmarks show Animaginary handling 10,000 simultaneous animated elements while maintaining a locked 60fps on mid-range hardware. On high-refresh displays, it can push 120fps with up to 5,000 elements. This is roughly 20x the performance of the leading alternative library.',
      'The API was designed to be declarative and composable. Animations are defined as data structures that can be combined, layered, and sequenced without imperative code. This makes it trivial to create complex choreographed animations that would require hundreds of lines of code in other libraries.',
      'We\'re planning to open-source Animaginary at the end of this quarter. We believe that the web deserves better animation tools, and we\'re excited to share what we\'ve built with the community. In the meantime, you can see it in action right here on the Planetaria website.',
    ],
  },
  {
    slug: 'rewriting-cosmos-kernel',
    date: 'July 14, 2024',
    title: 'Rewriting the cosmOS kernel in Rust',
    excerpt: 'When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language with a great ecosystem, but I find that for systems programming tasks Rust really shines.',
    body: [
      'When we released the first version of cosmOS last year, it was written in Go. Go is a wonderful programming language with a great ecosystem, but I find that for systems programming tasks Rust really shines.',
      'The decision to rewrite cosmOS in Rust wasn\'t taken lightly. We had a functioning system, a team that was proficient in Go, and a product roadmap full of features waiting to be built. But the technical debt was accumulating faster than we could address it.',
      'The primary motivation was memory safety. In a spacecraft operating system, a segfault isn\'t just an inconvenience — it could be catastrophic. Go\'s garbage collector, while excellent for most applications, introduced unpredictable pause times that were unacceptable for real-time trajectory calculations.',
      'Rust\'s ownership model eliminated an entire class of bugs that we\'d been fighting in the Go codebase. Race conditions that had taken weeks to track down simply couldn\'t exist in Rust. The borrow checker, while initially frustrating for the team, quickly became our most trusted ally.',
      'Performance improvements exceeded our expectations. The Rust kernel boots in 340 milliseconds, compared to 2.1 seconds for the Go version. Memory usage dropped by 67%, which is critical when you\'re running on radiation-hardened processors with limited RAM.',
      'The most challenging part of the rewrite was the real-time scheduler. cosmOS needs to juggle life support systems, navigation, communications, and user-facing applications simultaneously. In Go, we used goroutines extensively. In Rust, we built a custom async executor that provides deterministic scheduling guarantees.',
      'We also rewrote the driver subsystem using Rust\'s trait system. Each hardware driver now implements a common trait hierarchy, which makes it trivial to swap out components. This has been particularly valuable as we iterate on the shuttle hardware design.',
      'The rewrite took six months and involved three full-time engineers. In retrospect, it was one of the best technical decisions we\'ve made. The system is faster, safer, and significantly easier to reason about. If you\'re considering a similar rewrite for a safety-critical system, I\'d be happy to share more of our experience.',
    ],
  },
  {
    slug: 'longest-prefix-matching',
    date: 'April 22, 2024',
    title: 'Using longest-prefix matching for geocoding',
    excerpt: 'I recently worked on a geocoding project where I needed to figure out how to quickly and accurately match addresses to geographic coordinates. Longest-prefix matching turned out to be the key.',
    body: [
      'I recently worked on a geocoding project where I needed to figure out how to quickly and accurately match addresses to geographic coordinates. Longest-prefix matching turned out to be the key to solving this problem efficiently.',
      'Traditional geocoding approaches rely on parsing addresses into components (street number, street name, city, etc.) and then searching a database for matches. This works reasonably well for well-formatted addresses, but falls apart when dealing with real-world input that\'s often messy, abbreviated, or incomplete.',
      'Longest-prefix matching takes a different approach. Instead of parsing, we normalize the input and then search for the longest prefix in our address trie that matches. This naturally handles partial addresses and typos in a way that component-based parsing cannot.',
      'The data structure at the heart of our system is a compressed trie (also known as a radix tree). Each edge in the trie represents a segment of an address, and each leaf node contains the geographic coordinates. The trie is built from our address database during an offline indexing step.',
      'One of the key optimizations we made was to use a technique called "path compression." Instead of storing each character in a separate node, we collapse chains of single-child nodes into a single edge. This reduced the memory footprint of our trie by 73% and improved query time by about 4x.',
      'We also implemented fuzzy matching at each level of the trie using a modified Levenshtein distance algorithm. This allows the system to tolerate up to two character errors per address component while still returning accurate results.',
      'The final system can geocode approximately 50,000 addresses per second on a single core, with an accuracy rate of 98.7% on our test dataset. This is a significant improvement over the rule-based system it replaced, which managed only 2,000 addresses per second at 94.2% accuracy.',
      'If you\'re working on a similar problem, I highly recommend considering trie-based approaches. The initial investment in building the data structure pays for itself many times over in query performance and accuracy.',
    ],
  },
  {
    slug: 'building-distributed-systems',
    date: 'February 8, 2024',
    title: 'Building distributed systems the right way',
    excerpt: 'After years of building and maintaining distributed systems at scale, I\'ve learned that the hardest problems aren\'t the technical ones — they\'re the organizational and communication challenges that unfold.',
    body: [
      'After years of building and maintaining distributed systems at scale, I\'ve learned that the hardest problems aren\'t the technical ones — they\'re the organizational and communication challenges that emerge as systems grow.',
      'The most common mistake I see teams make is reaching for microservices too early. A well-structured monolith can take you surprisingly far, and the operational complexity of a distributed system is non-trivial. Before you split your application into services, make sure you understand the boundaries of your domain.',
      'When you do distribute, start with the data. The single most important decision in distributed systems design is how you partition and replicate your data. Get this wrong and no amount of clever application logic will save you.',
      'We use an event-sourcing architecture at Planetaria, which has served us incredibly well. Every state change is captured as an immutable event, and the current state is derived by replaying those events. This gives us a complete audit trail and makes it trivial to reason about system behavior.',
      'Observability is not optional. In a distributed system, you will have failures. The question is whether you can detect and diagnose them quickly. We invest heavily in structured logging, distributed tracing, and metrics. Every service emits traces in OpenTelemetry format, and we use them not just for debugging but for capacity planning.',
      'Testing distributed systems requires a fundamentally different approach than testing monolithic applications. We run chaos engineering experiments continuously in our staging environment, using tools like our custom-built fault injector that can simulate network partitions, clock skew, and disk failures.',
      'Consistency is a spectrum, not a binary choice. Different parts of your system will have different consistency requirements. User-facing read operations might tolerate eventual consistency, while financial transactions require strong consistency. Design your system to support both.',
      'The most valuable lesson I\'ve learned is to keep things as simple as possible. Every additional service, queue, and database is another thing that can fail. Complexity is the enemy of reliability, and in distributed systems, reliability is everything.',
    ],
  },
];

// Social icons
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function MailOutlineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

// =================== ARTICLE DETAIL PAGE ===================
export function ArticleDetailPage({ slug, onBack }) {
  const article = articlesData.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="page-content">
        <div className="container-lg">
          <div className="article-detail-page">
            <h1 className="article-detail-title">Article not found</h1>
            <button className="article-back-btn" onClick={onBack}>
              <BackArrowIcon /> Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="article-detail-page">
          {/* Back Button */}
          <button className="article-back-btn" onClick={onBack}>
            <BackArrowIcon />
            <span>Go back</span>
          </button>

          {/* Article Header */}
          <header className="article-detail-header">
            <time className="article-detail-date">{article.date}</time>
            <h1 className="article-detail-title">{article.title}</h1>
          </header>

          {/* Article Divider */}
          <div className="article-detail-divider" />

          {/* Article Body */}
          <div className="article-detail-body">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Article Footer */}
          <div className="article-detail-footer">
            <div className="article-detail-divider" />
            <div className="article-detail-nav">
              <button className="article-back-btn" onClick={onBack}>
                <BackArrowIcon />
                <span>Back to all articles</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== HOME PAGE ===================
export function HomePage({ onNavigate, onReadArticle }) {
  const articles = articlesData.slice(0, 3);

  const workExperience = [
    { company: 'Planetaria', role: 'CEO', date: '2019 — Present', logo: '🪐' },
    { company: 'Airbnb', role: 'Product Designer', date: '2014 — 2019', logo: '🏠' },
    { company: 'Facebook', role: 'iOS Software Engineer', date: '2011 — 2014', logo: '📘' },
    { company: 'Starbucks', role: 'Shift Supervisor', date: '2008 — 2011', logo: '☕' },
  ];

  const photos = [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', rotation: '-2deg' },
    { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop', rotation: '2deg' },
    { src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', rotation: '-1.5deg' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', rotation: '1.5deg' },
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop', rotation: '-2.5deg' },
  ];

  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="home-page">
          {/* Hero */}
          <div className="hero-section">
            <div className="hero-avatar">
              <img src="/avatar.png" alt="Spencer Sharp" />
            </div>
            <h1 className="hero-title">Software designer,test founder, and amateur astronaut.</h1>
            <p className="hero-description">
              I'm Spencer, a software designer and entrepreneur based in New York City. I'm the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms.
            </p>
            <div className="hero-socials">
              <a href="#x" className="social-link" aria-label="Follow on X"><XIcon /></a>
              <a href="#instagram" className="social-link" aria-label="Follow on Instagram"><InstagramIcon /></a>
              <a href="#github" className="social-link" aria-label="Follow on GitHub"><GitHubIcon /></a>
              <a href="#linkedin" className="social-link" aria-label="Follow on LinkedIn"><LinkedInIcon /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Photos Strip */}
      <div className="photos-strip">
        <div className="photos-strip-inner">
          {photos.map((photo, i) => (
            <div key={i} className="photo-item" style={{ '--rotation': photo.rotation }}>
              <img src={photo.src} alt={`Life moment ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="container-lg">
        {/* Articles + Sidebar Grid */}
        <div className="home-grid">
          <div className="articles-feed">
            {articles.map((article, i) => (
              <article key={i} className="article-card" onClick={() => onReadArticle(article.slug)} style={{ cursor: 'pointer' }}>
                {i < articles.length - 1 && <div className="article-card-line" />}
                <span className="article-date article-date-mobile">{article.date}</span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <span className="article-read-more">
                  Read article <ArrowIcon />
                </span>
              </article>
            ))}
          </div>

          <aside className="sidebar">
            {/* Newsletter */}
            <div className="newsletter-box">
              <h3 className="newsletter-title">
                <MailOutlineIcon />
                Stay up to date
              </h3>
              <p className="newsletter-desc">Get notified when I publish something new, and unsubscribe at any time.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Email address" className="newsletter-input" aria-label="Email address" />
                <button type="submit" className="newsletter-btn">Join</button>
              </form>
            </div>

            {/* Work */}
            <div className="work-box">
              <h3 className="work-title">
                <BriefcaseIcon />
                Work
              </h3>
              <div className="work-list">
                {workExperience.map((job, i) => (
                  <div key={i} className="work-item">
                    <div className="work-logo">{job.logo}</div>
                    <div className="work-info">
                      <div className="work-company">{job.company}</div>
                      <div className="work-role">{job.role}</div>
                    </div>
                    <div className="work-date">{job.date}</div>
                  </div>
                ))}
              </div>
              <button className="download-cv-btn">
                <span>Download CV</span>
                <DownloadIcon />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// =================== ABOUT PAGE ===================
export function AboutPage() {
  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="about-page">
          <div className="about-grid">
            <div className="about-content">
              <h1 className="about-title">I'm Spencer Sharp. I live in New York City, where I design the future.</h1>
              <div className="about-text">
                <p>
                  I've loved making things for as long as I can remember, and wrote my first program when I was 6 years old, just two weeks after my mom brought home the brand new Macintosh LC 550 that I taught myself to type on.
                </p>
                <p>
                  The only thing I loved more than computers as a kid was space. When I was 8, I climbed the 40-foot oak tree at the back of our yard while wearing my older sister's motorcycle helmet, counted down from three, and jumped — hoping the tree was tall enough that with just a bit of momentum I'd be able to get to orbit.
                </p>
                <p>
                  I spent the next few summers indoors working on a rocket design, while I recovered from the multiple surgeries it took to fix my badly broken legs. It took nine iterations, but when I was 15 I sent my dad's Blackberry into orbit and was able to transmit a photo back down to our family computer from space.
                </p>
                <p>
                  Today, I'm the founder of Planetaria, where we're working on civilian space suits and manned shuttle kits you can assemble at home so that the next generation of kids really can make it to orbit — from the comfort of their own backyards.
                </p>
              </div>

              <div className="about-socials">
                <a href="#x" className="about-social-link"><XIcon /> Follow on X</a>
                <a href="#instagram" className="about-social-link"><InstagramIcon /> Follow on Instagram</a>
                <a href="#github" className="about-social-link"><GitHubIcon /> Follow on GitHub</a>
                <a href="#linkedin" className="about-social-link"><LinkedInIcon /> Follow on LinkedIn</a>
                <hr className="about-email-divider" />
                <a href="mailto:spencer@planetaria.tech" className="about-social-link"><MailIcon /> spencer@planetaria.tech</a>
              </div>
            </div>

            <div className="about-img-container">
              <img src="/avatar.png" alt="Spencer Sharp" className="about-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== ARTICLES PAGE ===================
export function ArticlesPage({ onReadArticle }) {
  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="articles-page">
          <h1 className="articles-title">Writing on software design, company building, and the aerospace industry.</h1>
          <div className="articles-list">
            {articlesData.map((article, i) => (
              <article
                key={i}
                className="article-list-item article-list-item-clickable"
                onClick={() => onReadArticle(article.slug)}
              >
                <div className="article-list-date">{article.date}</div>
                <div className="article-list-content">
                  <h2 className="article-list-title">{article.title}</h2>
                  <p className="article-list-excerpt">{article.excerpt}</p>
                  <span className="article-list-readmore">
                    Read article <ArrowIcon />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== PROJECTS PAGE ===================
export function ProjectsPage() {
  const projects = [
    { name: 'Planetaria', description: 'Creating technology to empower civilians to explore space on their own terms.', link: 'planetaria.tech', icon: '🪐' },
    { name: 'Animaginary', description: 'High performance web animation library, hand-written in optimized WASM.', link: 'github.com', icon: '✨' },
    { name: 'HelioStream', description: 'Real-time video streaming library, optimized for interstellar transmission.', link: 'github.com', icon: '📡' },
    { name: 'cosmOS', description: 'The operating system that powers our Planetaria space shuttles.', link: 'github.com', icon: '🚀' },
    { name: 'OpenShuttle', description: 'The schematics for the first rocket I designed that successfully made it to orbit.', link: 'github.com', icon: '🛸' },
    { name: 'StarChart', description: 'Interactive 3D star chart for planning interstellar navigation routes.', link: 'github.com', icon: '🌌' },
  ];

  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="projects-page">
          <div className="projects-header">
            <h1 className="projects-title">Things I've made trying to put my dent in the universe.</h1>
            <p className="projects-desc">
              I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={i} className="project-card">
                <div className="project-logo">{project.icon}</div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <a href="#link" className="project-link" onClick={(e) => e.preventDefault()}>
                  <LinkIcon /> {project.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== SPEAKING PAGE ===================
export function SpeakingPage() {
  const [activeVideo, setActiveVideo] = useState(null);

  const conferences = [
    {
      title: 'In space, no one can watch you Demo',
      event: 'SysConf 2024',
      cta: 'Watch video',
      videoUrl: 'https://www.youtube.com/embed/sKwgqH-bmdA'
    },
    {
      title: 'Lessons learned from our first product launch',
      event: 'Business of Startups 2023',
      cta: 'Watch video',
      videoUrl: 'https://www.youtube.com/embed/C5q0O_o80Mc'
    },
    {
      title: 'The future of civilian space travel',
      event: 'TEDx Portland 2023',
      cta: 'Watch video',
      videoUrl: 'https://www.youtube.com/embed/zRwUZBjc1zI'
    },
  ];

  const podcasts = [
    {
      title: 'Building Planetaria from the ground up',
      event: 'Encoding Design, July 2024',
      cta: 'Listen to podcast',
      videoUrl: 'https://www.youtube.com/embed/4yocNAO2nE8'
    },
    {
      title: 'How we bootstrapped our first product',
      event: 'The Startup Grind, March 2024',
      cta: 'Listen to podcast',
      videoUrl: 'https://www.youtube.com/embed/fEBw8E5G1S4'
    },
    {
      title: 'Designing for the cosmos',
      event: 'Design Weekly, January 2024',
      cta: 'Listen to podcast',
      videoUrl: 'https://www.youtube.com/embed/k_Qz7t0xMUU'
    },
  ];

  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="speaking-page">
          <h1 className="speaking-title">I've spoken at events all around the world and been interviewed for many podcasts.</h1>
          <p className="speaking-desc">
            One of my favorite ways to share my ideas is live on stage, where there's so much more communication bandwidth than there is in writing. Here are some of my favorite talks and podcast interviews.
          </p>
          <div className="speaking-sections">
            <div>
              <h2 className="speaking-section-title">Conferences</h2>
              <div className="speaking-list">
                {conferences.map((item, i) => (
                  <div key={i} className="speaking-item">
                    <h3 className="speaking-item-title">{item.title}</h3>
                    <p className="speaking-item-event">{item.event}</p>
                    <a href="#watch" className="speaking-item-link" onClick={(e) => { e.preventDefault(); setActiveVideo({ title: item.title, url: item.videoUrl }); }}>
                      {item.cta} →
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="speaking-section-title">Podcasts</h2>
              <div className="speaking-list">
                {podcasts.map((item, i) => (
                  <div key={i} className="speaking-item">
                    <h3 className="speaking-item-title">{item.title}</h3>
                    <p className="speaking-item-event">{item.event}</p>
                    <a href="#listen" className="speaking-item-link" onClick={(e) => { e.preventDefault(); setActiveVideo({ title: item.title, url: item.videoUrl }); }}>
                      {item.cta} →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <div className={`video-modal-overlay ${activeVideo ? 'open' : ''}`} onClick={() => setActiveVideo(null)}>
        <div className="video-modal-content" onClick={e => e.stopPropagation()}>
          <div className="video-modal-header">
            <h3 className="video-modal-title">{activeVideo?.title}</h3>
            <button className="video-modal-close" onClick={() => setActiveVideo(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="video-modal-body">
            {activeVideo && (
              <iframe 
                src={`${activeVideo.url}?autoplay=1`} 
                title={activeVideo.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== USES PAGE ===================
export function UsesPage() {
  const sections = [
    {
      title: 'Workstation',
      items: [
        { name: '16" MacBook Pro, M3 Max, 64GB RAM (2024)', desc: 'I was using an Intel-based 16" MacBook Pro prior to this and the difference is night and day. I\'ve never heard the fans turn on a single time, even under the incredibly heavy loads I put it through.' },
        { name: 'Apple Pro Display XDR (Standard Glass)', desc: 'The only display on the market that can compete with the quality of a reference monitor from Flanders Scientific.' },
        { name: 'Apple Magic Keyboard', desc: 'The low-profile keys are perfect for marathon coding sessions. Combined with the Touch ID sensor, it\'s become indispensable.' },
        { name: 'Herman Miller Aeron Chair', desc: 'If I\'m going to slouch in the worst posture imaginable all day, I might as well do it in an italisergonomic chair.' },
      ],
    },
    {
      title: 'Development tools',
      items: [
        { name: 'Sublime Text 4', desc: 'I know everyone uses VS Code, but Sublime Text is still the fastest editor around — and with the new Git integration, it\'s become my daily driver again.' },
        { name: 'iTerm2', desc: 'I\'m honestly not even sure what features I get with this that aren\'t just part of the macOS Terminal but it\'s what I use.' },
        { name: 'TablePlus', desc: 'Great software for working with databases. Has saved me from mass-Loss many times.' },
      ],
    },
    {
      title: 'Design',
      items: [
        { name: 'Figma', desc: 'We started using Figma as just a design tool but now it\'s become our virtual whiteboard for the entire company.' },
      ],
    },
    {
      title: 'Productivity',
      items: [
        { name: 'Alfred', desc: 'It\'s not the newest kid on the block but it\'s still the fastest. The Powerpack is worth every penny.' },
        { name: 'Reflect', desc: 'Simple and elegant end-to-end encrypted note taking app. Syncs across all devices.' },
        { name: 'Focus', desc: 'Simple, elegant app for blocking distracting websites when you need to just do the work.' },
      ],
    },
  ];

  return (
    <div className="page-content">
      <div className="container-lg">
        <div className="uses-page">
          <h1 className="uses-title">Software I use, gadgets I love, and other things I recommend.</h1>
          <p className="uses-desc">
            I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I'm being productive when I'm really just procrastinating. Here's a big list of all of my favorite stuff.
          </p>
          <div className="uses-sections">
            {sections.map((section, i) => (
              <div key={i} className="uses-section">
                <h2 className="uses-section-title">{section.title}</h2>
                <div className="uses-items">
                  {section.items.map((item, j) => (
                    <div key={j}>
                      <h3 className="uses-item-title">{item.name}</h3>
                      <p className="uses-item-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== FOOTER ===================
export function Footer({ onNavigate }) {
  const footerLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'uses', label: 'Uses' },
  ];

  return (
    <footer className="footer">
      <div className="container-lg">
        <div className="footer-inner">
          <nav className="footer-nav">
            {footerLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="footer-link"
                onClick={(e) => { e.preventDefault(); onNavigate(link.id); }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="footer-copy">© {new Date().getFullYear()} Spencer Sharp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
