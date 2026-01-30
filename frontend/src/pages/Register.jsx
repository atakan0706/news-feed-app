import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      
      console.log('Kayıt başarılı:', response.data);
      alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
      navigate('/login');
    } catch (err) {
      console.error('Kayıt hatası:', err);
      setError(err.response?.data?.message || 'Kayıt sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-secondary/60 backdrop-blur-sm p-8 sm:p-10 shadow-card animate-scale-in">
        <div className="flex justify-center mb-6">
          <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 text-accent">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </span>
        </div>
        <h2 className="text-text-light text-2xl font-bold mb-2 text-center">Kayıt ol</h2>
        <p className="text-text-muted text-sm text-center mb-8">Ücretsiz hesap oluştur, haberlerini özelleştir.</p>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-text-muted text-sm font-medium mb-2">Kullanıcı adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-xl border border-white/[0.08] bg-primary/60 px-4 py-3 text-text-light placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              placeholder="kullanici_adi"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-text-muted text-sm font-medium mb-2">E-posta</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/[0.08] bg-primary/60 px-4 py-3 text-text-light placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-text-muted text-sm font-medium mb-2">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/[0.08] bg-primary/60 px-4 py-3 text-text-light placeholder-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold py-3 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt ol'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-text-muted text-sm">
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover font-medium">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
