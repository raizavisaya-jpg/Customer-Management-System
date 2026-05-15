import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("ProtectedRoute error:", error.message);
        setSession(null);
      } else {
        setSession(data.session);
      }

      setLoading(false);
    }

    checkSession();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}