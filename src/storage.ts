import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';
import Storage from 'react-native-storage';

import {useCallback} from 'react';

export const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export const favoritesAtom = atom<Array<string> | null>(null);
export const favoritesStatusAtom = atom<
  null | 'PENDING' | 'COMPLETE' | 'ERROR'
>(null);

let isFirst = true;
export const useLoadFavorites = () => {
  const setFavorites = useSetAtom(favoritesAtom);
  const setStatus = useSetAtom(favoritesStatusAtom);
  if (isFirst) {
    isFirst = false;
    setStatus('PENDING');
    (async () => {
      try {
        const data = await storage.load({
          key: 'favorites',
        });
        setFavorites(data);
        setStatus('COMPLETE');
      } catch (err: any) {
        // any exception including data not found
        // goes to catch()
        switch (err?.name) {
          case 'NotFoundError':
            setFavorites([]);
            setStatus('COMPLETE');
            break;
          default:
            setStatus('ERROR');
            break;
        }
      }
    })();
  }
};

export const useStatus = () => {
  const status = useAtomValue(favoritesStatusAtom);
  return status;
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const add = useCallback(
    async (id: string) => {
      console.log('HERE ADD');
      if (favorites != null) {
        const data = [...favorites, id];
        try {
          await storage.save({
            key: 'favorites', // Note: Do not use underscore("_") in key!
            data,
            expires: null,
          });
          setFavorites(data);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [favorites, setFavorites],
  );

  const remove = useCallback(
    async (id: string) => {
      console.log('HERE REMOVE');
      if (favorites != null) {
        try {
          const data = [...favorites].filter(x => x !== id);
          await storage.save({
            key: 'favorites', // Note: Do not use underscore("_") in key!
            data,
            expires: null,
          });
          setFavorites(data);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [favorites, setFavorites],
  );
  return [favorites, add, remove] as const;
};

export const useFavoriteBook = (id: string) => {
  const [favorites, add, remove] = useFavorites();
  const isFavorite = favorites != null && favorites.includes(id);
  const toggle = useCallback(() => {
    if (favorites != null) {
      if (isFavorite) {
        remove(id);
      } else {
        add(id);
      }
    }
  }, [favorites, id, add, isFavorite, remove]);
  return [isFavorite, toggle] as const;
};
