import {Injectable} from '@angular/core';
import {IActivity} from '../models/activity';
import {map} from 'rxjs/operators';
import {Environment} from '../models/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  getEvents$() {
    return this.http.get<IActivity[]>(`${this.env.API_URL}/events/all`).pipe(
      map((activities: IActivity[]) => {
        return activities.map(a => {
          if (a.icon) {
            return a;
          } else {
            return { ...a, icon: this.getIcon(a) };
          }
        });
      }),
    );
  }

  getIcon(activity: IActivity): string {
    return activity.category;
  }

  constructor(
    private readonly env: Environment,
    private readonly http: HttpClient,
  ) {}
}
