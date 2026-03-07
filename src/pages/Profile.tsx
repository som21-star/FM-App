import React, { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Calendar, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, signOut } = useAuth();
  const [displayName, setDisplayName] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [avatarData, setAvatarData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [listens, setListens] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!user) return;
    const md = (user.user_metadata ?? {}) as any;
    setDisplayName(md.display_name || '');
    setCustomerName(md.customer_name || '');
    setPhoneNumber(md.phone_number || '');
    setLocation(md.location || '');
    setBio(md.bio || '');
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
      const { error } = await supabase.auth.updateUser({ 
        data: { 
          display_name: displayName, 
          customer_name: customerName,
          phone_number: phoneNumber,
          location: location,
          bio: bio,
          avatar_base64: avatarData 
        } 
      });
      if (error) throw error;
      alert('Profile updated successfully!');
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
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-sm text-muted-foreground mb-6">Manage your account information and preferences</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border p-6 bg-card/95 backdrop-blur-sm sticky top-20">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-secondary mb-4 ring-2 ring-border">
                  {avatarData ? (
                    <img src={avatarData} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <User className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <Label className="text-sm font-medium mb-2">Profile Picture</Label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={onFile} 
                  className="text-xs text-muted-foreground file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-secondary file:text-foreground hover:file:bg-secondary/80 cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">JPG, PNG or GIF (max 2MB)</p>
              </div>

              {/* Account Info */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium truncate">{user?.email || 'Not signed in'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Member since</div>
                    <div className="font-medium">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </div>
                  </div>
                </div>
                
                {/* Sign Out Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="rounded-lg border border-border p-6 bg-card/95 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                  <Input 
                    id="displayName"
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder="How you appear on the app"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium">Full Name</Label>
                  <Input 
                    id="customerName"
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    placeholder="Your full legal name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone Number
                  </Label>
                  <Input 
                    id="phoneNumber"
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Location
                  </Label>
                  <Input 
                    id="location"
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="City, Country"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                <Textarea 
                  id="bio"
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Tell us a bit about yourself and your music taste..."
                  className="w-full min-h-[100px] resize-none"
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">{bio.length}/500</p>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={saveProfile} disabled={loading} className="flex-1">
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => { 
                    setDisplayName(''); 
                    setCustomerName('');
                    setPhoneNumber('');
                    setLocation('');
                    setBio('');
                    setAvatarData(null); 
                  }}
                  disabled={loading}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Listening Trends */}
            <div className="rounded-lg border border-border p-6 bg-card/95 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4">Listening Trends</h2>
              {topListens.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-3 flex items-center justify-center">
                    <User className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">No listens yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Start playing stations to build your trends</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {topListens.map((l: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground w-6">#{i + 1}</span>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">{l.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {l.count} {l.count === 1 ? 'play' : 'plays'} · Last played {new Date(l.last || 0).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
