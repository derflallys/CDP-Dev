import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-update-sprint',
  templateUrl: './update-sprint.component.html',
  styleUrls: ['./update-sprint.component.css']
})
export class UpdateSprintComponent {

  sprintId = this.data.idSprint;

  constructor(
    public dialogRef: MatDialogRef<UpdateSprintComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {idSprint: null}
  ) { }

}
