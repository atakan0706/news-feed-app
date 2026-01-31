# NewsFeed - Kişiselleştirilebilir Haber Beslemesi

Kişiselleştirilebilir bir haber beslemesi web uygulaması. Kullanıcılar ilgi alanlarına göre kategoriler seçerek haber akışını özelleştirebilir.

![NewsFeed](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

---

## ✨ Özellikler

- **Kişiselleştirilebilir akış** – İlgi alanlarına göre haber akışını özelleştirme
- **Çoklu kategori** – Teknoloji, Spor, İş Dünyası, Sağlık, Bilim, Eğlence, Genel
- **Kayıt ve giriş** – Güvenli kullanıcı kaydı (bcrypt) ve JWT kimlik doğrulama
- **Favori kategoriler** – Kalp ikonu ile favori kategorileri ekleyip çıkarma
- **"Benim İçin" akışı** – Favori kategorilerden karışık haberler
- **"Tümü" seçeneği** – Tüm kategorilerden rastgele haberler
- **Görünüm seçenekleri** – Satır başına 1, 2 veya 4 haber görünümü (tercih kaydedilir)
- **Kaydedilenler** – Giriş yaptıktan sonra haberleri "Sonra oku" ile kaydetme
- **Dinamik haber API** – NewsAPI.org entegrasyonu
- **Modern tasarım** – Sade, kullanıcı dostu, koyu tema arayüz

---

## 🛠 Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Veritabanı** | MongoDB Atlas, Mongoose |
| **Haber API** | NewsAPI.org |
| **Kimlik Doğrulama** | JWT, bcryptjs |

---

## 📁 Proje Yapısı

```
news-feed-app/
├── backend/
│   └── src/
│       ├── app.js              # Ana uygulama
│       ├── config/db.js        # DB bağlantı
│       ├── controllers/        # Auth & News controller
│       ├── middleware/         # JWT auth middleware
│       ├── models/             # User model (savedArticles dahil)
│       └── routes/             # API route'ları
├── frontend/
│   └── src/
│       ├── components/         # Navbar, CategorySelector, NewsCard, LayoutSelector
│       ├── context/            # AuthContext
│       ├── pages/              # Home, Login, Register, SelectInterests, Saved
│       └── services/           # API servisi
└── README.md
```

---

## 🚀 Kurulum

### Gereksinimler

- Node.js (v18+)
- MongoDB Atlas hesabı
- NewsAPI.org API anahtarı

### 1. Projeyi klonlayın

```bash
git clone <repo-url>
cd news-feed-app
```

### 2. Backend kurulumu

```bash
cd backend
npm install
```

### 3. Backend `.env` dosyası

`backend/` klasöründe `.env` dosyası oluşturun:

```env
PORT=5000
MONGO_URI=mongodb+srv://<kullanici>:<sifre>@<cluster>.mongodb.net/newsapp
JWT_SECRET=<güçlü-bir-secret-key>
NEWS_API_KEY=<newsapi-org-api-anahtari>
```

> ⚠️ **Güvenlik:** `.env` dosyasını `.gitignore`'a ekleyin ve API anahtarlarını asla Git'e commit etmeyin.

### 4. Frontend kurulumu

```bash
cd ../frontend
npm install
```

---

## ▶️ Çalıştırma

**Backend'i başlatın:**
```bash
cd backend
npm start
```

**Frontend'i başlatın (yeni terminal):**
```bash
cd frontend
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

---

## 📡 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/auth/register` | Kullanıcı kaydı |
| POST | `/api/auth/login` | Giriş |
| PUT | `/api/auth/interests` | İlgi alanlarını güncelle (JWT gerekli) |
| GET | `/api/auth/saved` | Kaydedilen haberleri getir (JWT gerekli) |
| POST | `/api/auth/saved` | Haber kaydet (JWT gerekli) |
| DELETE | `/api/auth/saved` | Haberi kaydedilenlerden çıkar (JWT gerekli) |
| GET | `/api/news?category=<kategori>` | Haberleri getir |

**Kategoriler:** `all`, `technology`, `sports`, `business`, `health`, `science`, `entertainment`, `general`

---

## 🔑 API Anahtarı Alma

1. [NewsAPI.org](https://newsapi.org/register) adresine gidin
2. Ücretsiz hesap oluşturun
3. API anahtarınızı alın
