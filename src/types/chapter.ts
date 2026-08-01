export interface ContentBlock {
  type: 'paragraph' | 'dialogue' | 'quote' | 'section-break' | 'emphasis' | 'heading';
  text?: string;
  speaker?: string;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle?: string;
  date?: string;
  quote: string;
  quoteAuthor?: string;
  endQuote?: string;
  image: string;
  music?: string;
  atmosphere: 'particles' | 'leaves' | 'rain' | 'snow' | 'golden' | 'none';
  readingTime: number; // minutes
  content: ContentBlock[];
}

export interface Bookmark {
  chapterId: number;
  chapterTitle: string;
  savedAt: string;
}

export interface FavoriteQuote {
  id: string;
  text: string;
  chapterId: number;
  chapterTitle: string;
}

export type FontFamily = 'playfair' | 'lora' | 'inter' | 'eb-garamond';
export type Theme = 'dark' | 'light';

export interface ReadingSettings {
  fontSize: number;
  fontFamily: FontFamily;
  lineHeight: number;
  theme: Theme;
}
