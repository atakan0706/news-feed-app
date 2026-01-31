import React, { useEffect, useState } from "react";
import api from "../services/api";
import CategorySelector from "../components/CategorySelector";
import LayoutSelector, { LAYOUTS } from "../components/LayoutSelector";
import NewsCard from "../components/NewsCard";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [category, setCategory] = useState("all"); // "all" = tümü karışık, "for-you" = favoriler
  const [layout, setLayout] = useState(() => {
    const stored = localStorage.getItem("news-feed-layout");
    if (stored) {
      const n = parseInt(stored, 10);
      if ([1, 2, 4].includes(n)) return n;
    }
    return 4;
  });
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedUrls, setSavedUrls] = useState(new Set());

  // Kullanıcı giriş yaptıysa "Benim için" ile başla
  useEffect(() => {
    if (isAuthenticated && user?.interests?.length > 0) {
      setCategory("for-you");
    } else {
      setCategory("all");
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      
      try {
        // "for-you" - giriş yapmış kullanıcının favori kategorileri karışık
        if (category === "for-you" && isAuthenticated && user?.interests?.length > 0) {
          const promises = user.interests.map(cat => 
            api.get(`/news?category=${cat}`).then(res => res.data || [])
          );
          const results = await Promise.all(promises);
          const allNews = results.flat();
          const shuffled = allNews.sort(() => Math.random() - 0.5);
          setNews(shuffled);
        } else {
          // "all" veya spesifik kategori - backend'den çek
          const apiCategory = category === "for-you" ? "all" : category;
          const res = await api.get(`/news?category=${apiCategory}`);
          setNews(res.data || []);
        }
      } catch (err) {
        console.error("Haber yükleme hatası:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, isAuthenticated, user]);

  // Kaydedilen haber URL'lerini yükle (giriş yapmışsa)
  useEffect(() => {
    if (isAuthenticated) {
      api.get("/auth/saved")
        .then(res => {
          const urls = (res.data || []).map(a => a.url);
          setSavedUrls(new Set(urls));
        })
        .catch(() => {});
    } else {
      setSavedUrls(new Set());
    }
  }, [isAuthenticated]);

  const handleToggleSave = (article, isSaved) => {
    if (!isAuthenticated) return;
    if (isSaved) {
      api.delete("/auth/saved", { data: { url: article.url } })
        .then(() => setSavedUrls(prev => { const s = new Set(prev); s.delete(article.url); return s; }))
        .catch(console.error);
    } else {
      const toSave = { ...article };
      if (category && category !== "all" && category !== "for-you") toSave.category = category;
      api.post("/auth/saved", { article: toSave })
        .then(() => setSavedUrls(prev => new Set([...prev, article.url])))
        .catch(console.error);
    }
  };

  const featuredNews = news[0];
  const otherNews = news.slice(1);
  const gridClass = LAYOUTS.find(l => l.value === layout)?.gridClass || LAYOUTS[2].gridClass;

  // Kategori adını bul
  const getCategoryTitle = () => {
    if (category === 'for-you') return 'Senin İçin';
    const categories = {
      technology: 'Teknoloji',
      sports: 'Spor',
      business: 'İş Dünyası',
      health: 'Sağlık',
      science: 'Bilim',
      entertainment: 'Eğlence',
      general: 'Genel'
    };
    return categories[category] || 'Haberler';
  };

  return (
    <div className="text-text-light min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-light mb-1">
          {category === 'for-you' ? (
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ✨ Senin İçin
            </span>
          ) : category === 'all' ? (
            'Tüm Haberler'
          ) : (
            'Haber Akışı'
          )}
        </h1>
        <p className="text-text-muted text-sm sm:text-base">
          {category === 'for-you' 
            ? `Favori kategorilerinden ${news.length} haber` 
            : category === 'all'
            ? `Tüm kategorilerden ${news.length} haber`
            : 'Kategorileri seçerek akışını kişiselleştir. Kalp ikonuyla favorilerine ekle!'
          }
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <CategorySelector category={category} setCategory={setCategory} />
        <LayoutSelector layout={layout} setLayout={setLayout} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
          <p className="text-text-muted text-sm font-medium">Haberler yükleniyor...</p>
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-accent/60 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {featuredNews && (
            <div className="group block mb-12 rounded-2xl overflow-hidden bg-secondary/60 border border-white/[0.06] shadow-card hover:shadow-card-hover hover:border-white/[0.12] transition-all duration-300 animate-slide-up relative">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => handleToggleSave(featuredNews, savedUrls.has(featuredNews.url))}
                  title={savedUrls.has(featuredNews.url) ? 'Kaydedilenlerden çıkar' : 'Sonra oku'}
                  className="absolute top-5 right-5 z-10 p-2.5 rounded-xl bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  {savedUrls.has(featuredNews.url) ? (
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
              <a
                href={featuredNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto md:min-h-[320px] overflow-hidden">
                  <img
                    src={featuredNews.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop"}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/40 to-primary/90 opacity-80" />
                  <span className="absolute top-5 left-5 px-3 py-1.5 rounded-xl bg-accent/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    Manşet
                  </span>
                </div>
                <div className="p-6 sm:p-10 flex flex-col justify-center bg-secondary/40">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 group-hover:text-accent transition-colors line-clamp-2">
                    {featuredNews.title}
                  </h2>
                  <p className="text-text-muted text-sm sm:text-base line-clamp-3 mb-6">
                    {featuredNews.description}
                  </p>
                  <span className="text-accent font-semibold text-sm inline-flex items-center gap-2">
                    Devamını oku
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
              </a>
            </div>
          )}

          <div className={`grid ${gridClass} gap-6`}>
            {otherNews.map((n, i) => (
              <div key={i} className="animate-fade-in" style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}>
                <NewsCard
                  article={n}
                  category={category}
                  isAuthenticated={isAuthenticated}
                  isSaved={savedUrls.has(n.url)}
                  onToggleSave={() => handleToggleSave(n, savedUrls.has(n.url))}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
