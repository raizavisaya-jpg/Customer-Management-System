import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/ui/InputField';

export default function RegisterPage({ onEmailRegister, onGoogleRegister, authError }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!form.username.trim()) newErrors.username = 'Username is required.';
    else if (form.username.trim().length < 3) newErrors.username = 'Username must be at least 3 characters.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    setLoading(true);
    try {
      if (onEmailRegister) {
        await onEmailRegister({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName, username: form.username });
        setSuccess(true);
      }
    } finally { setLoading(false); }
  }

  async function handleGoogleRegister() {
    setLoading(true);
    try { if (onGoogleRegister) await onGoogleRegister(); }
    finally { setLoading(false); }
  }

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Check your email</h2>
          <p className="text-gray-500 text-sm">
            We sent a confirmation link to <strong>{form.email}</strong>. After verifying,
            an admin must activate your account before you can log in.
          </p>
          <Link to="/login" className="mt-6 inline-block text-blue-600 hover:text-blue-700 font-medium text-sm">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hope, Inc.</h1>
          <p className="text-gray-500 mt-1 text-sm">Customer Management System</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create an account</h2>
          {authError && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {authError}
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <InputField label="First Name" id="firstName" value={form.firstName}
                onChange={handleChange('firstName')} placeholder="Juan"
                error={errors.firstName} required autoComplete="given-name" />
              <InputField label="Last Name" id="lastName" value={form.lastName}
                onChange={handleChange('lastName')} placeholder="dela Cruz"
                error={errors.lastName} required autoComplete="family-name" />
            </div>
            <InputField label="Username" id="username" value={form.username}
              onChange={handleChange('username')} placeholder="juandelacruz"
              error={errors.username} required autoComplete="username" />
            <InputField label="Email" id="email" type="email" value={form.email}
              onChange={handleChange('email')} placeholder="you@example.com"
              error={errors.email} required autoComplete="email" />
            <InputField label="Password" id="password" type="password" value={form.password}
              onChange={handleChange('password')} placeholder="Min. 8 characters"
              error={errors.password} required autoComplete="new-password" />
            <button type="submit" disabled={loading}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 rounded-lg text-sm transition-colors duration-150">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button type="button" onClick={handleGoogleRegister} disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 text-gray-700 font-medium py-2.5 rounded-lg text-sm transition-colors duration-150">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</Link>
          </p>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4 px-4">
          After registering, your account will be pending activation by a Sales Manager.
        </p>
      </div>
    </div>
  );
}