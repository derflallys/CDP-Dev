import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { IssueService } from 'src/app/services/issue.service';
import { TaskService } from '../../../services/task.service';
import { Issue } from '../../../models/issue';
import { Sprint } from '../../../models/sprint';
import { Task } from '../../../models/task';

import {
  MatDialog,
  MatDialogConfig,
  MatPaginator,
  MatSnackBar,
  MatSnackBarConfig,
  MatTableDataSource
} from '@angular/material';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { UpdateTaskComponent } from '../../task/update-task/update-task.component';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';
import { UpdateSprintComponent } from '../../sprint/update-sprint/update-sprint.component';

@Component({
  selector: 'app-sprint-overview',
  templateUrl: './sprint-overview.component.html',
  styleUrls: ['./sprint-overview.component.css']
})
export class SprintOverviewComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  title = '';
  sprint: Sprint;
  issues: MatTableDataSource<Issue>;
  tasks: Task[] = [];
  sprintId;
  projectId;
  displayedColumnsIssue: string[] = ['ID', 'Description', 'Priorité', 'Etat'];
  displayedColumnsTask: string[] = ['ID', 'Description', 'Développeur', 'US liées', 'Actions']
  configSnackBar = new MatSnackBarConfig();

  constructor(
    private sprintService: SprintService,
    private issueService: IssueService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('id');
    this.sprintService.getSprint(this.sprintId).subscribe(res => {
      this.sprint = res;
      this.projectId = this.sprint.projectId
      this.title = this.sprint.title;
    });
    this.issueService.getIssueBySprint(this.sprintId).subscribe(issues => {
      this.issues = new MatTableDataSource(issues);
      this.issues.paginator = this.paginator;
    });
    this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  applyFilter(filterValue: string) {
    this.issues.filter = filterValue.trim().toLowerCase();
    if (this.issues.paginator) {
      this.issues.paginator.firstPage();
    }
  }

  addTask() {
    const diagoFormTask = this.dialog.open(AddTaskComponent, {width: '800px', data: {projectId: this.projectId} });
    diagoFormTask.afterClosed().subscribe(error => {
      console.log(error);
      if (error === false) {
        this.snackBar.open('✅ Ajout tâche effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshTasks();
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de l\'ajout !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  updateTask(idTask) {
    const diagoFormTask = this.dialog.open(UpdateTaskComponent, {width: '800px', data: {taskId: idTask} });
    diagoFormTask.afterClosed().subscribe(error => {
      console.log(error);
      if (error === false) {
        this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
        this.refreshTasks();
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de la modification !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

  deleteTask(idTask) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Suppression de la tâche numéro "' + idTask + '"',
      content: 'Êtes-vous sûr de vouloir supprimer cette tâche ? '
    };
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.deleteTask(idTask).subscribe(() => {
          this.snackBar.open('✅ Suppression effectuée avec succès !', 'Fermer', this.configSnackBar);
          this.refreshTasks();
        },
          error => {
            console.log(error);
            this.snackBar.open('❌ Une erreur s\'est produite lors de la suppression !', 'Fermer', this.configSnackBar);
          }
        );
      }
    });
  }

  refreshTasks() {
    // TODO
  }

  updateSprint() {
    const diagoFormSprint = this.dialog.open(UpdateSprintComponent, {width: '800px', data: {idSprint: this.idSelectedSprint} });
    diagoFormSprint.afterClosed().subscribe(error => {
      if (error === false) {
        this.snackBar.open('✅ Modification effectuée avec succès !', 'Fermer', this.configSnackBar);
      } else {
        if (error) {
          this.snackBar.open('❌ Une erreur s\'est produite lors de la modification !', 'Fermer', this.configSnackBar);
        }
      }
    });
  }

}
