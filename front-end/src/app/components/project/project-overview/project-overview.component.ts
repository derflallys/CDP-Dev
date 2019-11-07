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
  MatSnackBarConfig, MatTable,
  MatTableDataSource
} from '@angular/material';
import { AddIssueComponent } from '../../issue/add-issue/add-issue.component';
import { UpdateIssueComponent } from '../../issue/update-issue/update-issue.component';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';
import {AddSprintComponent} from '../../sprint/add-sprint/add-sprint.component';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import clonedeep from 'lodash.clonedeep';
import {UpdateSprintComponent} from '../../sprint/update-sprint/update-sprint.component';
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
  configSnackBar = new MatSnackBarConfig();
  allIssues: Issue[] = [];
  idselectedSprint ;
  sprintSelected: Sprint = null;

  constructor(
    private projectService: ProjectService,
    private issueService: IssueService,
    private sprintService: SprintService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
    });
    this.sprintService.getSprintByProject(this.projectId).subscribe( sprints => {
      this.sprints = sprints;
      if (this.sprints.length !== 0) {
        this.idselectedSprint = this.sprints[0]._id;
        this.sprintSelected = this.sprints[0];
      }
      console.log(this.sprints);
    });
    this.issueService.getIssueByProject(this.projectId).subscribe(issues => {
      this.allIssues = issues;
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
    const diagoFormIssue = this.dialog.open(AddIssueComponent, {width: '800px', data: {projectId: this.projectId} });
    diagoFormIssue.afterClosed().subscribe(result => {
      console.log(result);

      this.snackBar.open('✅ Ajout issue effectuée avec succès !', 'Fermer', this.configSnackBar);
      this.refreshIssuesBacklog();


    });
  }

  updateIssue(idIssue) {
    const diagoFormIssue = this.dialog.open(UpdateIssueComponent, {width: '800px', data: {issueId: idIssue} });
    diagoFormIssue.afterClosed().subscribe(result => {
        console.log(result);
        this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshIssuesBacklog();

    });
  }
  getSprintSelected() {
    console.log('change');
    this.sprintSelected =  this.sprints.filter( sprint => sprint._id === this.idselectedSprint)[0];
  }
  getIssuesBySprint(idSprint) {
    return  this.allIssues.filter( issue => issue.sprintId === idSprint);
  }



  addSprint() {
    const diagoFormSprint = this.dialog.open(AddSprintComponent, {width: '800px', data: {projectId: this.projectId} });
    diagoFormSprint.afterClosed().subscribe(result => {
        this.snackBar.open('✅ Ajout sprint effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshSprints();

    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.issues.data = clonedeep(this.issues.data);
    // this.dataSource2.data = clonedeep(this.dataSource2.data);
  }

  refreshIssuesBacklog() {
    this.issueService.getIssueByProject(this.projectId).subscribe(issues => {
      this.issues = new MatTableDataSource(issues);
      this.issues.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
    });
  }

  refreshSprints() {
    this.sprintService.getSprintByProject(this.projectId).subscribe( sprints => {
        this.sprints = sprints;
        if (this.sprints.length !== 0 ) {
        this.idselectedSprint = this.sprints[0]._id;
        this.sprintSelected = this.sprints[0];
      } else {
        this.idselectedSprint = null;
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
        this.issueService.deleteIssue(idIssue).subscribe(res => {
          this.snackBar.open('✅ Suppression effectuée avec succès !', 'Fermer', this.configSnackBar);
          this.refreshIssuesBacklog();
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
    const diagoFormSprint = this.dialog.open(UpdateSprintComponent, {width: '800px', data: {idSprint: this.idselectedSprint} });
    diagoFormSprint.afterClosed().subscribe(result => {
      this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
      this.refreshSprints();

    });
  }

  deleteSprint() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Suppression du sprint numéro "' + this.sprintSelected.sprintId + '"',
      content: 'Êtes-vous sûr de vouloir supprimer ce sprint ? '
    };
    this.snackBar.open('⌛ Suppression en cours...', 'Fermer', this.configSnackBar);
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        this.sprintService.deleteSprint(this.idselectedSprint).subscribe(res => {
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
}
