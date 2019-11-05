import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssueComponent implements OnInit {

  issueId = this.data.issueId;

  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateIssueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {issueId: null}
  ) { }

    ngOnInit() {
      // this.issueId = this.route.snapshot.paramMap.get('id');
      console.log(this.issueId);
    }

}
