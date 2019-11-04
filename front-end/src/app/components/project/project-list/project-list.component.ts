import {Component, OnInit, ViewChild} from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Project} from '../../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: []
})
export class ProjectListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  projects: MatTableDataSource<Project> = new MatTableDataSource<Project>();

  displayedColumns: string[] = ['createdAt', 'title', 'duration', 'repositoryURL', 'actions'];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      this.projects = new MatTableDataSource(res) ;
      this.projects.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.projects.filter = filterValue.trim().toLowerCase();
    if (this.projects.paginator) {
      this.projects.paginator.firstPage();
    }
  }

}
