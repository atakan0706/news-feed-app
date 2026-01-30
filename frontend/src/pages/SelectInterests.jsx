import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const categories = [
  { id: 'technology', name: 'Teknoloji', icon: '💻', description: 'Yazılım, donanım ve dijital dünya' },
  { id: 'business', name: 'İş Dünyası', icon: '💼', description: 'Ekonomi, finans ve girişimcilik' },
  { id: 'sports', name: 'Spor', icon: '⚽', description: 'Futbol, basketbol ve tüm sporlar' },
  { id: 'entertainment', name: 'Eğlence', icon: '🎬', description: 'Film, müzik ve popüler kültür' },
  { id: 'health', name: 'Sağlık', icon: '🏥', description: 'Sağlık haberleri ve yaşam tarzı' },
  { id: 'science', name: 'Bilim', icon: '🔬', description: 'Bilimsel keşifler ve araştırmalar' },
  { id: 'general', name: 'Genel', icon: '📰', description: 'Gündem ve genel haberler' },
];

function SelectInterests() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, updateUser } = useAuth();

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      setError('Lütfen en az bir kategori seçin');
      return;
    }

    // Token'ı localStorage'dan da kontrol et
    const authToken = token || localStorage.getItem('token');
    
    if (!authToken) {
      setError('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.put(
        'http://localhost:5000/api/auth/interests',
        { interests: selectedCategories },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      
      updateUser({ interests: selectedCategories });
      navigate('/');
    } catch (err) {
      console.error('İlgi alanları güncellenirken hata:', err);
      const errorMsg = err.response?.data?.message || 'İlgi alanları kaydedilirken bir hata oluştu';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <div className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-secondary/60 backdrop-blur-sm p-8 sm:p-10 shadow-card animate-scale-in">
        <div className="flex justify-center mb-6">
          <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 text-accent text-3xl">
            🎯
          </span>
        </div>
        <h2 className="text-text-light text-2xl font-bold mb-2 text-center">
          Hoş geldin!
        </h2>
        <p className="text-text-muted text-sm text-center mb-8">
          Hangi konularla ilgileniyorsun? Haber akışını kişiselleştirelim.
        </p>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                selectedCategories.includes(category.id)
                  ? 'border-accent bg-accent/20 shadow-lg shadow-accent/10'
                  : 'border-white/[0.08] bg-primary/40 hover:bg-primary/60 hover:border-white/[0.12]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className={`font-semibold ${
                    selectedCategories.includes(category.id) ? 'text-accent' : 'text-text-light'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-text-muted text-xs mt-0.5">{category.description}</p>
                </div>
                {selectedCategories.includes(category.id) && (
                  <span className="ml-auto text-accent">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-text-muted text-sm">
            {selectedCategories.length} kategori seçildi
          </p>
          <button
            onClick={handleSubmit}
            disabled={loading || selectedCategories.length === 0}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Kaydediliyor...' : 'Devam et'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectInterests;
