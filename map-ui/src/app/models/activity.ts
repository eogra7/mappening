import { Category } from './category';

export interface IActivity {
  title: string;
  description: string;
  timestamp: string;
  x: number;
  y: number;
  category: Category;
}
