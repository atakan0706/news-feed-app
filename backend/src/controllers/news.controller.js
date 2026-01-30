const axios = require("axios");

const CATEGORIES = ["general", "business", "technology", "sports", "entertainment", "science", "health"];

exports.getNews = async (req, res) => {
  const category = req.query.category || "all";

  try {
    // "all" - tüm kategorilerden haberleri karışık getir
    if (category === "all") {
      const promises = CATEGORIES.map(cat =>
        axios.get("https://newsapi.org/v2/top-headlines", {
          params: { country: "us", category: cat, pageSize: 5, apiKey: process.env.NEWS_API_KEY }
        }).then(r => r.data.articles || []).catch(() => [])
      );
      
      const results = await Promise.all(promises);
      const allArticles = results.flat();
      // Tekrarları URL ile filtrele
      const seen = new Set();
      const unique = allArticles.filter(a => {
        const url = a?.url || a?.title || Math.random();
        if (seen.has(url)) return false;
        seen.add(url);
        return true;
      });
      const shuffled = unique.sort(() => Math.random() - 0.5);
      return res.json(shuffled);
    }

    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          category,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    res.json(response.data.articles || []);
  } catch (err) {
    console.error("News API hatası:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: "Haberler yüklenemedi" });
  }
};
