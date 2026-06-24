import React, { useState, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  HomePage,
  AboutPage,
  ArticlesPage,
  ProjectsPage,
  SpeakingPage,
  UsesPage,
  Footer,
  ArticleDetailPage
} from './components/Hero';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentArticleSlug, setCurrentArticleSlug] = useState(null);

  const handleNavigate = useCallback((pageId) => {
    setCurrentPage(pageId);
    setCurrentArticleSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReadArticle = useCallback((slug) => {
    setCurrentArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackFromArticle = useCallback(() => {
    setCurrentArticleSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    if (currentArticleSlug) {
      return <ArticleDetailPage slug={currentArticleSlug} onBack={handleBackFromArticle} />;
    }

    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'articles':
        return <ArticlesPage onReadArticle={handleReadArticle} />;
      case 'projects':
        return <ProjectsPage />;
      case 'speaking':
        return <SpeakingPage />;
      case 'uses':
        return <UsesPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onReadArticle={handleReadArticle} />;
    }
  };

  return (
    <div className="app-layout">
      <div className="app-outer">
        {/* Background ring borders */}
        <div className="app-bg-ring">
          <div className="app-bg-ring-inner">
            <div className="app-bg-ring-border" />
          </div>
        </div>

        {/* Navigation */}
        <Navbar currentPage={currentArticleSlug ? 'articles' : currentPage} onNavigate={handleNavigate} />

        {/* Page Content */}
        <main key={currentArticleSlug ? `article-${currentArticleSlug}` : currentPage}>
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

export default App;