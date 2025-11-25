import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { registerUser, loginUser } from '../auth';

const USE_BACKEND = typeof import.meta !== 'undefined' && import.meta.env?.VITE_USE_BACKEND === 'true';
const API_BASE = USE_BACKEND ? (import.meta.env.VITE_API_BASE || 'http://localhost:4000') : undefined;

interface RegisterPageProps {
  onRegistered?: (user: { id: string; email: string; name: string; createdAt: string }) => void;
  onCancel?: () => void;
}

export function RegisterPage({ onRegistered, onCancel }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (USE_BACKEND) {
      try {
        const resp = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password, name }),
        });
        const data = await resp.json();
        setLoading(false);
        if (!resp.ok) {
          setError(data?.error || 'Registration failed');
          return;
        }
        onRegistered?.(data.user);
      } catch (err: any) {
        setLoading(false);
        setError(err?.message || 'Network error');
      }
      return;
    }

    const res = registerUser({ email, password, name });
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    // Auto-login after successful register
    const loginRes = loginUser({ email, password });
    if (!loginRes.ok) {
      setError(loginRes.error);
      return;
    }
    onRegistered?.(loginRes.user);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-white mb-2">Create account</h1>
            <p className="text-slate-400">Register a new user account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-white mb-2 block">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 rounded-xl h-12" />
            </div>
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 rounded-xl h-12" required />
            </div>
            <div>
              <Label htmlFor="password" className="text-white mb-2 block">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 rounded-xl h-12 pr-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12">{loading ? 'Creating...' : 'Create account'}</Button>
              <Button type="button" variant="ghost" className="flex-1 rounded-xl h-12" onClick={onCancel}>Cancel</Button>
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          </form>

          <p className="text-center text-slate-400">Already have an account? <button onClick={() => onCancel?.()} className="text-blue-500 hover:text-blue-400 transition-colors">Sign in</button></p>
        </div>
      </div>
    </div>
  );
}
