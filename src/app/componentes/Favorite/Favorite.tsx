'use client';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FavoriteIcon } from '@heroicons/react/16/solid';
import { addToFavorite } from '@/app/lib/pokemon';

interface FavoriteProps {
  name: string;
  isFavorite: boolean;
}

export default function Favorite({ name, isFavorite }: FavoriteProps) {
  return (
    <>
      {isFavorite ? (
        <FavoriteIcon className='size-6 absolute top-1 right-1 text-red-700' />
      ) : (
        <HeartIcon
          className='size-6 absolute top-1 right-1 text-red-700'
          onClick={() => addToFavorite(name)}
        />
      )}
    </>
  );
}
