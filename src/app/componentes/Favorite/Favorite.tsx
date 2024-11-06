'use client';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FavoriteIcon } from '@heroicons/react/16/solid';
import { addToFavorite, deleteFromFavorite } from '@/app/lib/pokemon';
import { useEffect, useState } from 'react';

interface FavoriteProps {
  name: string;
  isFavorite: boolean;
}

export default function Favorite({ name, isFavorite }: FavoriteProps) {
  const [isActive, setIsActive] = useState(isFavorite);

  useEffect(() => {
    setIsActive(isFavorite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const handleDeleteFromActive = async () => {
    setIsActive(false);
    const res = await deleteFromFavorite(name);
    setIsActive(res);
  };

  const handleAddToFavorite = async () => {
    setIsActive(true);
    const res = await addToFavorite(name);
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
    </>
  );
}
