import { Radio, Heart, Globe, Crown, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import AuthDialog from './AuthDialog';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const location = useLocation();
  const { isPremium, user } = useAuth();

  const navItems = [
    { href: '/', label: 'Home', icon: Radio },
    { href: '/favorites', label: 'Saved', icon: Heart },
    { href: '/regions', label: 'Regions', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Radio className="w-4 h-4 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/40"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-base text-foreground tracking-tight">Frequency</span>
                <span className="font-display font-bold text-base text-gradient-primary">House</span>
              </div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">Your Home of Radio</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="leading-none">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 w-6 h-0.5 bg-gradient-primary rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {/* Plan status pill – shows for signed-in users */}
            {user && (
              isPremium ? (
                <div className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  <Crown className="w-4 h-4" />
                  <span className="leading-none">Pro</span>
                </div>
              ) : (
                <Link
                  to="/premium"
                  className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-[10px] font-bold text-muted-foreground/60 hover:text-primary transition-colors uppercase tracking-wider"
                >
                  <Crown className="w-4 h-4" />
                  <span className="leading-none">Free</span>
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            {/* Upgrade button — only for signed-in free users */}
            {!isPremium && user && (
              <Link
                to="/premium"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.3)] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all transform hover:scale-105"
              >
                <Crown className="w-3.5 h-3.5" />
                Upgrade
              </Link>
            )}
            <ThemeToggle />
            <AuthDialog />
          </div>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (localStorage.getItem('theme') as 'light' | 'dark') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center justify-center rounded-md p-2 bg-accent/10 hover:bg-accent/20"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
