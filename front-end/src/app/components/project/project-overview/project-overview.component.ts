import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

import { Project } from '../../../models/project';
import { Issue } from '../../../models/issue';
import { Sprint } from '../../../models/sprint';
import { IssueService } from '../../../services/issue.service';
import { SprintService } from '../../../services/sprint.service';
import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSnackBar,
  MatSnackBarConfig,
  MatTableDataSource
} from '@angular/material';
import { AddIssueComponent } from '../../issue/add-issue/add-issue.component';
import { UpdateIssueComponent } from '../../issue/update-issue/update-issue.component';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';
import { AddSprintComponent } from '../../sprint/add-sprint/add-sprint.component';
import { UpdateSprintComponent } from '../../sprint/update-sprint/update-sprint.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication.service';
import { ProjectBurndownChartComponent } from '../project-burndown-chart/project-burndown-chart.component';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.css']
})
export class ProjectOverviewComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  title = '';
  project: Project;
  issues: MatTableDataSource<Issue>;
  sprints: Sprint[] = [];
  projectId;
  displayedColumns: string[] = ['ID', 'Description', 'Note', 'Priorité', 'Etat', 'Actions'];
  configSnackBar = new MatSnackBarConfig();
  allIssues: Issue[] = [];
  idSelectedSprint;
  sprintSelected: Sprint = null;
  role: any;

  constructor(
    private projectService: ProjectService,
    private issueService: IssueService,
    private sprintService: SprintService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public authenticationService: AuthenticationService,
    private location: Location
  ) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(this.projectId).subscribe(res => {
      this.project = res;
      this.title = this.project.title;
      this.getRoleUserProject();
    });
    this.sprintService.getSprintByProject(this.projectId).subscribe(sprints => {
      this.sprints = sprints;
      if (this.sprints.length !== 0) {
        this.idSelectedSprint = this.sprints[0]._id;
        this.sprintSelected = this.sprints[0];
      }
      console.log(this.sprints);
    });
    this.issueService.getIssueByProject(this.projectId).subscribe(issues => {
      this.allIssues = issues;
      this.issues = new MatTableDataSource(issues.filter(issue => issue.sprintId === null || issue.sprintId === undefined));
      this.issues.paginator = this.paginator;
    });
  }

  openBurnDownChart() {
    const parameter = { sprints: this.sprints, issues: this.allIssues };
    this.dialog.open(ProjectBurndownChartComponent, { width: '800px', data: parameter });
  }

  getRoleUserProject() {
    const userCo = this.project.users.find(user => user.user === this.authenticationService.getIdUser());
    if (userCo) {
      this.role = userCo.role;
    }
  }

  applyFilter(filterValue: string) {
    this.issues.filter = filterValue.trim().toLowerCase();
    if (this.issues.paginator) {
      this.issues.paginator.firstPage();
    }
  }

  addUser() {
    const diagoFormUser = this.dialog.open(AddUserComponent, {width: '400px', data: {project: this.project} });
    diagoFormUser.afterClosed().subscribe(error => {
      console.log(error);
      if (error === false) {
        this.snackBar.open('✅ Ajout de l\'utilisateur effectuée avec succès !', 'Fermer', this.configSnackBar);
        console.log(this.project.users);
      } else {
        if (error) {
          this.snackBar.open('❌ L\'utilisateur n\'a pas été trouver !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  addIssue() {
    const diagoFormIssue = this.dialog.open(AddIssueComponent, {width: '800px', data: {projectId: this.projectId, role: this.role} });
    diagoFormIssue.afterClosed().subscribe(error => {
      console.log(error);
      if (error === false) {
        this.snackBar.open('✅ Ajout issue effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshIssuesBacklog();
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de l\'ajout !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  updateIssue(idIssue) {
    const diagoFormIssue = this.dialog.open(UpdateIssueComponent, {width: '800px', data: {issueId: idIssue, role: this.role} });
    diagoFormIssue.afterClosed().subscribe(error => {
      console.log(error);
      if (error === false) {
        this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshIssuesBacklog();
        this.refreshSprints();
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de la modification !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  getSprintSelected() {
    console.log('change');
    this.sprintSelected = this.sprints.filter(sprint => sprint._id === this.idSelectedSprint)[0];
  }

  getIssuesBySprint(idSprint) {
    return this.allIssues.filter(issue => issue.sprintId === idSprint);
  }

  addSprint() {
    const diagoFormSprint = this.dialog.open(AddSprintComponent, {width: '800px', data: {projectId: this.projectId} });
    diagoFormSprint.afterClosed().subscribe(error => {
      if (error === false) {
        this.snackBar.open('✅ Ajout sprint effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshSprints();
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de l\'ajout !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  refreshIssuesBacklog() {
    this.issueService.getIssueByProject(this.projectId).subscribe(issues => {
      this.allIssues = issues;
      this.issues = new MatTableDataSource(issues.filter(issue => issue.sprintId === null || issue.sprintId === undefined));
      this.issues.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  refreshSprints() {
    this.sprintService.getSprintByProject(this.projectId).subscribe(sprints => {
      this.sprints = sprints;
      if (this.sprints.length !== 0) {
        const sprintGet = sprints.filter(sprint => sprint._id === this.idSelectedSprint);
        if (sprintGet.length === 0) {
          this.idSelectedSprint = this.sprints[0]._id;
          this.sprintSelected = this.sprints[0];
        } else {
          this.sprintSelected = sprintGet[0];
        }
      } else {
        this.idSelectedSprint = null;
        this.sprintSelected = null;
      }
    });
  }

  deleteIssue(idIssue, numberIssue) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Suppression de l\'issue numéro "' + numberIssue + '"',
      content: 'Êtes-vous sûr de vouloir supprimer cette issue ? '
    };
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        this.issueService.deleteIssue(idIssue).subscribe(() => {
          this.snackBar.open('✅ Suppression effectuée avec succès !', 'Fermer', this.configSnackBar);
          this.refreshIssuesBacklog();
          this.refreshSprints();
        },
          error => {
            console.log(error);
            this.snackBar.open('❌ Une erreur s\'est produite lors de la suppression !', 'Fermer', this.configSnackBar);
          }
        );
      }
    });
  }

  updateSprint() {
    const diagoFormSprint = this.dialog.open(UpdateSprintComponent, {width: '800px', data: {idSprint: this.idSelectedSprint} });
    diagoFormSprint.afterClosed().subscribe(error => {
      if (error === false) {
        this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshSprints();
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de la modification !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  deleteSprint() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Suppression du sprint numéro "' + this.sprintSelected.sprintId + '"',
      content: 'Êtes-vous sûr de vouloir supprimer ce sprint ?'
    };
    this.snackBar.open('⌛ Suppression en cours...', 'Fermer', this.configSnackBar);
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        this.sprintService.deleteSprint(this.idSelectedSprint).subscribe(() => {
            this.snackBar.open('✅ Suppression effectuée avec succès !', 'Fermer', this.configSnackBar);
            this.refreshSprints();
          },
          error => {
            console.log(error);
            this.snackBar.open('❌ Une erreur s\'est produite lors de la suppression !', 'Fermer', this.configSnackBar);
          }
        );
      }
    });
  }

  moveIssueTo(idIssue, to) {
    if (to === 'backlog' && this.sprintSelected.state !== 'To Start') {
      this.snackBar.open(' On ne peut deplacer un issue d\'un sprint en cour ou terminé !❌', 'Fermer', this.configSnackBar);
      return;
    }
    this.snackBar.open('⌛ Déplacement de l\'issue en cours...', 'Fermer', this.configSnackBar);
    console.log(this.idSelectedSprint);
    console.log(idIssue);
    console.log(this.allIssues);
    const issueSelect = this.allIssues.filter(issue => issue._id === idIssue)[0];
    console.log(issueSelect);
    if (to === 'sprint') {
      issueSelect.sprintId = this.idSelectedSprint;
    }
    if (to === 'backlog') {
      issueSelect.sprintId = null;
    }
    this.issueService.updateIssue(issueSelect, idIssue).subscribe(() => {
       this.refreshSprints();
       this.refreshIssuesBacklog();
       this.snackBar.open('✅ Issue déplacée avec succès !', 'Fermer', this.configSnackBar);
    },
      () => {
        this.snackBar.open('❌ Une erreur s\'est produite lors du deplacement !', 'Fermer', this.configSnackBar);
      }
    );
  }

  goBack() {
    this.location.back();
  }

  goToRelease() {
    window.open(this.sprintSelected.release, '_blank');
  }
}
