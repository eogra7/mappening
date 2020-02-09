import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../../services/activity.service';
import { MapboxService } from '../../../services/mapbox-service';
import { Subject } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';

@Component({
  selector: 'app-nearby-events',
  template: `
    <h2>Nearby events</h2>
    <div class="event-list">
      <p class="event-list-empty" *ngIf="(count$ | async) === 0 && !loading">
        Events posted in your area will show up here, but we don't have any
        right now. Why not add one yourself?
      </p>
      <p class="event-list-loading" *ngIf="loading">
        Loading...
      </p>
      <div
        class="event-item nearby-event-item"
        [class.hover]="isHovered(item.eventId)"
        *ngFor="let item of events$ | async"
        (mouseenter)="handleMouseEnter(item)"
        (mouseleave)="handleMouseLeave()"
        (click)="handleClick(item)"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <div class="event-item-time">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M8.49997 0.888916C7.09352 0.888916 5.71866 1.30598 4.54925 2.08735C3.37983 2.86873 2.46838 3.97934 1.93016 5.27872C1.39194 6.57811 1.25111 8.00792 1.5255 9.38734C1.79988 10.7668 2.47715 12.0338 3.47165 13.0283C4.46616 14.0228 5.73324 14.7001 7.11266 14.9745C8.49208 15.2489 9.92189 15.1081 11.2213 14.5698C12.5207 14.0316 13.6313 13.1202 14.4126 11.9507C15.194 10.7813 15.6111 9.40647 15.6111 8.00003C15.6111 6.11404 14.8619 4.3053 13.5283 2.97171C12.1947 1.63812 10.386 0.888916 8.49997 0.888916V0.888916ZM8.49997 14.2222C7.26933 14.2222 6.06633 13.8573 5.04309 13.1736C4.01985 12.4899 3.22233 11.5181 2.75139 10.3812C2.28044 9.24421 2.15722 7.99312 2.39731 6.78613C2.63739 5.57914 3.23 4.47044 4.10019 3.60025C4.97039 2.73006 6.07908 2.13745 7.28607 1.89736C8.49307 1.65728 9.74415 1.7805 10.8811 2.25144C12.0181 2.72239 12.9899 3.51991 13.6736 4.54315C14.3573 5.56638 14.7222 6.76939 14.7222 8.00003C14.7222 9.65026 14.0666 11.2329 12.8997 12.3998C11.7329 13.5667 10.1502 14.2222 8.49997 14.2222Z"
                fill="black"
              />
              <path
                d="M8.90891 8.17782V4.77782C8.90891 4.65994 8.86208 4.5469 8.77873 4.46355C8.69538 4.3802 8.58234 4.33337 8.46446 4.33337C8.34659 4.33337 8.23354 4.3802 8.15019 4.46355C8.06684 4.5469 8.02002 4.65994 8.02002 4.77782V8.65337L10.6422 10.4312C10.6905 10.4675 10.7457 10.4936 10.8045 10.5078C10.8632 10.5221 10.9242 10.5243 10.9838 10.5141C11.0434 10.504 11.1003 10.4818 11.151 10.449C11.2018 10.4161 11.2453 10.3733 11.2789 10.323C11.3124 10.2728 11.3354 10.2162 11.3464 10.1568C11.3574 10.0973 11.3562 10.0363 11.3428 9.97735C11.3294 9.91841 11.3041 9.86283 11.2684 9.81401C11.2328 9.76518 11.1876 9.72413 11.1356 9.69337L8.90891 8.17782Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  x="0.5"
                  y="3.05176e-05"
                  width="16"
                  height="16"
                  fill="white"
                />
              </clipPath>
            </defs>
          </svg>
          <p>{{ item.startTime | amTimeAgo }}</p>
        </div>
      </div>
    </div>
    <div class="show-more" (click)="handleShowMore()" *ngIf="false">
      <!--        <span>Show more</span>-->
      <svg
        width="14"
        height="5"
        viewBox="0 0 14 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 5.00012L0 1.33346V0.00012207L7 3.66679L14 0.00012207V1.33346L7 5.00012Z"
          fill="#686868"
        />
      </svg>
    </div>
  `,

  styleUrls: ['./nearby-events.component.scss'],
})
export class NearbyEventsComponent implements OnInit {
  events$ = this.events.filteredActivities$;
  count$ = this.events$.pipe(map(a => (Array.isArray(a) ? a.length : 0)));
  loading = true;
  checkLoading$ = this.events$
    .pipe(skip(1))
    .subscribe(() => (this.loading = false));
  surpressUnfly = false;
  constructor(
    private readonly events: ActivityService,
    private readonly mapbox: MapboxService,
  ) {}

  isHovered(id) {
    return this.events.hoveredActivity === +id;
  }

  ngOnInit() {}

  handleShowMore() {}

  _mouseEnter = new Subject<number[]>();
  _mouseEnter$ = this._mouseEnter
    .asObservable()
    .pipe(debounceTime(200))
    .subscribe((coords: [number, number]) => this.mapbox.flyTo(coords));
  handleMouseEnter({ coords }) {
    this._mouseEnter.next(coords);
  }

  handleMouseLeave() {
    // if (!this.surpressUnfly) {
    //   this.mapbox.unfly();
    //   this.surpressUnfly = false;
    // }
  }

  handleClick(item) {
    this.surpressUnfly = true;
  }
}
