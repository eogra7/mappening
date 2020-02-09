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
    return '/assets/' + category + '.png';
  }
}
