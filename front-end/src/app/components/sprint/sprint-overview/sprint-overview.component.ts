import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from '@angular/router';
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
import { Location } from '@angular/common';
import {filter, pairwise} from 'rxjs/operators';

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
  displayedColumnsTask = ['ID', 'DoD', 'Dépendance', 'Date début', 'Date fin', 'Actions'];
  expandedElement: TaskLinkIssue | null;

  configSnackBar = new MatSnackBarConfig();

  constructor(
    private sprintService: SprintService,
    private issueService: IssueService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private location: Location
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
      if ( issues.length <= 0 ) {
        this.snackBar.open('Veuillez definir les issues avant les tâches du sprint  ❌ ', 'Fermer', this.configSnackBar);
        this.location.back();
        return;
      }
      this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
        this.tasks = tasks;
        this.generateTaskLinkIssue();
        this.updateSprint();
      });
    });
  }


  generateTaskLinkIssue() {
    this.taskLinkIssue = [];
    this.issues.forEach(issue => {
      const relatedTasks = [];
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
    const options = { width: '800px', data: { projectId: this.projectId, sprintId: this.sprintId } };
    const diagoFormTask = this.dialog.open(AddTaskComponent, options);
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

  updateSprint() {
    this.sprintService.getSprintByProject(this.projectId).subscribe(sprints => {
        console.log(sprints);
        if ( sprints.filter(sprint => sprint.state === 'In progress' && sprint._id !== this.sprintId ).length > 0 ) {
          this.snackBar.open('Ce sprint n\'a pas encore demarrer car ,il y\'a déjà un sprint en cours  ❌ ', 'Fermer', this.configSnackBar);
        } else {
          if ( this.sprint.state === 'To Start') {
            this.sprint.state = 'In progress';
            this.sprintService.updateSprint(this.sprint, this.sprintId).subscribe( sprint => {
                console.log(sprint);
                this.snackBar.open(' Sprint en Cours ! ✅', 'Fermer', this.configSnackBar);
              },
              error => {
                console.log(error);
                this.snackBar.open(' Erreur lors de la mise à jour de l\'etat du sprint ! ❌ ', 'Fermer', this.configSnackBar);
              }
            );
          }
        }
      }
    );

  }

  updateTask(idTask) {
    const options = { width: '800px', data: { taskId: idTask, sprintId: this.sprintId } };
    const diagoFormTask = this.dialog.open(UpdateTaskComponent, options);
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


  goKanban() {
    if (this.sprint.state === 'To Start') {
      this.snackBar.open(' Le sprint n\'a pas encore debuté  ❌!', 'Fermer', this.configSnackBar);
    } else {
      this.router.navigate(['kanban/' + this.sprintId]);
    }
  }

  goBack() {
    this.location.back();
  }
}
