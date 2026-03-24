import { Radio, Heart, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home', icon: Radio },
    { href: '/favorites', label: 'Saved', icon: Heart },
    { href: '/regions', label: 'Regions', icon: Globe },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="leading-none">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute top-0 w-8 h-0.5 bg-gradient-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
