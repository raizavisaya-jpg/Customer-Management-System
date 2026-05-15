import React from 'react';
import Login from './Login';
import { useAuth } from './contexts/AuthContext';
import { supabase } from './SupabaseClient'; // <--- THIS WAS MISSING

function App() {
  const { user, profile, loading } = useAuth();

  // 1. Loading State
  if (loading) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>
        Loading...
      </div>
    );
  }

  // 2. Dashboard State (Logged in and ACTIVE)
  if (user && profile?.record_status === 'ACTIVE') {
    return (
      <div className="App" style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>Customer Management System</h1>
        <p>Welcome back, <strong>{user.email}</strong>!</p>
        <p>Status: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>{profile.record_status}</span></p>
        <button 
          style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  }

  // 3. Login State (Not logged in or profile not found)
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
