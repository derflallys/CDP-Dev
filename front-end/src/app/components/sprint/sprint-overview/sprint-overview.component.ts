import { Component, OnInit } from '@angular/core';
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
  MatSnackBar,
  MatSnackBarConfig,
} from '@angular/material';
import { AddTaskComponent } from '../../task/add-task/add-task.component';
import { UpdateTaskComponent } from '../../task/update-task/update-task.component';
import { DeleteDialogComponent } from '../../utils/delete-dialog/delete-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface TaskLinkIssue {
  id: number;
  description: string;
  priority: string;
  tasks: Task[];
}

@Component({
  selector: 'app-sprint-overview',
  templateUrl: './sprint-overview.component.html',
  styleUrls: ['./sprint-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SprintOverviewComponent implements OnInit {

  title = '';
  sprint: Sprint;
  sprintId;
  projectId;

  issues: Issue[];
  tasks: Task[];
  taskLinkIssue: TaskLinkIssue[];
  displayedColumns = ['ID', 'Description', 'Priorité'];
  displayedColumnsTask = ['ID', 'DoD', 'Date début', 'Date fin', 'Actions'];
  expandedElement: TaskLinkIssue | null;

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
      this.projectId = this.sprint.projectId;
      this.title += this.sprint.title + ' ' + this.sprint.sprintId;
    });
    this.issueService.getIssueBySprint(this.sprintId).subscribe(issues => {
      this.issues = issues;
      this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
        this.tasks = tasks;
        this.generateTaskLinkIssue();
      });
    });
  }

  generateTaskLinkIssue() {
    this.taskLinkIssue = [];
    this.issues.forEach(issue => {
      let relatedTasks = [];
      this.tasks.forEach(task => {
        if (task.issues.includes(issue.issueId)) {
          relatedTasks.push(task);
        }
      });
      this.taskLinkIssue.push({
        id: issue.issueId,
        description: issue.description,
        priority: issue.priority,
        tasks: relatedTasks
      });
    });
  }

  addTask() {
    const diagoFormTask = this.dialog.open(AddTaskComponent, {width: '800px', data: {projectId: this.projectId, sprintId: this.sprintId} });
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
    const diagoFormTask = this.dialog.open(UpdateTaskComponent, {width: '800px', data: {taskId: idTask, sprintId: this.sprintId} });
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
    this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
      this.tasks = tasks;
      this.generateTaskLinkIssue();
    });
  }


}
