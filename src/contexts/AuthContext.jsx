
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/SupabaseClient";

const ontext = createContext({});

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient';

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("record_status")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile fetch error:", error.message);
      setProfile(null);
      return;
    }

    setProfile(data);
  };

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error.message);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }

      setLoading(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);

      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id);
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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <ontext.Provider value={{ user, profile, loading }}>
      {children}
    </ontext.Provider>
  );
};

export const useAuth = () => useContext(ontext);

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

