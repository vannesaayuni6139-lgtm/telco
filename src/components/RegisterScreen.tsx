import { useState } from 'react';
import { Activity, Mail, Lock, Eye, EyeOff, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { registerUser } from '../auth';
import { isValidEmail, passwordIssues } from '../utils/validation';

interface RegisterScreenProps {
  onRegistered: () => void;
  onShowLogin: () => void;
}

export function RegisterScreen({ onRegistered, onShowLogin }: RegisterScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!name.trim()) errs.push('Name is required');
    if (!isValidEmail(email)) errs.push('Enter a valid email');
    const pwIssues = passwordIssues(password);
    if (pwIssues.length) errs.push(`Password: ${pwIssues.join(', ')}`);
    if (password !== confirmPassword) errs.push('Passwords do not match');
    if (!acceptTerms) errs.push('You must accept the terms');
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (errs.length) return;
    setSubmitting(true);
    const res = registerUser({ email, password, name });
    setSubmitting(false);
    if (!res.ok) {
      setErrors([res.error]);
      return;
    }
    onRegistered();
  };

  return (
    <div className="size-full flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-black items-center justify-center p-12">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 border-4 border-white/20 rotate-12"></div>
            <div className="absolute inset-8 border-4 border-white/30 rotate-45"></div>
            <div className="absolute inset-16 border-4 border-white/40 -rotate-12"></div>
            <div className="absolute inset-24 bg-white/10"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="bg-black rounded-lg p-2">
              <Activity className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <div className="tracking-wider">TELCO</div>
              <div className="text-gray-500 tracking-wide">ANALYTICS</div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 pb-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="mb-2">Create Account</h2>
              <p className="text-gray-500">Sign up to get started</p>
            </div>

            {errors.length > 0 && (
              <div className="mb-6 border border-red-200 bg-red-50 text-red-700 rounded-lg p-3">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((er, i) => (
                    <li key={i}>{er}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-700">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 border border-gray-300 focus:border-black transition-colors"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border border-gray-300 focus:border-black transition-colors"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border border-gray-300 focus:border-black transition-colors"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 border border-gray-300 focus:border-black transition-colors"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  />
                  <label htmlFor="terms" className="cursor-pointer text-gray-700">
                    I agree to the terms & privacy
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-black hover:bg-gray-800" disabled={submitting}>
                {submitting ? 'Creating account...' : 'Create Account'}
              </Button>

              <div className="text-center pt-2">
                <span className="text-gray-500">Already have an account? </span>
                <button type="button" onClick={onShowLogin} className="text-black hover:underline">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


