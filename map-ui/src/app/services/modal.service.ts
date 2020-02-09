import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ModalService {

  private _showNewEvent = new Subject<number[]>();
  showNewEvent$ = this._showNewEvent.asObservable();
  showNewEvent(value: number[]) {
    this._showNewEvent.next(value);
  }

  constructor() {
  }
}
