import { Injectable } from '@angular/core';
import { IActivity } from '../models/activity';
import {debounceTime, filter, map, shareReplay, skip, subscribeOn} from 'rxjs/operators';
import { Environment } from '../models/environment';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/category';
import {
  asapScheduler,
  asyncScheduler,
  BehaviorSubject,
  combineLatest,
  Observable,
  pipe,
  Subject,
} from 'rxjs';
import { LocationService } from './location.service';
import moment from 'moment';

interface AddActivityOptions {
  category: string;
  description: string;
  location: [number, number] | unknown;
  name: string;
  startTime: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  set currentActivity(value: number) {
    this._currentActivity.next(value);
  }

  private _currentActivity = new BehaviorSubject<number | null>(null);
  current$ = this._currentActivity.asObservable().pipe(
    pipe(
      filter(x => x !== null),
      shareReplay(1),
    ),
  );

  hoveredActivity: number;

  private _activities = new BehaviorSubject<IActivity[]>([]);
  activities$: Observable<IActivity[]> = this._activities
    .asObservable()
    .pipe(shareReplay(1));
  _search = new BehaviorSubject<null | string>(null);
  search$ = this._search.asObservable().pipe(subscribeOn(asapScheduler), debounceTime(50));

  s1 = this.search$.subscribe(console.log);

  handleSearch(search: string) {
    this._search.next(search);
  }

  filteredActivities$ = combineLatest([this.activities$, this.search$]).pipe(
    map(([items, _search]) => {
      if(!_search) {
        return items;
      }
      const search = _search.toLowerCase();
      return items.filter((a: IActivity) =>
        ['category', 'name', 'description'].some(
          p =>
            a[p] &&
            a[p]
              .toString()
              .trim()
              .toLowerCase()
              .includes(search),
        ),
      );
    }),
  );
  getEvents$(fresh = false): Observable<IActivity[]> {
    this.http
      .get<IActivity[]>(`${this.env.API_URL}/events/all?t=${Date.now()}`)
      .pipe(
        map((activities: IActivity[]) => {
          let x = activities.map(a => this.parseActivity(a));
          x.sort((a, b) => Date.parse(b.startTime) - Date.parse(a.startTime));
          return x;
        }),
      )
      .subscribe(data => this._activities.next(data));

    return fresh ? this.activities$.pipe(skip(1)) : this.activities$;
  }

  private parseActivity(a): IActivity {
    return { ...a, icon: this.getIcon(a), coords: a.coords.reverse() };
  }

  getById$(id): Observable<IActivity> {
    return this.http
      .get(`${this.env.API_URL}/events/${id}`)
      .pipe(map(this.parseActivity));
  }

  getIcon({ category, icon }: IActivity): string {
    if (icon in Categories) {
      return icon;
    }

    if (category in Categories) {
      return category;
    }

    return 'generic';
  }

  addActivity(options: AddActivityOptions) {
    // console.log(activity);

    let {
      category = 'event',
      description = 'No description',
      location: coords,
      name,
      startTime,
    } = options;

    if (!(Array.isArray(coords) && coords.length === 2)) {
      const { latitude, longitude } = this.location.lastLocation.coords;
      coords = [latitude, longitude];
    }

    this.http
      .post(`${this.env.API_URL}/events`, {
        category,
        description,
        coords,
        name,
        startTime: startTime || new Date().toISOString(),
        eventId: Math.floor(Math.random() * 10000),
      })
      .subscribe(() => this.getEvents$());
  }

  getRelevantDate({ startTime, endTime }: IActivity) {
    const start = moment(startTime);
    const end = moment(endTime);
    if (moment().isBefore(startTime, 'minutes')) {
      return startTime;
    }

    return endTime;
  }

  getDate({ startTime, endTime }: IActivity) {
    return startTime || endTime;
  }

  compareByDates(a: IActivity, b: IActivity) {}

  constructor(
    private readonly env: Environment,
    private readonly http: HttpClient,
    private readonly location: LocationService,
  ) {}
}
