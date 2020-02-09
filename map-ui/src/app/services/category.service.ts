import { Injectable } from '@angular/core';
import {Categories, Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  public getCategories(): string[] {
    return Object.keys(Categories);
  }
  public getIconPath(category: string): string {
    if(category === 'point of interest') {
      return '/assets/point_of_interest.png';
    }
    return '/assets/' + category.replace(' ', '_').toLowerCase() + '.png';
  }
}
