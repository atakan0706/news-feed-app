import React from 'react';

const LAYOUTS = [
  { value: 1, label: '1 haber', gridClass: 'grid-cols-1', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" opacity="0.9"/>
    </svg>
  )},
  { value: 2, label: '2 haber', gridClass: 'grid-cols-1 sm:grid-cols-2', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <rect x="2" y="2" width="9" height="20" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="13" y="2" width="9" height="20" rx="2" fill="currentColor" opacity="0.9"/>
    </svg>
  )},
  { value: 4, label: '4 haber', gridClass: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="13" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="2" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.9"/>
    </svg>
  )},
];

const STORAGE_KEY = 'news-feed-layout';

export default function LayoutSelector({ layout, setLayout }) {

  const handleSelect = (value) => {
    setLayout(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-text-muted text-sm font-medium hidden sm:inline">Görünüm:</span>
      <div className="flex rounded-xl bg-secondary/60 border border-white/[0.06] p-1">
        {LAYOUTS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt.value)}
            title={opt.label + ' / satır'}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${layout === opt.value
                ? 'bg-accent text-white shadow-md'
                : 'text-text-muted hover:text-text-light hover:bg-white/[0.06]'
              }
            `}
          >
            {opt.icon}
            <span className="hidden md:inline">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { LAYOUTS };
