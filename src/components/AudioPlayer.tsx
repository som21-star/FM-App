import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Radio, Loader2 } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

export function AudioPlayer() {
  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    togglePlayPause,
    setVolume,
    stop
  } = usePlayer();

  return (
    <AnimatePresence>
      {currentStation && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Gold accent top line */}
          <div className="gold-bar w-full" />

          <div className="bg-card/98 backdrop-blur-2xl border-t border-border/60">
            {/* Waveform bars strip */}
            {isPlaying && (
              <div className="flex items-end gap-0.5 h-5 px-4 pt-1.5 overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-full bg-primary/20"
                    animate={{ height: [`${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`] }}
                    transition={{
                      duration: 0.4 + Math.random() * 0.3,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      delay: i * 0.02,
                    }}
                    style={{ height: '30%' }}
                  />
                ))}
              </div>
            )}

            <div className="max-w-2xl mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Station Logo */}
                <div className="relative w-11 h-11 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                  {currentStation.favicon ? (
                    <img
                      src={currentStation.favicon}
                      alt={currentStation.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <Radio className="w-5 h-5 text-primary/50" />
                    </div>
                  )}
                </div>

                {/* Station Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                    </span>
                    <span className="text-[9px] font-semibold text-primary uppercase tracking-widest">Live</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-foreground truncate leading-tight">
                    {currentStation.name}
                  </h4>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {currentStation.country}
                  </p>
                </div>

                {/* Volume (hidden on very small screens) */}
                <div className="hidden sm:flex items-center gap-2 w-24">
                  <button
                    onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                    className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <Slider
                    value={[volume * 100]}
                    onValueChange={([v]) => setVolume(v / 100)}
                    max={100}
                    step={1}
                    className="w-16"
                  />
                </div>

                {/* Play/Pause */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={togglePlayPause}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                    isPlaying
                      ? "bg-primary glow-primary"
                      : "bg-primary/20 hover:bg-primary/30 border border-primary/30"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                  )}
                </motion.button>

                {/* Close */}
                <button
                  onClick={stop}
                  className="p-1.5 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
