import { Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Sprint} from '../../../models/sprint';


@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.css']
})
export class AddSprintComponent {
  addSprint: FormGroup;
  sprint: Sprint;

  constructor() { }

  submitted = false;

  onSubmit() { this.submitted = true; }
}
