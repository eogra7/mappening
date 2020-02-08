import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class EventService {

  private _events = [
    {
      title: 'HackBeanpot 2020',
      summary:
        'An independently-run Boston hackathon for curious students, hackers, makers, and beginners.',
      timestamp: 'Ends in 2 days',
    },

    {
      title: 'Another event',
      summary:
        'Some kind of interesting and spontaneous event. Don’t want to miss this one!',
      timestamp: 'Posted 7 minutes ago',
    },
  ];

  getEvents$() {
    return of(this._events);
  }

  constructor() {
  }
}
