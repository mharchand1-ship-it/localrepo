import React, { useState, useEffect } from 'react';
import './App.css';

/* ── Storage Keys ── */
const POSTS_KEY   = 'bloghub_posts';
const USERS_KEY   = 'bloghub_users_v2';
const SESSION_KEY = 'bloghub_session';

/* ── Seed Articles (Local Articles) ── */
const SEED_ARTICLES = [
  {
    id: 1, title: "1. Understanding React Server Components",
    date: "June 28, 2026", author: "Sarah Chen", tag: "React",
    excerpt: "React Server Components allow developers to build applications that span the server and client. This hybrid approach represents a massive paradigm shift. For years, developers had to choose between SSR for fast initial loads and CSR for interactive experiences. Server Components give us both — drastically reducing bundle size.",
    content: ["React Server Components allow developers to build applications that span the server and client. This hybrid approach represents a massive paradigm shift in how we think about rendering UI.","For years, React developers had to choose between Server-Side Rendering (SSR) for fast initial page loads and SEO, or Client-Side Rendering (CSR) for highly interactive user experiences. Server Components give us the best of both worlds. They execute exclusively on the server, meaning their dependencies are never sent to the client.","Imagine building a complex dashboard with a heavy markdown parsing library. Previously, every user had to download that library just to see the rendered text. With Server Components, the markdown is parsed on the server, and only the resulting lightweight HTML is streamed to the browser.","Furthermore, Server Components can directly access backend resources like databases and file systems securely, without needing an API layer in between. This simplifies data fetching and removes the classic waterfall problem.","One of the most exciting aspects is the seamless integration between Server and Client Components. You can nest Client Components inside Server Components, allowing you to add interactivity exactly where you need it.","The mental model shifts from everything runs in the browser to render on the server by default, and opt into the client only when necessary. This leads to faster page loads, smaller bundles, and a better user experience.","React Server Components also enable streaming — the server starts sending HTML before the entire page is ready. Combined with Suspense boundaries, users see content appear incrementally. It is undeniably the biggest evolution of React since the introduction of Hooks."].join("\n\n")
  },
  {
    id: 2, title: "2. The Future of Web Design: Glassmorphism",
    date: "June 25, 2026", author: "Alex Rivera", tag: "Design",
    excerpt: "Glassmorphism is a UI design trend that emphasizes translucent backgrounds with a frosted glass effect. It creates a sense of depth and hierarchy, allowing users to see what is behind a component while focusing on the content. This style gained popularity when Apple introduced it in macOS Big Sur.",
    content: ["Glassmorphism is a UI design trend that emphasizes translucent backgrounds with a frosted glass effect. It creates a sense of depth and hierarchy, allowing users to see what is behind a component while still focusing on the content in the foreground.","This design style gained massive popularity when Apple introduced it heavily in macOS Big Sur and iOS. It relies on a few core CSS properties: a semi-transparent background color, a significant background blur using backdrop-filter, and a subtle border to define the edge.","The beauty of Glassmorphism lies in its ability to make interfaces feel lightweight and modern. Glass panels allow colorful backgrounds to shine through, adapting dynamically as the user scrolls.","However, accessibility is a crucial factor. Text placed on top of frosted glass must maintain a high contrast ratio. Designers often use vibrant gradients in the background to ensure visibility and aesthetic appeal.","To implement Glassmorphism effectively, start with a vibrant gradient background. Create your card with white background at 10-20% opacity, apply backdrop-filter blur of 10-20 pixels, and add a thin border.","Performance is another consideration. The backdrop-filter property can be computationally expensive on lower-end devices. Use it sparingly and test across different hardware.","Despite these challenges, Glassmorphism remains one of the most visually appealing trends in modern web development. When done right, it elevates a standard page into a premium, app-like experience."].join("\n\n")
  },
  {
    id: 3, title: "3. Why Shadcn UI is Changing the Game",
    date: "June 22, 2026", author: "Jordan Park", tag: "UI Library",
    excerpt: "Shadcn UI provides beautifully designed components that you can copy and paste into your apps. Unlike traditional libraries, you have full ownership over the code. This changes how developers approach design systems — no more lock-in, no fighting against abstractions.",
    content: ["Shadcn UI provides beautifully designed components that you can copy and paste into your apps. Unlike traditional component libraries, you have full ownership and control over the code.","Traditionally, using a library like Material UI or Ant Design meant buying into their specific ecosystem. Fighting complex theme overrides led to frustrating experiences and bloated codebases.","Shadcn UI flipped the script. It is not an npm package. Instead, a CLI copies raw React and Tailwind CSS source code directly into your project. You own the code — open it and change it directly.","By combining Radix UI accessibility primitives with Tailwind CSS, Shadcn created the ultimate starting point for modern web applications. Small teams can build stunning, accessible interfaces quickly.","The component library covers buttons, cards, dialogs, dropdowns, forms, tables, tabs, tooltips, and more. Each component follows WAI-ARIA guidelines, ensuring accessibility for all users.","The theming system uses CSS variables for design tokens, making it trivially easy to create light and dark themes. You simply update the CSS variables and every component updates automatically.","The community around Shadcn has exploded. Developers share custom components, themes, and templates, creating a rich ecosystem. It is the perfect balance between speed and customization."].join("\n\n")
  },
  {
    id: 4, title: "4. Mastering State Management in React",
    date: "June 18, 2026", author: "Maya Johnson", tag: "React",
    excerpt: "State management can be complex in large React applications. From Context API to Zustand and Redux Toolkit, learn how to pick the right tool. The ecosystem has matured significantly, giving developers lightweight solutions much easier to work with than boilerplate-heavy approaches of the past.",
    content: ["State management can be complex in large React applications. From simple React Context and useReducer, to powerful libraries like Redux Toolkit and Zustand, there are many ways to handle state.","In the early days of React, Redux was the undisputed king. It provided a single source of truth and predictable state updates. However, it introduced a lot of boilerplate code overwhelming for smaller apps.","Today, the ecosystem has matured. For local state, useState and useReducer are sufficient. React Context shares state across a few components without external dependencies.","Server state management has been revolutionized by React Query and SWR. These libraries handle data fetching, caching, synchronization, and background updates automatically.","The key insight is separating state into categories: UI state (modals, tabs), form state (inputs, validation), and server state (API data). Each category has tools optimized for its patterns.","For UI state, useState or useReducer works perfectly. For form state, React Hook Form provides excellent abstractions. For server state, TanStack Query handles caching, refetching, and optimistic updates.","By cleanly separating UI state from server state, your React applications become much easier to maintain, debug, and scale. The days of putting everything in a single Redux store are behind us."].join("\n\n")
  }
];

