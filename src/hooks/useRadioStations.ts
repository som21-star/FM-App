import { useQuery } from '@tanstack/react-query';
import { RadioStation, REGIONS, CURATED_STATIONS } from '@/types/radio';

const RADIO_BROWSER_API = 'https://de1.api.radio-browser.info/json';

// Transform API response to ensure we have proper url
function transformStation(station: any): RadioStation {
  return {
    ...station,
    id: station.stationuuid || station.id,
    // Use url_resolved if available, fallback to url
    url: station.url_resolved || station.url,
    url_resolved: station.url_resolved || station.url,
  };
}

async function fetchStationsByCountry(countryCode: string, limit = 10): Promise<RadioStation[]> {
  const response = await fetch(
    `${RADIO_BROWSER_API}/stations/bycountrycodeexact/${countryCode}?limit=${limit}&order=votes&reverse=true&hidebroken=true`
  );
  if (!response.ok) throw new Error('Failed to fetch stations');
  const data = await response.json();
  return data.map(transformStation);
}

async function fetchStationsByName(name: string, limit = 5): Promise<RadioStation[]> {
  const response = await fetch(
    `${RADIO_BROWSER_API}/stations/byname/${encodeURIComponent(name)}?limit=${limit}&order=votes&reverse=true&hidebroken=true`
  );
  if (!response.ok) throw new Error('Failed to fetch stations');
  const data = await response.json();
  return data.map(transformStation);
}

async function searchStations(query: string, limit = 20): Promise<RadioStation[]> {
  const response = await fetch(
    `${RADIO_BROWSER_API}/stations/byname/${encodeURIComponent(query)}?limit=${limit}&order=votes&reverse=true&hidebroken=true`
  );
  if (!response.ok) throw new Error('Failed to search stations');
  const data = await response.json();
  return data.map(transformStation);
}

async function fetchStationsForRegion(regionId: string): Promise<RadioStation[]> {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region) return [];

  const curatedList = CURATED_STATIONS[regionId] || [];
  
  // First try to fetch curated stations by name
  const curatedPromises = curatedList.map(async (curated) => {
    const stations = await fetchStationsByName(curated.searchName, 3);
    // Return the best match with proper name display
    if (stations.length > 0) {
      const station = stations[0];
      // Keep original name from API which is more accurate
      return station;
    }
    return null;
  });

  const curatedResults = await Promise.all(curatedPromises);
  const validCurated = curatedResults.filter((s): s is RadioStation => s !== null);

  // Also fetch by country to fill gaps
  const countryStations = await Promise.all(
    region.countries.map(country => fetchStationsByCountry(country, 6))
  );
  
  const countryFlat = countryStations.flat();
  
  // Combine: curated first, then country stations (avoiding duplicates)
  const seenIds = new Set(validCurated.map(s => s.id));
  const combined = [...validCurated];
  
  for (const station of countryFlat) {
    if (!seenIds.has(station.id) && combined.length < 12) {
      combined.push(station);
      seenIds.add(station.id);
    }
  }
  
  return combined.slice(0, 12);
}

export function useStationsByRegion(regionId: string) {
  return useQuery({
    queryKey: ['stations', 'region', regionId],
    queryFn: () => fetchStationsForRegion(regionId),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useSearchStations(query: string) {
  return useQuery({
    queryKey: ['stations', 'search', query],
    queryFn: () => searchStations(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePopularStations() {
  return useQuery({
    queryKey: ['stations', 'popular'],
    queryFn: async () => {
      const response = await fetch(
        `${RADIO_BROWSER_API}/stations/topvote/50?hidebroken=true`
      );
      if (!response.ok) throw new Error('Failed to fetch popular stations');
      const data = await response.json();
      return data.map(transformStation) as RadioStation[];
    },
    staleTime: 1000 * 60 * 10,
  });
}
