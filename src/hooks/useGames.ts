import { useEffect, useState } from 'react';
import { GamesData } from '../types';

const CDN_URL = 'https://cdn.jsdelivr.net/gh/nukIeer/gameshieldcdn@master/games.json';

export function useGames() {
  const [data, setData] = useState<GamesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(CDN_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch games data');
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return { data, loading, error, refetch: fetchGames };
}
