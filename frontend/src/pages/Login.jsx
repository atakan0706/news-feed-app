import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      login(user, token);
      
      // İlk kez giriş yapıyorsa (interests boş) kategori seçimine yönlendir
      if (!user.interests || user.interests.length === 0) {
        navigate('/select-interests');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login hatası:', err);
      setError(err.response?.data?.message || 'Giriş sırasında bir hata oluştu');
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </span>
        </div>
        <h2 className="text-text-light text-2xl font-bold mb-2 text-center">Giriş yap</h2>
        <p className="text-text-muted text-sm text-center mb-8">Hesabına eriş, haber akışını kişiselleştir.</p>
        
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <div className="flex items-center justify-between pt-1">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
            </button>
            <Link to="#" className="text-sm text-accent hover:text-accent-hover font-medium">
              Şifremi unuttum
            </Link>
          </div>
        </form>
        <p className="mt-6 text-center text-text-muted text-sm">
          Hesabın yok mu?{' '}
          <Link to="/register" className="text-accent hover:text-accent-hover font-medium">
            Kayıt ol
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
