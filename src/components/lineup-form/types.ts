import type { Gender } from '@/types';

export interface LineupFormProps {
  gender: Gender;
  group: string;
  teamName: string;
}

export type Step = 'rounds' | 'players' | 'summary' | 'generated';
