import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Categories} from '../../../models/category';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.scss']
})
export class AddEventFormComponent implements OnInit {

  form = new FormGroup({
    location: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    category: new FormControl(),
    // icon: new FormControl()
  });

  categories = Object.keys(Categories);

  constructor() { }

  ngOnInit(): void {
  }


  handleSubmit(value) {
    console.log(value);
  }
}
