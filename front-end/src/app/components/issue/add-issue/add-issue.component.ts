import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../../../models/issue';
import { IssueService } from '../../../services/issue.service';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css'],
  providers: []
})
export class AddIssueComponent implements OnInit {
  addIssue: FormGroup;
  issue: Issue;
  constructor(private formBuilder: FormBuilder,
              private issueService: IssueService) { }
  priorities = [
    'HIGH', 'MEDIUM', 'LOW'
  ];
  states = [
    'TODO', 'DOING', 'DONE'
  ];
  @Input() issueId = null;
  title = 'Ajouter une issue';
  update = false;

  ngOnInit() {
    this.addIssue =  this.formBuilder.group({
      description: ['En tant que', Validators.required],
      state: ['TODO', Validators.required],
      difficulty: [1, Validators.required],
      priority: ['LOW', Validators.required]
    });
    if (this.issueId) {
      this.loadIssue();
    }
  }

  onSubmit() {
    if (this.addIssue.invalid) {
      return;
    }
    const description = this.addIssue.controls.description.value;
    const state = this.addIssue.controls.state.value;
    const difficulty = Number(this.addIssue.controls.difficulty.value);
    const priority = this.addIssue.controls.priority.value;
    if (this.update) {
      const updateIssue = new Issue(this.issue._id, description, state, priority, difficulty);
      this.issueService.updateIssue(updateIssue, this.issue._id).subscribe( res => {
        console.log(res);
        console.log('Update');
      },
        error => {
          console.log(error);
        }
      );
    } else {

      const newIssue = new Issue(null, description, state, priority, difficulty);
      console.log(newIssue);
      console.log('Add');
      this.issueService.addIssue(newIssue).subscribe(res => {
        console.log(res);
      });
    }

  }

  private loadIssue() {
    this.issueService.getIssue(this.issueId).subscribe(res => {
      this.issue = res;
      this.title = 'Modifier l\'issue';
      this.addIssue = this.formBuilder.group({
        description: [this.issue.description, Validators.required],
        state: [this.issue.state, Validators.required],
        difficulty: [this.issue.difficulty, Validators.required],
        priority: [this.issue.priority, Validators.required]
      });
      this.update = true;
    },
      error => {
        console.log(error);
      }
    );
  }
}