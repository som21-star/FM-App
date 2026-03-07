import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { REGIONS, Region } from '@/types/radio';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface RegionTabsProps {
  selectedRegion: string;
  onSelectRegion: (regionId: string) => void;
}

export function RegionTabs({ selectedRegion, onSelectRegion }: RegionTabsProps) {
  const { isPremium } = useAuth();
  
  const handleRegionClick = (region: Region) => {
    if (region.premium && !isPremium) {
      toast.error('This region is for Pro members only', {
        description: 'Upgrade to access all regions worldwide!',
        action: {
          label: 'Upgrade',
          onClick: () => window.location.href = '/premium'
        }
      });
      return;
    }
    onSelectRegion(region.id);
  };
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {REGIONS.map((region) => (
        <RegionTab
          key={region.id}
          region={region}
          isSelected={selectedRegion === region.id}
          onClick={() => handleRegionClick(region)}
          isPremium={isPremium}
        />
      ))}
    </div>
  );
}

interface RegionTabProps {
  region: Region;
  isSelected: boolean;
  onClick: () => void;
  isPremium: boolean;
}

function RegionTab({ region, isSelected, onClick, isPremium }: RegionTabProps) {
  const isLocked = region.premium && !isPremium;
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs whitespace-nowrap transition-all border",
        isSelected
          ? "bg-primary text-primary-foreground border-primary glow-primary"
          : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground",
        isLocked && "opacity-60"
      )}
    >
      <span>{region.emoji}</span>
      <span>{region.name}</span>
      {isLocked && <Crown className="w-3 h-3 text-amber-500" />}
    </motion.button>
  );
}
