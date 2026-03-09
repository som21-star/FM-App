import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, Radio, Loader2 } from 'lucide-react';
import { useSearchStations } from '@/hooks/useRadioStations';
import { usePlayer } from '@/contexts/PlayerContext';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
}

interface DropdownRect {
  top: number;
  left: number;
  width: number;
}

export function SearchBar({ className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<DropdownRect | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results, isLoading } = useSearchStations(query);
  const { play } = usePlayer();

  // Update portal position whenever the dropdown is open
  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updateRect = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownRect({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isOpen]);

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
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const showDropdown = isOpen && query.length >= 2;

  const dropdown = showDropdown && dropdownRect ? createPortal(
    <div
      style={{
        position: 'absolute',
        top: dropdownRect.top,
        left: dropdownRect.left,
        width: Math.max(dropdownRect.width, 320),
        minWidth: 320,
        zIndex: 2147483647,
        maxHeight: '24rem',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px hsl(var(--primary) / 0.6), 0 10px 10px -5px hsl(var(--primary) / 0.4)',
        backdropFilter: 'saturate(180%) blur(8px)'
      }}
      className="rounded-lg border border-border/60"
      >
        {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <span className="ml-2 text-sm text-foreground">Searching...</span>
        </div>
      ) : results && results.length > 0 ? (
        <div className="py-2">
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
            Found {results.length} stations
          </div>
          {results.slice(0, 8).map((station) => (
            <button
              key={station.id}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelect(station);
              }}
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors text-left cursor-pointer border-b border-border/50 last:border-0"
              style={{ color: 'inherit' }}
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
            </button>
          ))}
        </div>
      ) : query.length >= 2 ? (
        <div className="py-8 text-center text-muted-foreground">
          <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No stations found for &ldquo;{query}&rdquo;</p>
          <p className="text-xs mt-1">Try a different search term</p>
        </div>
      ) : null}
    </div>,
    document.body
  ) : null;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            const newQuery = e.target.value;
            setQuery(newQuery);
            setIsOpen(newQuery.length >= 2);
          }}
          onFocus={() => {
            if (query.length >= 2) setIsOpen(true);
          }}
          placeholder="Search stations, genres, countries..."
          className="w-full h-12 pl-12 pr-10 rounded-full bg-secondary border border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {dropdown}
    </div>
  );
}
