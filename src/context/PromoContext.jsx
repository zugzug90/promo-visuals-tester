/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { getAllGameIds, ICON_STRIP_GAMES, SECTIONS } from '../data/games.js';
import {
  generateRandomImageMap,
  generateRandomIconMap,
  getRandomSampleImage,
} from '../utils/promoSamples.js';

const PromoContext = createContext();

function shuffleArray(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleUploadedGroup(prev, groupIds) {
  const groupKeys = Object.keys(prev).filter((key) => groupIds.includes(Number(key)));
  if (groupKeys.length === 0) return {};

  const currentValues = groupKeys.map((key) => prev[key]);

  if (groupKeys.length === 1) {
    const [currentKey] = groupKeys;
    const candidateKeys = groupIds.map(String).filter((id) => id !== currentKey);
    if (candidateKeys.length === 0) return {};
    const nextKey = candidateKeys[Math.floor(Math.random() * candidateKeys.length)];
    return { [nextKey]: currentValues[0] };
  }

  let newKeys = shuffleArray(groupKeys);
  let attempts = 0;

  while (
    attempts < 20 &&
    newKeys.every((key, index) => key === groupKeys[index])
  ) {
    newKeys = shuffleArray(groupKeys);
    attempts += 1;
  }

  if (newKeys.every((key, index) => key === groupKeys[index])) return {};

  return groupKeys.reduce((next, key, index) => {
    next[newKeys[index]] = currentValues[index];
    return next;
  }, {});
}

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
    const coverMap = generateRandomImageMap(allGameIds);
    // Override icon-strip slots with icon-specific samples
    const iconMap = generateRandomIconMap(ICON_STRIP_GAMES.map((g) => g.id));
    return { ...coverMap, ...iconMap };
  });

  const [aspectRatio, setAspectRatio] = useState('16 / 9');
  const [objectFit, setObjectFit] = useState('cover');
  const [highlightMyCovers, setHighlightMyCovers] = useState(false);

  const toggleHighlightMyCovers = () => setHighlightMyCovers((v) => !v);

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

  const cardGroupIds = SECTIONS.flatMap((section) => section.games.map((game) => game.id));
  const iconGroupIds = ICON_STRIP_GAMES.map((game) => game.id);

  const shuffleMyImages = () => {
    setUploadedImages((prev) => {
      const cardShuffle = shuffleUploadedGroup(prev, cardGroupIds);
      const iconShuffle = shuffleUploadedGroup(prev, iconGroupIds);

      const next = { ...prev };
      Object.keys(prev).forEach((key) => {
        if (cardGroupIds.includes(Number(key)) || iconGroupIds.includes(Number(key))) {
          delete next[key];
        }
      });

      return {
        ...next,
        ...cardShuffle,
        ...iconShuffle,
      };
    });
  };

  const randomizeAllImages = () => {
    const allGameIds = getAllGameIds();
    // Reshuffle sample images for unassigned slots; custom uploaded images remain in place
    const newSampleMap = generateRandomImageMap(allGameIds);
    // Regenerate icon strip from icon-specific pool
    const newIconMap = generateRandomIconMap(ICON_STRIP_GAMES.map((g) => g.id));
    setSampleImages({ ...newSampleMap, ...newIconMap });
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
        shuffleMyImages,
        randomizeAllImages,
        clearAllImages,
        aspectRatio,
        setAspectRatio,
        objectFit,
        setObjectFit,
        highlightMyCovers,
        toggleHighlightMyCovers,
      }}
    >
      {children}
    </PromoContext.Provider>
  );
}

export function usePromo() {
  return useContext(PromoContext);
}

