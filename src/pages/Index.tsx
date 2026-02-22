import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Sparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';
import { SearchBar } from '@/components/SearchBar';
import { RegionTabs } from '@/components/RegionTabs';
import { StationGrid } from '@/components/StationGrid';
import { REGIONS } from '@/types/radio';

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState('india');
  const region = REGIONS.find(r => r.id === selectedRegion);

  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />

      {/* Hero */}
      <section className="relative bg-grid-texture overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/8 mb-5">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-semibold text-primary uppercase tracking-widest">Live Radio Worldwide</span>
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-2 leading-tight">
              Tune Into the
              <br />
              <span className="text-gradient-primary">World</span>
            </h1>

            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Stream live stations from India, USA, Europe, Australia, South America & Africa.
            </p>

            {/* Search */}
            <SearchBar className="w-full" />
          </motion.div>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4">
        {/* Divider */}
        <div className="gold-bar my-6" />

        {/* Region Tabs */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-4 h-4 text-primary" />
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Browse by Region
            </h2>
          </div>
          <RegionTabs selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
        </motion.section>

        {/* Region Header */}
        <motion.div
          key={selectedRegion}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-2xl">{region?.emoji}</span>
          <div>
            <h3 className="font-display text-base font-bold text-foreground">
              {region?.name}
            </h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Broadcasting Live Now
            </p>
          </div>
        </motion.div>

        {/* Stations */}
        <StationGrid regionId={selectedRegion} />

        {/* Premium CTA */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 mb-4 relative overflow-hidden rounded-2xl border border-primary/20 bg-card"
        >
          {/* Gold stripe top */}
          <div className="h-0.5 bg-gradient-primary w-full" />
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">Go Premium</h3>
                <p className="text-[11px] text-muted-foreground">HD audio · No ads · Exclusive regions</p>
              </div>
            </div>
            <a
              href="/premium"
              className="block w-full text-center py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 active:scale-98"
            >
              Explore Premium Plans
            </a>
          </div>
        </motion.section>
      </main>

      <AudioPlayer />
    </div>
  );
};

export default Index;
