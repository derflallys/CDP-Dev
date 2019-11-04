import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../services/project.service';
import {Project} from '../../../models/project';
import {Issue} from '../../../models/issue';
import {Sprint} from '../../../models/sprint';
import {IssueService} from '../../../services/issue.service';
import {SprintService} from '../../../services/sprint.service';
import {
  MatDialog,
  MatDialogConfig,
  MatExpansionModule,
  MatPaginator,
  MatSnackBar,
  MatSnackBarConfig,
  MatTableDataSource
} from '@angular/material';
import {AddIssueComponent} from '../../issue/add-issue/add-issue.component';
import {UpdateIssueComponent} from '../../issue/update-issue/update-issue.component';
import {DeleteDialogComponent} from '../../utils/delete-dialog/delete-dialog.component';

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
    const diagoFormIssue = this.dialog.open(AddIssueComponent, {width: '800px', data: {projectId: this.projectId} });
    diagoFormIssue.afterClosed().subscribe(result => {
      this.snackBar.open('✅ Ajout issue effectuée avec succès !', 'Fermer', this.configSnackBar);
      this.refreshIssuesBacklog();
    });
  }

  updateIssue(idIssue) {
    const diagoFormIssue = this.dialog.open(UpdateIssueComponent, {width: '800px', data: {issueId: idIssue} });
    diagoFormIssue.afterClosed().subscribe(result => {
      this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
      this.refreshIssuesBacklog();
    });
  }

  refreshIssuesBacklog() {
    this.issueService.getIssueByProject(this.projectId).subscribe(issues => {
      this.issues = new MatTableDataSource(issues);
      this.issues.paginator = this.paginator;
      this.paginator._changePageSize(this.paginator.pageSize);
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
    this.snackBar.open('⌛ Suppression en cours...', 'Fermer', this.configSnackBar);
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
}
