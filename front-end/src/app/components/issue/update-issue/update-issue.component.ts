import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssueComponent {

  issueId = this.data.issueId;
  role = this.data.role;
  constructor(
    public dialogRef: MatDialogRef<UpdateIssueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {issueId: null,role: null}
  ) { }

}
