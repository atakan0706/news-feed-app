import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectInterests from './pages/SelectInterests';
import Saved from './pages/Saved';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen text-text-light font-sans">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/select-interests" element={<SelectInterests />} />
              <Route path="/saved" element={<Saved />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
