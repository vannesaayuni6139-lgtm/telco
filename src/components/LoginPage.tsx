import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { loginUser } from '../auth';

const USE_BACKEND = typeof import.meta !== 'undefined' && import.meta.env?.VITE_USE_BACKEND === 'true';
const API_BASE = USE_BACKEND ? (import.meta.env.VITE_API_BASE || 'http://localhost:4000') : undefined;

interface LoginPageProps {
  onLogin?: (user: { id: string; email: string; name: string; createdAt: string }) => void;
  onShowRegister?: () => void;
}

export function LoginPage({ onLogin, onShowRegister }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (USE_BACKEND) {
      try {
        const resp = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();
        setLoading(false);
        if (!resp.ok) {
          setError(data?.error || 'Login failed');
          return;
        }
        onLogin?.(data.user);
      } catch (err: any) {
        setLoading(false);
        setError(err?.message || 'Network error');
      }
      return;
    }

    const res = loginUser({ email, password });
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    if (onLogin) onLogin(res.user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl p-12 shadow-2xl overflow-hidden">
            {/* Abstract Wave SVG */}
            <svg viewBox="0 0 400 400" className="w-full h-auto">
              <defs>
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Wave paths */}
              <path
                d="M0,200 Q50,150 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z"
                fill="url(#waveGradient1)"
                opacity="0.6"
              >
                <animate
                  attributeName="d"
                  dur="10s"
                  repeatCount="indefinite"
                  values="
                    M0,200 Q50,150 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z;
                    M0,200 Q50,250 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z;
                    M0,200 Q50,150 100,200 T200,200 T300,200 T400,200 L400,400 L0,400 Z
                  "
                />
              </path>
              
              <path
                d="M0,250 Q50,200 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z"
                fill="url(#waveGradient2)"
                opacity="0.5"
              >
                <animate
                  attributeName="d"
                  dur="8s"
                  repeatCount="indefinite"
                  values="
                    M0,250 Q50,200 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z;
                    M0,250 Q50,300 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z;
                    M0,250 Q50,200 100,250 T200,250 T300,250 T400,250 L400,400 L0,400 Z
                  "
                />
              </path>

              <path
                d="M0,150 Q50,100 100,150 T200,150 T300,150 T400,150 L400,400 L0,400 Z"
                fill="url(#waveGradient1)"
                opacity="0.4"
              >
                <animate
                  attributeName="d"
                  dur="12s"
                  repeatCount="indefinite"
                  values="
                    M0,150 Q50,100 100,150 T200,150 T300,150 T400,150 L400,400 L0,400 Z;
                    M0,150 Q50,200 100,150 T200,150 T300,150 T400,150 L400,400 L0,400 Z;
                    M0,150 Q50,100 100,150 T200,150 T300,150 T400,150 L400,400 L0,400 Z
                  "
                />
              </path>
            </svg>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo & Title */}
          <div className="text-center">
            <h1 className="text-white mb-2">Recall</h1>
            <h2 className="text-white mb-4">Welcome back</h2>
            <p className="text-slate-400">Sign in to access your account.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 rounded-xl h-12"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <a href="#" className="text-blue-500 text-sm hover:text-blue-400 transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 rounded-xl h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12"
            >
              {loading ? 'Signing in...' : 'Login'}
            </Button>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-950 text-slate-500">OR</span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-slate-900 border-slate-800 text-white hover:bg-slate-800 rounded-xl h-12 gap-3"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onShowRegister?.();
              }}
              className="text-blue-500 hover:text-blue-400 transition-colors"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
