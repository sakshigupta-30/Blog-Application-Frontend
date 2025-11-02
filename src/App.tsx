import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/home" replace /> : <Register />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/blog/:id" element={isLoggedIn ? <BlogDetail /> : <Navigate to="/login" replace />} />
        <Route path="/create" element={isLoggedIn ? <CreateEditBlog /> : <Navigate to="/login" replace />} />
        <Route path="/edit/:id" element={isLoggedIn ? <CreateEditBlog /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;