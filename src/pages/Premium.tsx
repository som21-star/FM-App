import { motion } from 'framer-motion';
import {
  Crown, Check, Zap, Globe, Headphones, Star,
  Shield, Wifi, Download, Music2, Radio, ChevronRight
} from 'lucide-react';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const freeFeatures = [
  'Basic waveforms only',
  '3 waveforms/day limit',
  'No advanced scenarios',
  'Standard audio quality',
  'Watermark on exports',
];

const premiumFeatures = [
  { icon: Globe, text: 'Unlimited waveforms' },
  { icon: Download, text: 'Export HD directly' },
  { icon: Zap, text: 'Advanced scenarios unlocked' },
  { icon: Shield, text: 'Priority processing queue' },
  { icon: Star, text: 'Custom branding without watermark' },
  { icon: Headphones, text: 'All radio region access' },
];

const plans = [
  {
    id: 'free',
    name: 'Basic',
    price: 'Free',
    period: 'forever',
    annualEquiv: 'Essential features',
    popular: false,
    cta: 'Current Plan',
  },
  {
    id: 'premium_free',
    name: 'Early Bird Premium',
    price: 'Free',
    period: 'for 60 days',
    annualEquiv: 'Limited time offer',
    popular: true,
    savings: '100% OFF',
    cta: 'Activate Free Access',
  }
];

const regions = [
  { emoji: '🇮🇳', name: 'India', stations: 'Radio Mirchi, Red FM, AIR', locked: false },
  { emoji: '🇺🇸', name: 'USA', stations: 'iHeart, NPR, ESPN Radio', locked: false },
  { emoji: '🇬🇧', name: 'Europe', stations: 'BBC Radio, RTL, Capital FM', locked: false },
  { emoji: '🇦🇺', name: 'Australia', stations: 'Triple J, Nova, ABC Radio', locked: true },
  { emoji: '🇧🇷', name: 'South America', stations: 'Rádio Gaúcha, Caracol', locked: true },
  { emoji: '🌍', name: 'Africa', stations: 'Metro FM, Kaya FM', locked: true },
  { emoji: '🇯🇵', name: 'Asia Pacific', stations: 'J-Wave, KBS, Radio Taiwan', locked: true },
  { emoji: '🇦🇪', name: 'Middle East', stations: 'Dubai Eye, Radio Jordan', locked: true },
];

