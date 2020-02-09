import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categories } from '../../../models/category';
import {ActivityService} from '../../../services/activity.service';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.scss'],
})
export class AddEventFormComponent implements OnInit, OnDestroy {
  openValue = false;
  @Output() openChange = new EventEmitter<boolean>();
  @Input() set open(value) {
    this.openValue = value;
    this.openChange.emit(value);
  }
  get open() {
    return this.openValue;
  }

  form = new FormGroup({
    location: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    startTime: new FormControl(null)

    // icon: new FormControl()
  });

  categories = Object.values(Categories);

  subscriptions = [
    this.modals.showNewEvent$.subscribe(value => {
      this.form.patchValue({location: value});
      return this.open = true;
    })
  ];

  constructor(private readonly activities: ActivityService,
              private readonly modals: ModalService) {}

  ngOnInit(): void {

  }

  handleSubmit() {
    console.log(this.form.value);
    this.open = false;
    this.activities.addActivity(this.form.value);
    this.resetForm();
  }

  handleCancel() {
    this.open = false;
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }


}
