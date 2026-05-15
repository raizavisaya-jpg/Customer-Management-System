import React from 'react';
import { supabase } from './SupabaseClient';

const Login = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This is the key part you need to add/update
        queryParams: {
          prompt: 'select_account',
          access_type: 'offline',
        },
        redirectTo: window.location.origin 
      }
    });

    if (error) {
      console.error('Error logging in:', error.message);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', color: 'white' }}>
      <h1>Customer Management System</h1>
      <p>Please sign in to continue</p>
      <button 
        onClick={handleGoogleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;