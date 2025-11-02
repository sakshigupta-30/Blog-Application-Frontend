import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import CreateEditBlog from './pages/CreateEditBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

const AppRoutes: React.FC = () => {
  const { isLoggedIn, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) {
    return null;
  }

  if (!isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/home" replace /> : <Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/create" element={isLoggedIn ? <CreateEditBlog /> : <Navigate to="/login" replace state={{ from: location }} />} />
        <Route path="/edit/:id" element={isLoggedIn ? <CreateEditBlog /> : <Navigate to="/login" replace state={{ from: location }} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;