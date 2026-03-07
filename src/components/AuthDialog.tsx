import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Loader2, Eye, EyeOff, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function AuthDialog() {
  const { user, signOut } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const reset = () => {
    setError(null);
    setMessage(null);
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return { strength: 0, label: '', color: '' };
    if (pwd.length < 6) return { strength: 1, label: 'Too short', color: 'text-red-500' };
    
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 1) return { strength: 1, label: 'Weak', color: 'text-orange-500' };
    if (strength === 2) return { strength: 2, label: 'Fair', color: 'text-yellow-500' };
    if (strength === 3) return { strength: 3, label: 'Good', color: 'text-blue-500' };
    return { strength: 4, label: 'Strong', color: 'text-green-500' };
  };

  const passwordStrength = mode === 'signup' ? getPasswordStrength(password) : null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('Signed in successfully!');
        setTimeout(() => { setOpen(false); reset(); }, 1000);
      } else if (mode === 'signup') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Account created! Redirecting...');
        setTimeout(() => { setOpen(false); reset(); window.location.href = '/'; }, 1500);
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/reset-password',
        });
        if (error) throw error;
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // If signed in, show user avatar + sign-out button
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground max-w-[80px] truncate">{user.email}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={signOut}
          className="flex items-center gap-1"
        >
          <LogOut className="w-3 h-3" />
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Sign in</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' && 'Welcome back'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset password'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' && 'Sign in to save favorites and access premium features'}
            {mode === 'signup' && 'Join Frequency House to personalize your radio experience'}
            {mode === 'forgot' && 'Enter your email to receive a password reset link'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password strength indicator for signup */}
              {mode === 'signup' && password.length > 0 && passwordStrength && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          level <= passwordStrength.strength
                            ? passwordStrength.strength === 1
                              ? 'bg-red-500'
                              : passwordStrength.strength === 2
                              ? 'bg-orange-500'
                              : passwordStrength.strength === 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-secondary'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2.5 border border-destructive/20">
              <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success message */}
          {message && (
            <div className="flex items-start gap-2 text-xs text-green-600 bg-green-50 dark:bg-green-950/30 rounded-md px-3 py-2.5 border border-green-200 dark:border-green-900">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button type="submit" variant="default" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === 'signin' ? (
                'Sign in'
              ) : mode === 'signup' ? (
                'Create account'
              ) : (
                'Send reset link'
              )}
            </Button>

            {mode === 'signin' && (
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(null); setMessage(null); }}
                disabled={loading}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Forgot your password?
              </button>
            )}
          </div>
        </form>

        <DialogFooter className="flex-col gap-3 sm:flex-col">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (mode === 'signin') {
                setMode('signup');
              } else if (mode === 'signup') {
                setMode('signin');
              } else {
                setMode('signin');
              }
              setError(null);
              setMessage(null);
            }}
            disabled={loading}
            className="w-full"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : mode === 'signup' ? 'Already have an account? Sign in' : 'Back to sign in'}
          </Button>

          <div className="flex items-start gap-1.5 text-xs text-muted-foreground pt-2">
            <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <p>
              By continuing, you agree to our{' '}
              <a href="/terms" className="underline hover:text-foreground">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
