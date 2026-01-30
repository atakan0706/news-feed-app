import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-primary/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px] gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-accent/15 text-accent font-bold text-lg group-hover:bg-accent/25 transition-colors">
              N
            </span>
            <span className="text-text-light text-xl sm:text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
              NewsFeed
            </span>
          </Link>

          <div className="hidden sm:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Haber ara..."
                className="w-full h-10 pl-11 pr-4 rounded-xl bg-secondary/80 border border-white/[0.08] text-text-light placeholder-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/80 border border-white/[0.08] hover:bg-secondary hover:border-white/[0.12] transition-all"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/20 text-accent font-semibold text-sm">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  <span className="text-text-light text-sm font-medium hidden sm:block">
                    {user?.username || 'Kullanıcı'}
                  </span>
                  <svg className={`w-4 h-4 text-text-muted transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-secondary border border-white/[0.08] shadow-xl z-20 overflow-hidden animate-fade-in">
                      <div className="px-4 py-3 border-b border-white/[0.08]">
                        <p className="text-text-light font-medium text-sm">{user?.username}</p>
                        <p className="text-text-muted text-xs mt-0.5">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/select-interests"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-text-muted hover:text-text-light hover:bg-white/[0.04] transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          İlgi Alanlarım
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-muted hover:text-text-light text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all"
                >
                  Giriş
                </Link>
                <Link
                  to="/register"
                  className="text-white text-sm font-semibold bg-accent hover:bg-accent-hover px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
                >
                  Kayıt ol
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
