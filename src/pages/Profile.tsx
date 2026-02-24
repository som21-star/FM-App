import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState<string>('');
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listens, setListens] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!user) return;
    const md = (user.user_metadata ?? {}) as any;
    setDisplayName(md.display_name || '');
    setAvatarData(md.avatar_base64 || md.avatar_url || null);

    // Load listens from localStorage
    try {
      const key = `fh_listens:${user.id}`;
      const raw = localStorage.getItem(key) || localStorage.getItem('fh_listens:anon');
      if (raw) setListens(JSON.parse(raw));
    } catch (err) {
      console.warn('Failed to load listens', err);
    }
  }, [user]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarData(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    if (!user) return alert('Sign in to update profile');
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ data: { display_name: displayName, avatar_base64: avatarData } });
      if (error) throw error;
      alert('Profile updated');
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const topListens = Object.values(listens)
    .sort((a: any, b: any) => (b.count || 0) - (a.count || 0))
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-4">Profile</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <div className="col-span-1">
            <div className="rounded-lg border border-border p-4 bg-card">
              <div className="w-32 h-32 rounded-md overflow-hidden bg-secondary mb-3">
                {avatarData ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarData} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
              <label className="block text-xs text-muted-foreground mb-1">Upload avatar</label>
              <input type="file" accept="image/*" onChange={onFile} />
            </div>
          </div>

          <div className="col-span-2">
            <div className="rounded-lg border border-border p-4 bg-card">
              <label className="block text-xs text-muted-foreground mb-1">Display name</label>
              <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-3 py-2 rounded-md bg-transparent border border-border mb-3" />
              <div className="flex gap-2">
                <Button onClick={saveProfile} disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</Button>
                <Button variant="ghost" onClick={() => { setDisplayName(''); setAvatarData(null); }}>Reset</Button>
              </div>

              <hr className="my-4" />

              <h3 className="text-sm font-semibold mb-2">Listening Trends</h3>
              {topListens.length === 0 ? (
                <p className="text-xs text-muted-foreground">No listens yet — play stations to build trends.</p>
              ) : (
                <ul className="space-y-2">
                  {topListens.map((l: any, i: number) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{l.name}</div>
                        <div className="text-[11px] text-muted-foreground">{l.count} plays · last {new Date(l.last || 0).toLocaleString()}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
