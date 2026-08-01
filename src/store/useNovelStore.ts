import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Bookmark, FavoriteQuote, ReadingSettings, Theme, FontFamily } from '../types/chapter';

interface NovelState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;

  // Reading settings
  settings: ReadingSettings;
  setFontSize: (size: number) => void;
  setFontFamily: (family: FontFamily) => void;
  setLineHeight: (height: number) => void;

  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (chapterId: number) => void;
  isBookmarked: (chapterId: number) => boolean;

  // Favorite quotes
  favoriteQuotes: FavoriteQuote[];
  addFavoriteQuote: (quote: FavoriteQuote) => void;
  removeFavoriteQuote: (id: string) => void;
  isFavoriteQuote: (id: string) => boolean;

  // Music
  isMuted: boolean;
  volume: number;
  isPlaying: boolean;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  setIsPlaying: (playing: boolean) => void;

  // Navigation
  currentChapterId: number;
  setCurrentChapterId: (id: number) => void;

  // UI State
  isTocOpen: boolean;
  isSettingsOpen: boolean;
  isBookmarkPanelOpen: boolean;
  isFullscreen: boolean;
  toggleToc: () => void;
  toggleSettings: () => void;
  toggleBookmarkPanel: () => void;
  toggleFullscreen: () => void;
}

export const useNovelStore = create<NovelState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // Reading Settings
      settings: {
        fontSize: 18,
        fontFamily: 'playfair',
        lineHeight: 1.9,
        theme: 'dark',
      },
      setFontSize: (size) =>
        set((state) => ({ settings: { ...state.settings, fontSize: size } })),
      setFontFamily: (family) =>
        set((state) => ({ settings: { ...state.settings, fontFamily: family } })),
      setLineHeight: (height) =>
        set((state) => ({ settings: { ...state.settings, lineHeight: height } })),

      // Bookmarks
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks.filter((b) => b.chapterId !== bookmark.chapterId), bookmark],
        })),
      removeBookmark: (chapterId) =>
        set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.chapterId !== chapterId) })),
      isBookmarked: (chapterId) => get().bookmarks.some((b) => b.chapterId === chapterId),

      // Favorite Quotes
      favoriteQuotes: [],
      addFavoriteQuote: (quote) =>
        set((state) => ({ favoriteQuotes: [...state.favoriteQuotes, quote] })),
      removeFavoriteQuote: (id) =>
        set((state) => ({ favoriteQuotes: state.favoriteQuotes.filter((q) => q.id !== id) })),
      isFavoriteQuote: (id) => get().favoriteQuotes.some((q) => q.id === id),

      // Music
      isMuted: false,
      volume: 0.3,
      isPlaying: false,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setVolume: (vol) => set({ volume: vol }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),

      // Navigation
      currentChapterId: 1,
      setCurrentChapterId: (id) => set({ currentChapterId: id }),

      // UI State
      isTocOpen: false,
      isSettingsOpen: false,
      isBookmarkPanelOpen: false,
      isFullscreen: false,
      toggleToc: () => set((state) => ({ isTocOpen: !state.isTocOpen, isSettingsOpen: false, isBookmarkPanelOpen: false })),
      toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen, isTocOpen: false, isBookmarkPanelOpen: false })),
      toggleBookmarkPanel: () => set((state) => ({ isBookmarkPanelOpen: !state.isBookmarkPanelOpen, isTocOpen: false, isSettingsOpen: false })),
      toggleFullscreen: () => {
        const next = !get().isFullscreen;
        set({ isFullscreen: next });
        if (next) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      },
    }),
    {
      name: 'novel-store',
      partialize: (state) => ({
        theme: state.theme,
        settings: state.settings,
        bookmarks: state.bookmarks,
        favoriteQuotes: state.favoriteQuotes,
        isMuted: state.isMuted,
        volume: state.volume,
        currentChapterId: state.currentChapterId,
      }),
    }
  )
);
