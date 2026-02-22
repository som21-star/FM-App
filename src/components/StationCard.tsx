import { motion } from 'framer-motion';
import { Play, Pause, Heart, Radio, Loader2 } from 'lucide-react';
import { RadioStation } from '@/types/radio';
import { usePlayer } from '@/contexts/PlayerContext';
import { cn } from '@/lib/utils';

interface StationCardProps {
  station: RadioStation;
  index?: number;
}

export function StationCard({ station, index = 0 }: StationCardProps) {
  const { play, pause, isPlaying, currentStation, isLoading, isFavorite, toggleFavorite } = usePlayer();

  const isCurrentStation = currentStation?.id === station.id;
  const isCurrentlyPlaying = isCurrentStation && isPlaying;
  const isCurrentlyLoading = isCurrentStation && isLoading;

  const handlePlayClick = () => {
    if (isCurrentlyPlaying) {
      pause();
    } else {
      play(station);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(station);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "group relative rounded-xl border transition-all duration-300",
        "bg-card border-border hover:border-primary/30",
        isCurrentStation && "border-primary/50 bg-accent/30"
      )}
    >
      {/* Active playing glow */}
      {isCurrentStation && (
        <div className="absolute inset-0 rounded-xl glow-primary pointer-events-none" />
      )}

      <div className="p-3 flex items-center gap-3">
        {/* Station Logo / Play Button */}
        <div className="relative w-14 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0 group">
          {station.favicon ? (
            <img
              src={station.favicon}
              alt={station.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <Radio className="w-7 h-7 text-primary/50" />
            </div>
          )}

          {/* Play Overlay */}
          <button
            onClick={handlePlayClick}
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/65 transition-opacity",
              isCurrentStation ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            {isCurrentlyLoading ? (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            ) : isCurrentlyPlaying ? (
              <Pause className="w-6 h-6 text-primary fill-primary" />
            ) : (
              <Play className="w-6 h-6 text-primary fill-primary" />
            )}
          </button>
        </div>

        {/* Station Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-sm text-foreground truncate leading-tight">
                {station.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {station.country}{station.language ? ` · ${station.language}` : ''}
              </p>
            </div>

            {/* Live + Favorite */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Live dot */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>

              <button
                onClick={handleFavoriteClick}
                className="p-1 rounded-full transition-colors"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isFavorite(station.id) ? "text-red-500 fill-red-500" : "text-muted-foreground/60 hover:text-red-500"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Tags */}
          {station.tags && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {station.tags.split(',').slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom play bar when active */}
      {isCurrentStation && (
        <div className="px-3 pb-2.5">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-full bg-primary/40"
                animate={isPlaying ? { height: ['3px', '10px', '3px'] } : { height: '3px' }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                style={{ height: '3px' }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
