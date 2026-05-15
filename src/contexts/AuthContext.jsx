import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get the session immediately
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          // Fetch profile
          const { data: prof } = await supabase
            .from('profiles')
            .select('record_status')
            .eq('id', session.user.id)
            .single();
          setProfile(prof);
        }
      } catch (err) {
        console.error("Auth Error:", err);
      } finally {
        setLoading(false); // ALWAYS stop loading
      }
    };

    // 2. Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        // Quick profile fetch
        supabase.from('profiles')
          .select('record_status')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setProfile(data));
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    checkSession();
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);