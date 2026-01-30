import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ALL_CATEGORIES = [
  { value: 'technology', label: 'Teknoloji', icon: '💻' },
  { value: 'sports', label: 'Spor', icon: '⚽' },
  { value: 'business', label: 'İş Dünyası', icon: '💼' },
  { value: 'health', label: 'Sağlık', icon: '🏥' },
  { value: 'science', label: 'Bilim', icon: '🔬' },
  { value: 'entertainment', label: 'Eğlence', icon: '🎬' },
  { value: 'general', label: 'Genel', icon: '📰' },
];

export default function CategorySelector({ category, setCategory }) {
  const { user, isAuthenticated, token, updateUser } = useAuth();
  const [updating, setUpdating] = useState(null);

  const isFavorite = (catValue) => {
    return user?.interests?.includes(catValue);
  };

  const toggleFavorite = async (e, catValue) => {
    e.stopPropagation(); // Kategori seçimini engelle
    
    if (!isAuthenticated) return;
    
    setUpdating(catValue);
    
    const currentInterests = user?.interests || [];
    const newInterests = currentInterests.includes(catValue)
      ? currentInterests.filter(i => i !== catValue)
      : [...currentInterests, catValue];

    try {
      const authToken = token || localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/auth/interests',
        { interests: newInterests },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      updateUser({ interests: newInterests });
    } catch (err) {
      console.error('Favori güncellenirken hata:', err);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 scrollbar-hide">
        {/* Tümü butonu - tüm kategorilerden rastgele haberler */}
        <button
          type="button"
          onClick={() => setCategory('all')}
          className={`
            shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
            ${category === 'all'
              ? 'bg-accent text-white shadow-lg shadow-accent/25'
              : 'bg-secondary/80 text-text-muted hover:text-text-light hover:bg-white/[0.08] border border-white/[0.08]'
            }
          `}
        >
          <span>📰</span>
          Tümü
        </button>

        {/* Benim İçin butonu - sadece giriş yapmış ve favorisi olan kullanıcılar için */}
        {isAuthenticated && user?.interests?.length > 0 && (
          <button
            type="button"
            onClick={() => setCategory('for-you')}
            className={`
              shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
              ${category === 'for-you'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-secondary/80 text-text-muted hover:text-text-light hover:bg-white/[0.08] border border-white/[0.08]'
              }
            `}
          >
            <span>✨</span>
            Benim İçin
          </button>
        )}

        {/* Tüm kategoriler */}
        {ALL_CATEGORIES.map((cat) => (
          <div key={cat.value} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${category === cat.value
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-secondary/80 text-text-muted hover:text-text-light hover:bg-white/[0.08] border border-white/[0.08]'
                }
                ${isAuthenticated ? 'pr-10' : ''}
              `}
            >
              <span className="opacity-90">{cat.icon}</span>
              {cat.label}
            </button>
            
            {/* Favori butonu - sadece giriş yapmış kullanıcılar için */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={(e) => toggleFavorite(e, cat.value)}
                disabled={updating === cat.value}
                className={`
                  absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all
                  ${isFavorite(cat.value)
                    ? 'text-red-400 hover:text-red-300'
                    : 'text-text-muted/50 hover:text-red-400'
                  }
                  ${updating === cat.value ? 'opacity-50' : ''}
                `}
                title={isFavorite(cat.value) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              >
                {updating === cat.value ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill={isFavorite(cat.value) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Favori bilgisi */}
      {isAuthenticated && user?.interests?.length > 0 && (
        <p className="text-text-muted text-xs flex items-center gap-1">
          <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {user.interests.length} favori kategorin var
        </p>
      )}
    </div>
  );
}
