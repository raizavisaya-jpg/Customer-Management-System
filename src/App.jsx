import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import AppShell from './layouts/AppShell';

// Placeholder pages for Sprint 2
function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center h-64">
      <h1 className="text-2xl font-semibold text-gray-400">{title} — Coming Soon</h1>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Protected routes (AppShell wraps all authenticated pages) */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/customers" replace />} />
          <Route path="customers" element={<PlaceholderPage title="Customers" />} />
          <Route path="sales" element={<PlaceholderPage title="Sales" />} />
          <Route path="products" element={<PlaceholderPage title="Products" />} />
          <Route path="admin" element={<PlaceholderPage title="Admin" />} />
          <Route path="deleted-customers" element={<PlaceholderPage title="Deleted Customers" />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}