import { motion } from 'framer-motion';
import { REGIONS, Region } from '@/types/radio';
import { cn } from '@/lib/utils';

interface RegionTabsProps {
  selectedRegion: string;
  onSelectRegion: (regionId: string) => void;
}

export function RegionTabs({ selectedRegion, onSelectRegion }: RegionTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {REGIONS.map((region) => (
        <RegionTab
          key={region.id}
          region={region}
          isSelected={selectedRegion === region.id}
          onClick={() => onSelectRegion(region.id)}
        />
      ))}
    </div>
  );
}

interface RegionTabProps {
  region: Region;
  isSelected: boolean;
  onClick: () => void;
}

function RegionTab({ region, isSelected, onClick }: RegionTabProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-xs whitespace-nowrap transition-all border",
        isSelected
          ? "bg-primary text-primary-foreground border-primary glow-primary"
          : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
      )}
    >
      <span>{region.emoji}</span>
      <span>{region.name}</span>
    </motion.button>
  );
}
