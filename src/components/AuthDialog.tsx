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
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Loader2 } from 'lucide-react';

export function AuthDialog() {
  const { user, signOut } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const reset = () => {
    setError(null);
    setMessage(null);
    setEmail('');
    setPassword('');
  };

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
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Account created! Check your email to confirm.');
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'signin' ? 'Sign in' : 'Create account'}</DialogTitle>
          <DialogDescription>
            {mode === 'signin'
              ? 'Sign in to save favourites and access premium features.'
              : 'Create a free account to save favourites and personalize your radio.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="grid gap-3">
          <label className="text-sm text-muted-foreground">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@radio.com"
            required
            disabled={loading}
          />

          <label className="text-sm text-muted-foreground">Password</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            required
            disabled={loading}
            minLength={6}
          />

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2">{error}</p>
          )}
          {message && (
            <p className="text-xs text-green-600 bg-green-50 dark:bg-green-950/30 rounded-md px-3 py-2">{message}</p>
          )}

          <div className="flex items-center justify-between gap-2">
            <Button type="submit" variant="default" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setMessage(null); }}
              disabled={loading}
            >
              {mode === 'signin' ? 'Create account' : 'Have an account? Sign in'}
            </Button>
          </div>
        </form>

        <DialogFooter className="mt-2">
          <div className="text-xs text-muted-foreground">By continuing you agree to our terms.</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
