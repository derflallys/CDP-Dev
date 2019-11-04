import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-sprint',
  templateUrl: './update-sprint.component.html',
  styleUrls: ['./update-sprint.component.css']
})
export class UpdateSprintComponent implements OnInit {
  sprintId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('id');
  }

}
