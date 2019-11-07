import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-update-sprint',
  templateUrl: './update-sprint.component.html',
  styleUrls: ['./update-sprint.component.css']
})
export class UpdateSprintComponent  {
  sprintId;
  constructor(private route: ActivatedRoute,
              public dialogRef: MatDialogRef<UpdateSprintComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {idSprint: null}) {
    this.sprintId = this.data.idSprint;
  }

}