/* ── LocalStorage Helpers ── */
function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getPosts()   { try { return JSON.parse(localStorage.getItem(POSTS_KEY))   || []; } catch { return []; } }
function savePosts(p) { localStorage.setItem(POSTS_KEY, JSON.stringify(p)); }
function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; } }
function saveSession(s) { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); }

/* ══════════════════════════════════════════
   ── Login Page ──
══════════════════════════════════════════ */
function LoginPage({ onLogin, onGoRegister, onCancel }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const found = users.find(u => u.username === form.username.trim() && u.password === form.password);
    if (found) {
      onLogin(found);
    } else {
      setError('Galat username ya password. Dobara try karein.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="logo-dot-lg">●</span>
          <h1 className="auth-title">BlogHub mein Login karein</h1>
          <p className="auth-sub">Apne account se sign in karein</p>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {error && <div className="alert-error">⚠️ {error}</div>}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" name="username" value={form.username} onChange={handle} placeholder="Username daalen..." />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="pass-wrap">
              <input className="form-input" name="password" type={showPass ? 'text' : 'password'}
                value={form.password} onChange={handle} placeholder="Password daalen..." />
              <button type="button" className="show-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary auth-btn">Login karein →</button>
        </form>
        <p className="auth-switch">
          Account nahi hai?{' '}
          <button className="link-btn" onClick={onGoRegister}>Register karein</button>
        </p>
        <button className="btn-outline w-full mt-4" onClick={onCancel}>Bina login ke wapis jayein</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── Register Page ──
══════════════════════════════════════════ */
function RegisterPage({ onRegister, onGoLogin, onCancel }) {
  const [form, setForm] = useState({ name: '', username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.username.trim() || !form.password) {
      setError('Tamam fields bharein.'); return;
    }
    if (form.password.length < 6) {
      setError('Password kam az kam 6 characters ka hona chahiye.'); return;
    }
    if (form.password !== form.confirm) {
      setError('Dono passwords match nahi karte.'); return;
    }
    const users = getUsers();
    if (users.find(u => u.username === form.username.trim())) {
      setError('Yeh username pehle se registered hai. Koi aur choose karein.'); return;
    }
    const newUser = { username: form.username.trim(), password: form.password, name: form.name.trim() };
    const updated = [...users, newUser];
    saveUsers(updated);
    onRegister(newUser);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="logo-dot-lg">●</span>
          <h1 className="auth-title">Naya Account Banayein</h1>
          <p className="auth-sub">Apna username aur password set karein</p>
        </div>
        <form className="auth-form" onSubmit={submit}>
          {error && <div className="alert-error">⚠️ {error}</div>}
          <div className="form-group">
            <label className="form-label">Pura Naam</label>
            <input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Apna naam daalen..." />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" name="username" value={form.username} onChange={handle} placeholder="Username choose karein..." />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="pass-wrap">
              <input className="form-input" name="password" type={showPass ? 'text' : 'password'}
                value={form.password} onChange={handle} placeholder="Password set karein (min 6 chars)..." />
              <button type="button" className="show-pass" onClick={() => setShowPass(!showPass)}>
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password Confirm karein</label>
            <input className="form-input" name="confirm" type="password"
              value={form.confirm} onChange={handle} placeholder="Password dobara daalen..." />
          </div>
          <button type="submit" className="btn-primary auth-btn">Account Banayein →</button>
        </form>
        <p className="auth-switch">
          Pehle se account hai?{' '}
          <button className="link-btn" onClick={onGoLogin}>Login karein</button>
        </p>
        <button className="btn-outline w-full mt-4" onClick={onCancel}>Bina register ke wapis jayein</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── Navbar ──
══════════════════════════════════════════ */
function Navbar({ session, activePage, onApi, onHome, onGuide, onWeather, onCreate, onLogin, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onApi(); }}>
          <span className="logo-dot">●</span> BlogHub
        </a>
        <div className="nav-links">
          <a href="#" className={`nav-link ${activePage === 'weather' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onWeather(); }}>Weather</a>
          <a href="#" className={`nav-link ${activePage === 'guide' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onGuide(); }}>API Guide</a>
          <a href="#" className={`nav-link ${activePage === 'api' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onApi(); }}>API Posts</a>
          <a href="#" className={`nav-link ${activePage === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); onHome(); }}>Local Articles</a>
          {session ? (
            <>
              <span className="logged-user">👤 {session.name}</span>
              <button className="btn-primary nav-cta" onClick={onCreate}>+ Write Article</button>
              <button className="btn-outline nav-cta" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button className="btn-primary nav-cta" onClick={onLogin}>Login / Register</button>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════
   ── API Guide Page ──
══════════════════════════════════════════ */
function GuidePage() {
  const [outputs, setOutputs] = useState({});
  const [loading, setLoading] = useState({});

  const runRequest = async (key, fetchPromise) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      const res = await fetchPromise;
      const text = await res.text();
      let json;
      try { json = JSON.parse(text); } catch { json = text || "Success (Empty Response)"; }
      setOutputs(prev => ({ ...prev, [key]: JSON.stringify(json, null, 2) }));
    } catch (err) {
      setOutputs(prev => ({ ...prev, [key]: "Error: " + err.message }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const sections = [
    {
      key: 'get', title: 'Getting a resource',
      code: "fetch('https://jsonplaceholder.typicode.com/posts/1')",
      action: () => runRequest('get', fetch('https://jsonplaceholder.typicode.com/posts/1'))
    },
    {
      key: 'list', title: 'Listing all resources',
      code: "fetch('https://jsonplaceholder.typicode.com/posts')",
      action: () => runRequest('list', fetch('https://jsonplaceholder.typicode.com/posts'))
    },
    {
      key: 'create', title: 'Creating a resource',
      code: `fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})`,
      action: () => runRequest('create', fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }))
    },
    {
      key: 'update', title: 'Updating a resource',
      code: `fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({ id: 1, title: 'foo', body: 'bar', userId: 1 }),
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})`,
      action: () => runRequest('update', fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({ id: 1, title: 'foo', body: 'bar', userId: 1 }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }))
    },
    {
      key: 'patch', title: 'Patching a resource',
      code: `fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  body: JSON.stringify({ title: 'foo' }),
  headers: { 'Content-type': 'application/json; charset=UTF-8' },
})`,
      action: () => runRequest('patch', fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PATCH',
        body: JSON.stringify({ title: 'foo' }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }))
    },
    {
      key: 'delete', title: 'Deleting a resource',
      code: `fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE',
})`,
      action: () => runRequest('delete', fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' }))
    },
    {
      key: 'filter', title: 'Filtering resources',
      code: "fetch('https://jsonplaceholder.typicode.com/posts?userId=1')",
      action: () => runRequest('filter', fetch('https://jsonplaceholder.typicode.com/posts?userId=1'))
    },
    {
      key: 'nested', title: 'Listing nested resources',
      code: "fetch('https://jsonplaceholder.typicode.com/posts/1/comments')",
      action: () => runRequest('nested', fetch('https://jsonplaceholder.typicode.com/posts/1/comments'))
    }
  ];

  return (
    <div className="page-wrapper">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">API Testing Guide</h1>
          <p className="hero-sub">Interactive examples based on JSONPlaceholder Guide.</p>
        </div>
      </header>
      <main className="form-wrapper" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
        {sections.map(s => (
          <div key={s.key} className="blog-card" style={{ marginBottom: '2rem', padding: '1.5rem', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text)' }}>{s.title}</h2>
            <pre style={{ background: '#f4f4f5', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', overflowX: 'auto', marginBottom: '1rem', color: '#3f3f46' }}>
              <code>{s.code}</code>
            </pre>
            <button className="btn-primary" onClick={s.action} disabled={loading[s.key]}>
              {loading[s.key] ? 'Running Request...' : 'Run Request'}
            </button>
            {outputs[s.key] && (
              <div style={{ marginTop: '1.5rem', animation: 'fadeUp 300ms ease' }}>
                <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text)' }}>👇 Output</p>
                <pre style={{ background: '#18181b', color: '#fff', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', overflowX: 'auto', maxHeight: '400px' }}>
                  <code>{outputs[s.key]}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── Weather Page (Dera Ghazi Khan) ──
══════════════════════════════════════════ */
function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=30.0489&longitude=70.6455&current_weather=true')
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch(err => {
        setError('Weather load karne mein masla aya: ' + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-wrapper">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Weather (Dera Ghazi Khan)</h1>
          <p className="hero-sub">Live weather updates via Open-Meteo API.</p>
        </div>
      </header>
      <main className="form-wrapper" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="blog-card" style={{ padding: '2rem', textAlign: 'center', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          {loading && <div className="loading-state"><span className="spinner"></span><p>Fetching Weather...</p></div>}
          {error && <div className="alert-error">⚠️ {error}</div>}
          {!loading && !error && weather && (
            <div style={{ animation: 'fadeUp 300ms ease' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌤️</div>
              <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {weather.temperature}°C
              </h2>
              <p style={{ fontSize: '1.25rem', color: '#52525b', marginBottom: '1rem' }}>
                Wind Speed: {weather.windspeed} km/h
              </p>
              <div className="card-tag" style={{ display: 'inline-block' }}>DG Khan, Punjab</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── API Posts Page (JSONPlaceholder) ──
══════════════════════════════════════════ */
function ApiPage({ posts, loading, error, onRead }) {
  return (
    <div className="page-wrapper">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">API Articles</h1>
          <p className="hero-sub">Fetched in real-time from jsonplaceholder.typicode.com API.</p>
        </div>
      </header>
      <main className="blog-list">
        {loading && (
          <div className="loading-state">
            <span className="spinner"></span>
            <p>Fetching API articles...</p>
          </div>
        )}
        {error && <div className="alert-error">⚠️ {error}</div>}
        {!loading && !error && posts.map((post, idx) => (
          <article key={post.id} className="blog-card" style={{ animationDelay: `${(idx % 10) * 30}ms` }}>
            <div className="card-inner">
              <div className="card-meta-top">
                <span className="card-tag">API Post #{post.id}</span>
                <span className="card-date">User ID: {post.userId}</span>
              </div>
              <h2 className="card-title">{post.title}</h2>
              <p className="card-excerpt">{post.body.slice(0, 150)}...</p>
              <div className="card-footer">
                <span className="card-author">By JSONPlaceholder</span>
                <button className="btn-outline" onClick={() => onRead(post)}>Read More →</button>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── Home Page (Local Articles) ──
══════════════════════════════════════════ */
function HomePage({ session, userPosts, onRead, onEdit, onDelete }) {
  const allPosts = [...SEED_ARTICLES, ...userPosts];
  return (
    <div className="page-wrapper">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Local Articles</h1>
          <p className="hero-sub">Read and share knowledge on React, design, and modern web development.</p>
        </div>
      </header>
      <main className="blog-list">
        {allPosts.map((post, idx) => {
          const isOwner = session && post.username === session.username;
          return (
            <article key={post.id} className="blog-card" style={{ animationDelay: `${idx * 60}ms` }}>
              <div className="card-inner">
                <div className="card-meta-top">
                  <span className="card-tag">{post.tag}</span>
                  <span className="card-date">{post.date}</span>
                </div>
                <h2 className="card-title">{post.title}</h2>
                <p className="card-excerpt">{post.excerpt}</p>
                <div className="card-footer">
                  <span className="card-author">By {post.author}</span>
                  <div className="card-actions">
                    {isOwner && (
                      <>
                        <button className="btn-icon" onClick={(e) => { e.stopPropagation(); onEdit(post); }} title="Edit Article">✏️</button>
                        <button className="btn-icon delete" onClick={(e) => { e.stopPropagation(); onDelete(post.id); }} title="Delete Article">🗑️</button>
                      </>
                    )}
                    <button className="btn-outline" onClick={() => onRead(post)}>Read More →</button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── Create / Edit Page ──
══════════════════════════════════════════ */
function CreatePage({ session, onPublish, onCancel, editPost }) {
  const [form, setForm] = useState({
    title: editPost?.title || '',
    author: editPost?.author || session?.name || '',
    tag: editPost?.tag || '',
    content: editPost?.content || '',
    postType: editPost?.userId ? 'api' : 'local'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.author.trim()) {
      setError('Title, Author aur Content zaroori hain.'); return;
    }
    const words = form.content.trim().split(/\s+/);
    const excerpt = words.slice(0, 35).join(' ') + (words.length > 35 ? '...' : '');
    onPublish({
      id: editPost ? editPost.id : Date.now(),
      title: form.title.trim(),
      author: form.author.trim(),
      tag: form.tag.trim() || 'General',
      content: form.content.trim(),
      excerpt,
      date: editPost ? editPost.date : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      username: editPost ? editPost.username : session.username,
      postType: form.postType
    });
    setSuccess(true);
    setTimeout(() => onCancel(form.postType), 1200);
  };

  return (
    <div className="page-wrapper">
      <header className="hero hero-sm">
        <div className="hero-inner">
          <h1 className="hero-title">{editPost ? "Article Edit Karein" : "Article Likhein"}</h1>
          <p className="hero-sub">{editPost ? "Apne article ko update karein." : "Apna knowledge community ke saath share karein."}</p>
        </div>
      </header>
      <main className="form-wrapper">
        <form className="blog-form" onSubmit={submit}>
          {success && <div className="alert-success">✅ {editPost ? "Update" : "Publish"} ho gaya! Redirect ho raha hai...</div>}
          {error   && <div className="alert-error">⚠️ {error}</div>}
          
          {!editPost && (
            <div className="form-group" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: '#f4f4f5', padding: '1rem', borderRadius: '8px' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Kahan Publish Karein?</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="postType" value="api" checked={form.postType === 'api'} onChange={(e) => setForm({ ...form, postType: e.target.value })} />
                API Posts
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="radio" name="postType" value="local" checked={form.postType === 'local'} onChange={(e) => setForm({ ...form, postType: e.target.value })} />
                Local Articles
              </label>
            </div>
          )}

          <div className="form-row two-col">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input className="form-input" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Article ka title..." />
            </div>
            <div className="form-group">
              <label className="form-label">Author *</label>
              <input className="form-input" value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Aapka naam..." />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Tag / Category</label>
            <input className="form-input" value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="e.g. React, Design, Tutorial..." />
          </div>
          <div className="form-group">
            <label className="form-label">Content *</label>
            <textarea className="form-textarea" value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={16} placeholder="Apna pura article yahan likhein..." />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => onCancel(form.postType)}>Cancel</button>
            <button type="submit" className="btn-primary">{editPost ? "Save Changes" : "Publish karein"} →</button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── Article Page (Detail View) ──
══════════════════════════════════════════ */
function ArticlePage({ session, post, onBack, onEdit, onDelete }) {
  const isOwner = session && post.username === session.username;
  const isApiPost = !!post.userId;
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (isApiPost) {
      setLoadingComments(true);
      fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then(res => res.json())
        .then(data => {
          setComments(data);
          setLoadingComments(false);
        })
        .catch(err => {
          console.error(err);
          setLoadingComments(false);
        });
    } else {
      setComments([]);
    }
  }, [post, isApiPost]);

  return (
    <div className="page-wrapper">
      <main className="article-wrapper">
        <div className="article-actions-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button className="btn-outline back-btn" style={{ marginBottom: 0 }} onClick={onBack}>← Back</button>
          {isOwner && (
            <div className="owner-actions" style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-outline" onClick={() => onEdit(post)}>✏️ Edit</button>
              <button className="btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => onDelete(post.id)}>🗑️ Delete</button>
            </div>
          )}
        </div>
        <div className="article-meta-top">
          <span className="card-tag">{isApiPost ? `API Post #${post.id}` : post.tag}</span>
          <span className="card-date">{isApiPost ? `User ID: ${post.userId}` : post.date}</span>
        </div>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-author">By {isApiPost ? "JSONPlaceholder" : post.author}</p>
        <div className="article-divider" />
        <div className="article-body">{post.content || post.body}</div>

        {isApiPost && (
          <div className="comments-section" style={{ marginTop: '4rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Comments ({comments.length})</h3>
            {loadingComments ? (
              <div className="loading-state" style={{ padding: '2rem' }}>
                <span className="spinner"></span>
                <p>Loading comments...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.map(c => (
                  <div key={c.id} style={{ background: '#f4f4f5', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text)' }}>{c.name}</span>
                      <span>{c.email}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#3f3f46' }}>{c.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   ── App Root ──
══════════════════════════════════════════ */
export default function App() {
  const [page, setPage]             = useState('api'); // API Articles is default page now
  const [session, setSession]       = useState(getSession);
  const [userPosts, setUserPosts]   = useState(getPosts);
  const [activePost, setActivePost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  // API posts state
  const [apiPosts, setApiPosts]     = useState([]);
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError]     = useState('');

  // Fetch API posts
  useEffect(() => {
    setLoadingApi(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then(data => {
        setApiPosts(data);
        setLoadingApi(false);
      })
      .catch(err => {
       
        setLoadingApi(false);
      });
  }, []);

  useEffect(() => { savePosts(userPosts); }, [userPosts]);

  useEffect(() => {
    const users = getUsers();
    saveUsers(users);
  }, []);

  const doLogin = (user) => { saveSession(user); setSession(user); setPage('api'); };
  const doLogout = () => { saveSession(null); setSession(null); setPage('api'); };

  const handlePublish = async (post) => {
    try {
      if (editingPost && post.userId) {
        // Edit API Post
        await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
          method: 'PUT',
          body: JSON.stringify(post),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
        setApiPosts(prev => prev.map(p => p.id === post.id ? { ...p, ...post, body: post.content } : p));
        setEditingPost(null);
      } else if (editingPost) {
        // Edit Local Post
        setUserPosts(prev => prev.map(p => p.id === post.id ? post : p));
        setEditingPost(null);
      } else {
        // Create New Post
        if (post.postType === 'api') {
          await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: post.title,
              body: post.content,
              userId: 1,
            }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
          });
          
          const newApiPost = {
            ...post,
            id: Date.now(), // Generate unique ID to avoid 101 key clash
            body: post.content,
            userId: 1
          };
          setApiPosts(prev => [newApiPost, ...prev]);
        } else {
          // Local Posts only
          setUserPosts(prev => [post, ...prev]);
        }
      }
    } catch (err) {
      console.error("API call failed:", err);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setPage('create');
  };

  const handleDelete = (postId) => {
    {
      setUserPosts(prev => prev.filter(p => p.id !== postId));
      if (activePost && activePost.id === postId) {
        setActivePost(null);
      }
      setPage('home');
    }
  };

  return (
    <div className="app">
      {page !== 'login' && page !== 'register' && (
        <Navbar
          session={session}
          activePage={page}
          onWeather={() => { setPage('weather'); setActivePost(null); setEditingPost(null); }}
          onGuide={() => { setPage('guide'); setActivePost(null); setEditingPost(null); }}
          onApi={() => { setPage('api'); setActivePost(null); setEditingPost(null); }}
          onHome={() => { setPage('home'); setActivePost(null); setEditingPost(null); }}
          onCreate={() => { setEditingPost(null); session ? setPage('create') : setPage('login'); }}
          onLogin={() => setPage('login')}
          onLogout={doLogout}
        />
      )}

      {page === 'login'    && <LoginPage    onLogin={doLogin} onGoRegister={() => setPage('register')} onCancel={() => setPage('api')} />}
      {page === 'register' && <RegisterPage onRegister={doLogin} onGoLogin={() => setPage('login')} onCancel={() => setPage('api')} />}
      
      {page === 'weather'  && <WeatherPage />}
      {page === 'guide'    && <GuidePage />}

      {page === 'api'      && (
        <ApiPage 
          posts={apiPosts} 
          loading={loadingApi} 
          error={apiError} 
          onRead={(p) => { setActivePost(p); setPage('article'); }} 
        />
      )}

      {page === 'home'     && (
        <HomePage 
          session={session} 
          userPosts={userPosts} 
          onRead={(p) => { setActivePost(p); setPage('article'); }} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      
      {page === 'create'   && session && (
        <CreatePage 
          session={session} 
          onPublish={handlePublish} 
          onCancel={(type) => { setPage(type === 'api' ? 'api' : 'home'); setEditingPost(null); }} 
          editPost={editingPost}
        />
      )}
      
      {page === 'article'  && activePost && (
        <ArticlePage 
          session={session}
          post={activePost} 
          onBack={() => setPage(activePost.userId ? 'api' : 'home')} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
