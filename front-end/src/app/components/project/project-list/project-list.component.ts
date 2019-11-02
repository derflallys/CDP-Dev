import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: []
})
export class ProjectListComponent implements OnInit {

  projects = []

  displayedColumns: string[] = ['createdAt', 'title', 'duration', 'repositoryURL', 'actions'];

  constructor(private projectService: ProjectService) { }

  ngOnInit() { 
    this.projectService.getProjects().subscribe(res => {
      this.projects = res
    });
  }

}
