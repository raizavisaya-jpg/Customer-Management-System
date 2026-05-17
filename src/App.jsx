import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Customers from "./pages/customers.jsx";
import Products from "./pages/products.jsx";
import Sales from "./pages/sales.jsx";
import Admin from "./pages/admin.jsx";
import DeletedCustomers from "./pages/deleted-customers.jsx";
import AuthCallback from "./pages/auth-callback.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppShell from "./layouts/AppShell.jsx";

import { supabase } from "./lib/SupabaseClient";

function App() {
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/auth/callback",
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      alert(error.message);
    }
  }

  async function handleEmailLogin(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Email login error:", error.message);
      alert(error.message);
      return;
    }

    navigate("/customers");
  }

  async function handleEmailRegister({
    email,
    password,
    firstName,
    lastName,
    username,
  }) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173/auth/callback",
        data: {
          first_name: firstName,
          last_name: lastName,
          username: username,
        },
      },
    });

    if (error) {
      console.error("Register error:", error.message);
      alert(error.message);
      throw error;
    }

    alert("Account created! Please check your email.");
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <LoginPage
            onEmailLogin={handleEmailLogin}
            onGoogleLogin={handleGoogleLogin}
          />
        }
      />

      <Route
        path="/register"
        element={
          <RegisterPage
            onEmailRegister={handleEmailRegister}
            onGoogleRegister={handleGoogleLogin}
          />
        }
      />

      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/deleted-customers" element={<DeletedCustomers />} />
      </Route>
    </Routes>
  );
}

export default App;
