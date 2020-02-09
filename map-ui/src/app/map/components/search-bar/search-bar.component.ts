import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {asapScheduler, Subject} from 'rxjs';
import {debounceTime, subscribeOn} from 'rxjs/operators';
import {ActivityService} from '../../../services/activity.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  icon: string;
  searchingFor: string;
  extended: boolean;
  categoryService: CategoryService;
  search$ = this.activities.search$.pipe(subscribeOn(asapScheduler));



  constructor(categoryService: CategoryService, private readonly activities: ActivityService) {
    this.extended = false;
    this.searchingFor = 'generic';
    this.categoryService = categoryService;
    this.updateIcon();
  }

  ngOnInit(): void {
  }

  public setFilter(category: string): void {
    this.activities.handleSearch(category);
    this.searchingFor = category;
  }
  public toggleVisibility(): void {
    this.extended = !this.extended;
    this.updateIcon();
  }
  public isExtended(): boolean {
    return this.extended;
  }
  private updateIcon(): void {
    this.icon = this.extended ? 'expand_less' : 'expand_more';
  }


  handleSearch(value: string) {
    this.activities.handleSearch(value);
  }
}
