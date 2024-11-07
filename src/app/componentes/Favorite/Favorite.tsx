'use client';
import { HeartIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FavoriteIcon } from '@heroicons/react/16/solid';
import {
  addToFavorite,
  deleteFromFavorite,
  updatePokemonType,
} from '@/app/lib/pokemon';
import { useEffect, useState } from 'react';
import { PokemonType } from '@/domain/pokemon';

interface FavoriteProps {
  name: string;
  isFavorite: boolean;
  favoriteId: string;
  types: PokemonType[];
}

export default function Favorite({
  name,
  isFavorite,
  types,
  favoriteId,
}: FavoriteProps) {
  const [isActive, setIsActive] = useState(isFavorite);
  const [type, setType] = useState<string>('');

  useEffect(() => {
    setIsActive(isFavorite);
    const allTypes = types.map((typeData) => typeData.type.name).join(', ');
    setType(allTypes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, isFavorite]);

  const handleDeleteFromActive = async () => {
    setIsActive(false);
    const res = await deleteFromFavorite(name);
    setIsActive(res);
  };

  const handleAddToFavorite = async () => {
    setIsActive(true);
    const res = await addToFavorite(name, type);
    setIsActive(res);
  };

  return (
    <>
      {isActive ? (
        <FavoriteIcon
          className='size-6 absolute top-1 right-1 text-red-700'
          onClick={handleDeleteFromActive}
        />
      ) : (
        <HeartIcon
          className='size-6 absolute top-1 right-1 text-red-700'
          onClick={handleAddToFavorite}
        />
      )}
      {favoriteId && (
        <BeakerIcon
          className='size-6 absolute top-1 left-1'
          onClick={() => updatePokemonType(favoriteId)}
        />
      )}
    </>
  );
}
