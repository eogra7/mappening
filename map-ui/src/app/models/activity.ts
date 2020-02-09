import { Category } from './category';

export interface IActivity {
  name: string;
  description: string;
  // timestamp: string;
  coords: number[];
  category: Category | string;
  icon: string;
  startTime: string;
  endTime: string;
  eventId: number;
}
