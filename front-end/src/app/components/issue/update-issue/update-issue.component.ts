import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssueComponent implements OnInit {
  issueId;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.issueId = this.route.snapshot.paramMap.get('id');
  }

}
