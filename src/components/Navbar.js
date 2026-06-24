import React, { useState, useEffect, useCallback } from 'react';

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'articles', label: 'Articles' },
  { id: 'projects', label: 'Projects' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'uses', label: 'Uses' },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('spotlight-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('spotlight-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const handleNav = useCallback((pageId) => {
    onNavigate(pageId);
    setMobileOpen(false);
  }, [onNavigate]);

  return (
    <>
      <header className="header">
        <div className="container-lg">
          <div className="header-inner">
            <div className="header-top-blur" />
            <div className="header-content">
              <div className="avatar-container">
                <a
                  href="#home"
                  className="avatar-link"
                  onClick={(e) => { e.preventDefault(); handleNav('home'); }}
                  aria-label="Home"
                >
                  <img src="/avatar.png" alt="Spencer Sharp" className="avatar-img" />
                </a>
              </div>

              <nav className="desktop-nav" aria-label="Main navigation">
                <div className="nav-inner">
                  <ul className="nav-list">
                    {navLinks.map(link => (
                      <li key={link.id}>
                        <a
                          href={`#${link.id}`}
                          className={`nav-link ${currentPage === link.id ? 'active' : ''}`}
                          onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              <div className="header-right">
                <button
                  className="mobile-menu-btn"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                >
                  Menu
                  <svg className="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 8h16M4 16h16" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <SunIcon /> : <MoonIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">Navigation</span>
          <button className="mobile-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="mobile-nav-list">
          {navLinks.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`mobile-nav-link ${currentPage === link.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
