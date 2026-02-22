import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { StationGrid } from '@/components/StationGrid';
import { REGIONS } from '@/types/radio';
import { cn } from '@/lib/utils';

export default function Regions() {
  const [selectedRegion, setSelectedRegion] = useState('india');
  const region = REGIONS.find(r => r.id === selectedRegion);

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Explore</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">World Regions</h1>
          <div className="gold-bar mt-3 w-16" />
        </motion.div>

        {/* Region Selector Grid */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {REGIONS.map((r, index) => (
            <motion.button
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedRegion(r.id)}
              className={cn(
                "relative p-3 rounded-xl border transition-all text-left overflow-hidden",
                selectedRegion === r.id
                  ? "border-primary bg-primary/10 glow-primary"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <span className="text-2xl mb-1 block">{r.emoji}</span>
              <p className="font-semibold text-xs text-foreground leading-tight">{r.name}</p>
              <div className="flex items-center gap-0.5 mt-1">
                <MapPin className="w-2.5 h-2.5 text-muted-foreground" />
                <span className="text-[9px] text-muted-foreground">
                  {r.countries.length} {r.countries.length === 1 ? 'country' : 'countries'}
                </span>
              </div>
              {selectedRegion === r.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Selected Region Header */}
        <motion.div
          key={selectedRegion}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="text-3xl">{region?.emoji}</span>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">
              {region?.name} Stations
            </h2>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Live Now
            </p>
          </div>
        </motion.div>

        <StationGrid regionId={selectedRegion} />
      </main>

      <AudioPlayer />
    </div>
  );
}
