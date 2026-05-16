import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuthCallback() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error.message);
        navigate("/login", { replace: true });
        return;
      }

      if (session) {
        navigate("/customers", { replace: true });
      } else {
        console.log("No session found");
        navigate("/login", { replace: true });
      }
    }

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-600 text-sm">Signing you in...</p>
    </div>
  );
}