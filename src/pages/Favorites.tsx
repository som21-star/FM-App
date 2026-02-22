import { motion } from 'framer-motion';
import { Heart, Radio } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { StationCard } from '@/components/StationCard';
import { Header } from '@/components/Header';
import { AudioPlayer } from '@/components/AudioPlayer';

export default function Favorites() {
  const { favorites } = usePlayer();

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
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Saved</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">My Stations</h1>
          <div className="gold-bar mt-3 w-16" />
        </motion.div>

        {favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3"
          >
            {favorites.map((station, index) => (
              <StationCard key={station.id} station={station} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-20 h-20 rounded-full border border-border bg-card flex items-center justify-center mb-5">
              <Radio className="w-9 h-9 text-muted-foreground/40" />
            </div>
            <h2 className="font-display text-lg font-semibold text-foreground mb-2">
              No favorites yet
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              Tap the heart icon on any station to save it here for quick access.
            </p>
          </motion.div>
        )}
      </main>

      <AudioPlayer />
    </div>
  );
}
