import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import NewsCard from "../components/NewsCard";
import LayoutSelector, { LAYOUTS } from "../components/LayoutSelector";
import { useAuth } from "../context/AuthContext";

export default function Saved() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState(() => {
    const stored = localStorage.getItem("news-feed-layout");
    if (stored) {
      const n = parseInt(stored, 10);
      if ([1, 2, 4].includes(n)) return n;
    }
    return 4;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchSaved = async () => {
      setLoading(true);
      try {
        const res = await api.get("/auth/saved");
        setArticles(res.data || []);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [isAuthenticated, navigate]);

  const handleToggleSave = (article, isSaved) => {
    if (isSaved) {
      api.delete("/auth/saved", { data: { url: article.url } })
        .then(() => setArticles(prev => prev.filter(a => a.url !== article.url)))
        .catch(console.error);
    }
  };

  const gridClass = LAYOUTS.find(l => l.value === layout)?.gridClass || LAYOUTS[2].gridClass;

  if (!isAuthenticated) return null;

  return (
    <div className="text-text-light min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-light mb-1">
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            📑 Kaydedilenler
          </span>
        </h1>
        <p className="text-text-muted text-sm sm:text-base">
          Sonra okumak için kaydettiğin haberler burada.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <LayoutSelector layout={layout} setLayout={setLayout} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
          <p className="text-text-muted text-sm font-medium">Kaydedilenler yükleniyor...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 rounded-2xl border border-dashed border-white/[0.12] bg-secondary/30">
          <span className="text-5xl opacity-50">📑</span>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text-light mb-1">Henüz kaydedilen yok</h3>
            <p className="text-text-muted text-sm max-w-sm">
              Haber kartlarındaki bookmark ikonuna tıklayarak haberleri sonra okumak için kaydedebilirsin.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
          >
            Haberlere Git
          </button>
        </div>
      ) : (
        <div className={`grid ${gridClass} gap-6`}>
          {articles.map((article, i) => (
            <div key={article.url || i} className="animate-fade-in" style={{ animationDelay: `${Math.min(i * 0.05, 0.4)}s` }}>
              <NewsCard
                article={article}
                category={article.category}
                isAuthenticated={true}
                isSaved={true}
                onToggleSave={() => handleToggleSave(article, true)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
