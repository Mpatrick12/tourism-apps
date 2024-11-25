import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

function App() {
  const [authModal, setAuthModal] = React.useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });

  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar onAuthClick={(mode) => setAuthModal({ isOpen: true, mode })} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experience/:id" element={<ExperienceDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            
            <AuthModal
              isOpen={authModal.isOpen}
              mode={authModal.mode}
              onClose={() => setAuthModal({ ...authModal, isOpen: false })}
            />
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;