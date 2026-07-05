import { useState, useEffect } from 'react';

export function useSavedGames() {
  const [savedGames, setSavedGames] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saved_games');
    if (stored) {
      try {
        setSavedGames(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse saved games', e);
      }
    }
  }, []);

  const toggleSave = (gameId: string) => {
    setSavedGames((prev) => {
      const isSaved = prev.includes(gameId);
      const next = isSaved ? prev.filter((id) => id !== gameId) : [...prev, gameId];
      localStorage.setItem('saved_games', JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (gameId: string) => savedGames.includes(gameId);

  return { savedGames, toggleSave, isSaved };
}
