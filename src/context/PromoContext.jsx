/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { getAllGameIds } from '../data/games.js';
import { generateRandomImageMap, getRandomSampleImage } from '../utils/promoSamples.js';

const PromoContext = createContext();

const STORAGE_KEY = 'yg_promo_images';

export function PromoProvider({ children }) {
  const [images, setImages] = useState(() => {
    const allGameIds = getAllGameIds();
    const defaultRandomMap = generateRandomImageMap(allGameIds);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge saved overrides with default random map for any unassigned cards
        return { ...defaultRandomMap, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read images from localStorage:', e);
    }
    return defaultRandomMap;
  });

  const [aspectRatio, setAspectRatio] = useState('16 / 9');
  const [objectFit, setObjectFit] = useState('cover');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (e) {
      console.warn('Could not save images to localStorage:', e);
    }
  }, [images]);

  const setCardImage = (id, dataUrl) => {
    setImages((prev) => ({ ...prev, [id]: dataUrl }));
  };

  const removeCardImage = (id) => {
    setImages((prev) => ({
      ...prev,
      [id]: getRandomSampleImage(),
    }));
  };

  const randomizeAllImages = () => {
    const allGameIds = getAllGameIds();
    const newRandomMap = generateRandomImageMap(allGameIds);
    setImages(newRandomMap);
  };

  const clearAllImages = () => {
    const allGameIds = getAllGameIds();
    const newRandomMap = generateRandomImageMap(allGameIds);
    setImages(newRandomMap);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove item from localStorage:', e);
    }
  };

  return (
    <PromoContext.Provider
      value={{
        images,
        setCardImage,
        removeCardImage,
        randomizeAllImages,
        clearAllImages,
        aspectRatio,
        setAspectRatio,
        objectFit,
        setObjectFit,
      }}
    >
      {children}
    </PromoContext.Provider>
  );
}

export function usePromo() {
  return useContext(PromoContext);
}
