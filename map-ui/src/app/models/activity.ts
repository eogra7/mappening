import { Category } from './category';

export interface IActivity {
  name: string;
  description: string;
  // timestamp: string;
  coords: number[];
  category: Category;
  icon: string;
  startTime: string;
  endTime: string;
}
