import type { Chapter } from '../types/chapter';

import chapter1 from './chapters/chapter1.json';
import chapter2 from './chapters/chapter2.json';
import chapter3 from './chapters/chapter3.json';
import chapter4 from './chapters/chapter4.json';
import chapter5 from './chapters/chapter5.json';
import chapter6 from './chapters/chapter6.json';
import chapter7 from './chapters/chapter7.json';
import chapter8 from './chapters/chapter8.json';
import chapter9 from './chapters/chapter9.json';
import chapter10 from './chapters/chapter10.json';
import chapter11 from './chapters/chapter11.json';
import chapter12 from './chapters/chapter12.json';
import chapter13 from './chapters/chapter13.json';

export const chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
  chapter9,
  chapter10,
  chapter11,
  chapter12,
  chapter13,
] as Chapter[];

export const getChapterById = (id: number): Chapter | undefined =>
  chapters.find((c) => c.id === id);

export const getTotalChapters = (): number => chapters.length;

export const getChapterReadingTime = (id: number): number => {
  const ch = getChapterById(id);
  return ch?.readingTime ?? 5;
};
