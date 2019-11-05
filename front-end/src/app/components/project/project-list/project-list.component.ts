import { Component, OnInit, ViewChild} from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSnackBar,
  MatSnackBarConfig,
  MatTableDataSource
} from '@angular/material';
import { Project } from '../../../models/project';
import { AddProjectComponent } from '../add-project/add-project.component';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: []
})
export class ProjectListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  projects: MatTableDataSource<Project> = new MatTableDataSource<Project>();

  nbProject: Number

  displayedColumns: string[] = ['createdAt', 'title', 'duration', 'repositoryURL', 'actions'];

  configSnackBar = new MatSnackBarConfig();

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(res => {
      this.projects = new MatTableDataSource(res);
      this.nbProject = res.length
      this.projects.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.projects.filter = filterValue.trim().toLowerCase();
    if (this.projects.paginator) {
      this.projects.paginator.firstPage();
    }
  }

  addProject() {
    const diagoFormProject = this.dialog.open(AddProjectComponent, {width: '800px'});
    diagoFormProject.afterClosed().subscribe(result => {
      this.snackBar.open('✅ Ajout projet effectuée avec succès !', 'Fermer', this.configSnackBar);
      this.refreshProjects();
    });
  }

  updateProject(projectId) {
    const diagoFormProject = this.dialog.open(UpdateProjectComponent, {width: '800px', data: {projectId: projectId} });
    diagoFormProject.afterClosed().subscribe(result => {
      this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
      this.refreshProjects();
    });
  }

  deleteProject(projectId, projectTitle) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Suppression du projet "' + projectTitle + '"',
      content: 'Êtes-vous sûr de vouloir supprimer ce projet ? '
    };
    this.snackBar.open('⌛ Suppression en cours...', 'Fermer', this.configSnackBar);
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        this.projectService.deleteProject(projectId).subscribe(res => {
          this.snackBar.open('✅ Suppression effectuée avec succès !', 'Fermer', this.configSnackBar);
          this.refreshProjects();
        },
          error => {
            console.log(error);
            this.snackBar.open('❌ Une erreur s\'est produite lors de la suppression !', 'Fermer', this.configSnackBar);
          }
        );
      }
    });
  }

  refreshProjects() {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = new MatTableDataSource(projects);
      this.projects.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

}