export default function Premium() {
  const { isPremium, user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async (planId: string) => {
    if (!user) {
      alert("Please sign in to upgrade to Premium.");
      return;
    }
    setIsCheckingOut(true);

    try {
      console.log(`Activating Free Premium for ${planId}...`);

      const { error } = await supabase.auth.updateUser({
        data: { is_premium: true }
      });

      if (error) throw error;

      alert("Premium access activated! Enjoy full features for the next 60 days.");
      window.location.reload();
    } catch (err) {
      console.error("Activation error:", err);
      alert("Failed to activate Premium. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isPremium) {
    return (
      <div className="min-h-screen bg-background pb-28 flex flex-col items-center justify-center text-center px-4">
        <Header />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Crown className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Premium Unlocked!</h1>
          <p className="text-muted-foreground mb-6">You have full access to all features. Refresh the app to verify.</p>
          <Button onClick={() => window.location.href = '/'}>Return to Home</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />

      {/* Hero */}
      <section className="relative bg-grid-texture overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-5">
              <Crown className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-widest">Frequency House Premium</span>
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-2 leading-tight">
              The World's Radio,
              <br />
              <span className="text-gradient-primary">Unleashed</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              No ads. HD audio. Every region on Earth. <b>Free for first 60 days</b> - no card details required!
            </p>
          </motion.div>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4">
        {/* Gold divider */}
        <div className="gold-bar mb-8" />

        {/* Pricing Cards */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Choose your plan</p>
          <div className="flex flex-col gap-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1 }}
                className={cn(
                  "relative rounded-2xl border p-5 transition-all",
                  plan.popular
                    ? "border-primary bg-primary/8 glow-primary"
                    : "border-border bg-card"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{plan.name}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-xs text-muted-foreground">{plan.period}</span>
                    </div>
                    {plan.annualEquiv && (
                      <p className="text-[11px] text-primary mt-0.5">{plan.annualEquiv} · {plan.savings}</p>
                    )}
                  </div>

                  <div className="text-right">
                    {plan.savings && (
                      <span className="inline-block mb-2 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold">
                        {plan.savings}
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant={plan.popular ? 'default' : 'outline'}
                      className={cn(
                        "text-xs font-semibold",
                        plan.popular && "glow-primary",
                        plan.id === 'free' && "opacity-50 pointer-events-none"
                      )}
                      onClick={() => plan.id !== 'free' && handleCheckout(plan.id)}
                      disabled={plan.id === 'free' || isCheckingOut}
                    >
                      {isCheckingOut ? 'Loading...' : plan.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-[11px] text-muted-foreground mt-3">
            ✓ Cancel anytime &nbsp;·&nbsp; ✓ Free for first 60 days &nbsp;·&nbsp; ✓ No card required
          </p>
        </motion.section>

        {/* Free vs Premium comparison */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Free vs Premium</p>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-secondary/50 px-4 py-2.5 border-b border-border">
              <span className="text-xs font-semibold text-muted-foreground">Feature</span>
              <span className="text-xs font-semibold text-muted-foreground text-center">Free</span>
              <span className="text-xs font-semibold text-primary text-center flex items-center justify-center gap-1">
                <Crown className="w-3 h-3" /> Premium
              </span>
            </div>

            {[
              { label: 'Regions', free: '6 regions', premium: '50+ regions' },
              { label: 'Audio', free: 'Standard', premium: 'HD 320kbps' },
              { label: 'Ads', free: 'Yes', premium: 'None' },
              { label: 'Favourites', free: '5 max', premium: 'Unlimited' },
              { label: 'Offline', free: '✗', premium: '✓' },
              { label: 'Track info', free: 'Basic', premium: 'Live metadata' },
              { label: 'Support', free: 'Standard', premium: 'Priority 24/7' },
            ].map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  "grid grid-cols-3 px-4 py-3 text-xs",
                  i % 2 === 0 ? "bg-card" : "bg-secondary/20",
                  "border-b border-border/40 last:border-0"
                )}
              >
                <span className="text-muted-foreground font-medium">{row.label}</span>
                <span className="text-center text-muted-foreground/70">{row.free}</span>
                <span className="text-center text-primary font-semibold">{row.premium}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Premium Features */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">What you get</p>
          <div className="grid grid-cols-1 gap-2">
            {premiumFeatures.map((f, i) => (
              <motion.div
                key={f.text}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/12 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-foreground">{f.text}</span>
                <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Regions Preview */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">Stations & Regions</p>
          <div className="flex flex-col gap-2">
            {regions.map((r, i) => (
              <div
                key={r.name}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border transition-all",
                  r.locked
                    ? "border-border bg-card/50 opacity-60"
                    : "border-border bg-card"
                )}
              >
                <span className="text-xl">{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{r.stations}</p>
                </div>
                {r.locked ? (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    <Crown className="w-3 h-3 text-primary" />
                    <span className="text-[9px] font-bold text-primary uppercase tracking-wider">Premium</span>
                  </div>
                ) : (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pb-4"
        >
          <div className="rounded-2xl border border-primary/20 bg-card overflow-hidden">
            <div className="h-0.5 bg-gradient-primary" />
            <div className="p-5 text-center">
              <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-display text-base font-bold text-foreground mb-1">Upgrade to Premium</h3>
              <p className="text-xs text-muted-foreground mb-4">Enjoy full premium access during our infrastructure launch phase.</p>
              <Button
                className="w-full glow-primary font-semibold"
                onClick={() => handleCheckout('premium_free')}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? 'Activating...' : 'Get Free Premium Access'}
              </Button>
              <p className="text-[10px] text-muted-foreground mt-2.5">Limited time offer: Free for first 60 days</p>
            </div>
          </div>
        </motion.div>
      </main>

      <AudioPlayer />
    </div>
  );
}
