import React from 'react';

export default function NewsCard({ article, category, isAuthenticated, isSaved, onToggleSave }) {
  const categoryLabels = {
    technology: 'Teknoloji',
    sports: 'Spor',
    business: 'İş',
    health: 'Sağlık',
    science: 'Bilim',
    entertainment: 'Eğlence',
  };
  const label = category ? categoryLabels[category] || category : null;

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSave?.();
  };

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full rounded-2xl overflow-hidden bg-secondary/60 border border-white/[0.06] shadow-card hover:shadow-card-hover hover:border-white/[0.12] transition-all duration-300 flex flex-col animate-fade-in relative"
    >
      {isAuthenticated && (
        <button
          type="button"
          onClick={handleBookmarkClick}
          title={isSaved ? 'Kaydedilenlerden çıkar' : 'Sonra oku'}
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
        >
          {isSaved ? (
            <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-text-muted hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          )}
        </button>
      )}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {label && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-accent/90 text-white text-xs font-semibold backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-text-light leading-snug mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-text-muted text-sm line-clamp-2 flex-grow mb-4">
          {article.description || 'Açıklama yok.'}
        </p>
        <span className="text-accent text-sm font-medium inline-flex items-center gap-1.5">
          Oku
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </span>
      </div>
    </a>
  );
}
