import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/SupabaseClient";

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  async function getProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("record_status, user_type")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Profile fetch error:", error.message);
      return null;
    }

    return data;
  }

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      setChecking(true);

      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("ProtectedRoute error:", error.message);
        setSession(null);
        setProfile(null);
        setChecking(false);
        return;
      }

      const currentSession = data.session;
      setSession(currentSession);

      if (currentSession?.user?.id) {
        const profileData = await getProfile(currentSession.user.id);

        if (!mounted) return;

        setProfile(profileData);
      } else {
        setProfile(null);
      }

      setChecking(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;

      setChecking(true);
      setSession(newSession);

      if (newSession?.user?.id) {
        const profileData = await getProfile(newSession.user.id);

        if (!mounted) return;

        setProfile(profileData);
      } else {
        setProfile(null);
      }

      setChecking(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (checking || session === undefined) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (profile?.record_status && profile.record_status !== "ACTIVE") {
    return <Navigate to="/login" replace />;
  }

  const userType = profile?.user_type || "USER";

  if (location.pathname === "/deleted-customers" && userType === "USER") {
    return <Navigate to="/customers" replace />;
  }

  return children;
}