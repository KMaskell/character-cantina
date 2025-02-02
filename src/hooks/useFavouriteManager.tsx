import { useState, useEffect } from 'react';
import { Favourite } from '../types/Characters';

const useFavouriteManager = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  useEffect(() => {
    const storedFavourites = JSON.parse(
      localStorage.getItem('favourites') || '[]',
    );
    setFavourites(storedFavourites);
  }, []);

  const addToFavourites = (character: Favourite) => {
    const updatedFavourites = [...favourites, character];
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const removeFromFavourites = (id?: string) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== id);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const isFavourite = (id?: string) => {
    return favourites.some((fav) => fav.id === id);
  };

  return { favourites, addToFavourites, removeFromFavourites, isFavourite };
};

export default useFavouriteManager;
