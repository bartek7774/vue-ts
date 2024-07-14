import type { Emoji } from './Emoji';

export interface Entry {
  id: number;
  body: string;
  emoji: Emoji | null;
  userId: number;
  createdAt: Date;
}
