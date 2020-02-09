import { Injectable } from '@angular/core';
import {from, of, zip} from 'rxjs';
import { IActivity } from '../models/activity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private _activities: IActivity[] = [
    {
      title: 'HackBeanpot 2020',
      description:
        'An independently-run Boston hackathon for curious students, hackers, makers, and beginners.',
      timestamp: 'Ends in 2 days',
      category: 'sport',
      x: 42.350971,
      y: -71.047287,
    },
    {
      title: 'Another event',
      description:
        'Some kind of interesting and spontaneous event. Don’t want to miss this one!',
      timestamp: 'Posted 7 minutes ago',
      category: 'food',
      x: 42.351971,
      y: -71.047287,
    },
  ];

  getEvents$() {
    return zip(from(this._activities).pipe(
      map((a: IActivity) => {
        if (a.icon) {
          return a;
        } else {
          return {...a, icon: this.getIcon(a)};
        }
      }),
    ));
  }

  getIcon(activity: IActivity): string {
    return activity.category;
  }

  constructor() {}
}
