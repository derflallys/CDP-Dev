import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../../models/issue';
import {IssueService} from '../../../services/issue.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css'],
  providers: []
})
export class AddIssueComponent implements OnInit {
  addIssue: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private issueService: IssueService) { }
  priorities = [
    'HIGH', 'MEDIUM', 'LOW'
  ];
  states = [
    'TODO', 'DOING', 'DONE'
  ];
  title = 'Ajouter une issue';

  ngOnInit() {
    this.addIssue =  this.formBuilder.group({
      description: ['En tant que', Validators.required],
      state: ['TODO', Validators.required],
      difficulty: [1, Validators.required],
      priority: ['LOW', Validators.required]
    });
  }

  onSubmit() {
    if (this.addIssue.invalid) {
      return;
    }
    const description = this.addIssue.controls.description.value;
    const state = this.addIssue.controls.state.value;
    const difficulty = Number(this.addIssue.controls.difficulty.value);
    const priority = this.addIssue.controls.priority.value;
    const newIssue  = new Issue(null, description, state, priority, difficulty);
    console.log(newIssue);
    this.issueService.addIssue(newIssue).subscribe(res => {
      console.log(res);
    });
  }
}
