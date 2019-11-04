import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import {Project} from '../../../models/project';
import {Issue} from '../../../models/issue';
import {Sprint} from '../../../models/sprint';
import {IssueService} from '../../../services/issue.service';
import {SprintService} from '../../../services/sprint.service';
import {MatExpansionModule, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  title = '';
  project: Project ;
  issues: MatTableDataSource<Issue> ;
  sprints: Sprint[] = [];
  projectId;
  displayedColumns: string[] = ['ID', 'Description', 'Priorité', 'Etat', 'actions'];

  constructor(
    private projectService: ProjectService,
    private issueService: IssueService,
    private sprintService: SprintService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(this.projectId).subscribe(res => {
      this.project = res;
      this.title = this.project.title;
    });
    this.sprintService.getSprintByProject(this.projectId).subscribe( sprints => {
      this.sprints = sprints;
    });
    this.issueService.getIssueByProject(this.projectId).subscribe(issues => {
      this.issues = new MatTableDataSource(issues);
      this.issues.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.issues.filter = filterValue.trim().toLowerCase();
    if (this.issues.paginator) {
      this.issues.paginator.firstPage();
    }
  }

  addIssue() {

  }
}
