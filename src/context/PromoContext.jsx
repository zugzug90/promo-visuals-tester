/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { getAllGameIds } from '../data/games.js';
import { generateRandomImageMap, getRandomSampleImage } from '../utils/promoSamples.js';

const PromoContext = createContext();

const UPLOADED_STORAGE_KEY = 'yg_promo_custom_uploads';
const LEGACY_STORAGE_KEY = 'yg_promo_images';

export function PromoProvider({ children }) {
  // Load saved user-uploaded images from localStorage (with legacy data migration support)
  const [uploadedImages, setUploadedImages] = useState(() => {
    try {
      const savedUploaded = localStorage.getItem(UPLOADED_STORAGE_KEY);
      if (savedUploaded) {
        return JSON.parse(savedUploaded);
      }
      // Migration from legacy single storage key if user had previous session data
      const legacySaved = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacySaved) {
        const parsed = JSON.parse(legacySaved);
        const customOnly = {};
        Object.entries(parsed).forEach(([id, val]) => {
          if (typeof val === 'string' && val.startsWith('data:')) {
            customOnly[id] = val;
          }
        });
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        if (Object.keys(customOnly).length > 0) {
          localStorage.setItem(UPLOADED_STORAGE_KEY, JSON.stringify(customOnly));
          return customOnly;
        }
      }
    } catch (e) {
      console.warn('Could not read uploaded images from localStorage:', e);
    }
    return {};
  });

  const [sampleImages, setSampleImages] = useState(() => {
    const allGameIds = getAllGameIds();
    return generateRandomImageMap(allGameIds);
  });

  const [aspectRatio, setAspectRatio] = useState('16 / 9');
  const [objectFit, setObjectFit] = useState('cover');

  // Persist custom uploaded images to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(UPLOADED_STORAGE_KEY, JSON.stringify(uploadedImages));
    } catch (e) {
      console.warn('Could not save uploaded images to localStorage:', e);
    }
  }, [uploadedImages]);

  // Combined images map: custom uploaded images override random sample covers
  const images = {
    ...sampleImages,
    ...uploadedImages,
  };

  const setCardImage = (id, dataUrl) => {
    setUploadedImages((prev) => ({
      ...prev,
      [id]: dataUrl,
    }));
  };

  const removeCardImage = (id) => {
    setUploadedImages((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSampleImages((prev) => ({
      ...prev,
      [id]: getRandomSampleImage(),
    }));
  };

  const randomizeAllImages = () => {
    const allGameIds = getAllGameIds();
    // Reshuffle sample images for unassigned slots; custom uploaded images remain in place
    const newSampleMap = generateRandomImageMap(allGameIds);
    setSampleImages(newSampleMap);
  };

  const clearAllImages = () => {
    const allGameIds = getAllGameIds();
    const newSampleMap = generateRandomImageMap(allGameIds);
    setSampleImages(newSampleMap);
    setUploadedImages({});
    try {
      localStorage.removeItem(UPLOADED_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove item from localStorage:', e);
    }
  };

  const isUploaded = (id) => Boolean(uploadedImages[id]);

  return (
    <PromoContext.Provider
      value={{
        images,
        uploadedImages,
        isUploaded,
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

