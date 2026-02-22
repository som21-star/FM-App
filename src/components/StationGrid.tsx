import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Loader2 } from 'lucide-react';
import { useStationsByRegion } from '@/hooks/useRadioStations';
import { StationCard } from './StationCard';
import { REGIONS } from '@/types/radio';

interface StationGridProps {
  regionId: string;
}

export function StationGrid({ regionId }: StationGridProps) {
  const { data: stations, isLoading, error } = useStationsByRegion(regionId);
  const region = REGIONS.find(r => r.id === regionId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading stations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Radio className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">Failed to load stations</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Please try again later</p>
      </div>
    );
  }

  if (!stations || stations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Radio className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">No stations found for {region?.name}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {stations.map((station, index) => (
        <StationCard key={station.id} station={station} index={index} />
      ))}
    </motion.div>
  );
}
