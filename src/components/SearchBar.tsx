import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Radio, Loader2 } from 'lucide-react';
import { useSearchStations } from '@/hooks/useRadioStations';
import { usePlayer } from '@/contexts/PlayerContext';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results, isLoading } = useSearchStations(query);
  const { play } = usePlayer();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (station: typeof results extends (infer T)[] ? T : never) => {
    play(station);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search stations, genres, countries..."
          className="w-full h-12 pl-12 pr-10 rounded-full bg-secondary border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            ) : results && results.length > 0 ? (
              <div className="py-2">
                {results.slice(0, 8).map((station, index) => (
                  <motion.button
                    key={station.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelect(station)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
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
                          <Radio className="w-5 h-5 text-primary/60" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">{station.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {station.country} {station.language && `• ${station.language}`}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No stations found</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
