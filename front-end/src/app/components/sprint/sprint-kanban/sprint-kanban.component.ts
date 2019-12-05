import {Component, OnInit} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {AuthenticationService} from '../../../services/authentication.service';
import {SprintService} from '../../../services/sprint.service';
import {Sprint} from '../../../models/sprint';
import {Location} from '@angular/common';
import {DeleteDialogComponent} from '../../utils/delete-dialog/delete-dialog.component';
import {StepTaskComponent} from '../../task/step-task/step-task.component';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-sprint-kanban',
  templateUrl: './sprint-kanban.component.html',
  styleUrls: ['./sprint-kanban.component.css']
})
export class SprintKanbanComponent implements OnInit {
  taskTodo: Task[] = [];
  taskEncours: Task[] = [];
  taskFinish: Task[] = [];
  allTasks: Task[] = [];
  sprintId: string;
  sprint: Sprint ;
  configSnackBar = new MatSnackBarConfig();
  users: any = [];
  constructor(private taskService: TaskService, private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private sprintService: SprintService, private location: Location,
              public dialog: MatDialog, private projectService: ProjectService,
              private  router: Router, public snackBar: MatSnackBar) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('id');
    this.sprintService.getSprint(this.sprintId).subscribe( res => {
      this.sprint = res;
      if ( this.sprint.state === 'To Start') {
        this.snackBar.open(' Le sprint n\'a pas encore debuté  ❌!', 'Fermer', this.configSnackBar);
        this.location.back();
        return;
      }
      this.getAllUser();
    });
    this.refreshTasks();
  }

  getAllUser() {
    this.projectService.getUsersByProject(this.sprint.projectId).subscribe( users => {
      this.users = users ;
      console.log(this.users);
    });
  }

  openStepTask() {
    this.dialog.open(StepTaskComponent, { width: '800px', data: { tasks: this.allTasks } });
  }

  handleTasksBySprint(tasks) {
      if (tasks.length <= 0) {
        this.snackBar.open('Ajouter des tâches avant de faire le suivi ❌!', 'Fermer', this.configSnackBar);
        this.location.back();
      }
      this.allTasks = tasks;
      this.taskTodo = tasks.filter(task => task.state === 'TODO');
      this.taskEncours = tasks.filter(task => task.state === 'DOING');
      this.taskFinish = tasks.filter(task => task.state === 'DONE');
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.container.data);
      console.log(event.container.id);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let message = ' ';
      const task = event.container.data[event.currentIndex];
      task.dev = this.authenticationService.getIdUser();

      if (event.container.id === 'cours') {
        task.state = 'DOING';
        task.toTest = false;
        task.toDoc = false;
        message = '✅ Cette tâche vous a été affecté !';
      }
      if (event.container.id === 'todo') {
        task.state = 'TODO';
        task.dev = null;
        task.toTest = false;
        task.toDoc = false;
        message = '✅ Cette tâche vous n\'est plus affecté !';
      }

      this.taskService.updateTask(task, task._id).subscribe(res => {
          console.log(res);
          if (message) {
            this.snackBar.open(message, 'Fermer', this.configSnackBar);
          }
          this.refreshTasks();
        },
        error => {
          console.log(error);
          this.snackBar.open('❌ Erreur lors de l\'affection de la tâche  !', 'Fermer', this.configSnackBar);

        }
      );
      if (event.container.id === 'finish') {
        this.taskTest(task);
        this.taskDoc(task);
        task.state = 'DONE';
        message = '';
      }

    }
  }

  getStateTask(idTask, state) {
    let taskU: Task = null;
    if (state === 'TODO') {
      taskU = this.taskTodo.find(task => task._id === idTask);
    }
    if (state === 'DOING') {
      taskU = this.taskEncours.find(task => task._id === idTask);
    }
    if (state === 'DONE') {
      taskU = this.taskFinish.find(task => task._id === idTask);
    }

    if (taskU) {
      const dayLeftTask = this.getNbreDay(new Date(taskU.endDate), new Date() );

      if ((taskU.state === 'TODO' || taskU.state === 'DOING') && dayLeftTask <= 2 ) {
        return 'warn';
      }
      if (taskU.state === 'DONE' ) {
        return 'primary';
      }
    }
    return 'accent';
  }

  showStateTask(idTask, state) {
    switch (this.getStateTask(idTask, state)) {
      case 'primary': return 'OK';
      case 'accent' : return 'Dans les temps';
      case 'warn' : return 'Urgent';
    }
  }

  refreshTasks() {
    this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
        this.handleTasksBySprint(tasks);
      },
      error => {
        console.log(error);
        this.snackBar.open('❌ Veuillez vous connecter  !', 'Fermer', this.configSnackBar);

        if (error.status === 401) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  getNameUser(idUser) {
    const userChoose =  this.users.find(user =>  user.user === idUser);
    if (userChoose) {
      return userChoose.username;
    }
    return ;
  }

  taskTest(task: Task) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    title: ' Tests  Tâche ' + task.taskId,
    content: 'Est ce que cette tâche a été testée ? '
  };
  const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
  dialogRefDelete.afterClosed().subscribe(result => {
    if (result === true) {
      task.toTest = true;
    }
    this.taskService.updateTask(task, task._id).subscribe(res => {
        console.log(res);
        this.refreshTasks();
      },
      error => {
        console.log(error);
        this.snackBar.open('❌ Erreur lors de l\'affection de la tâche  !', 'Fermer', this.configSnackBar);

      }
    );
    });

  }
  taskDoc(task: Task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: ' Documentation  Tâche ' + task.taskId,
      content: 'Est ce que cette tâche a été documentée ? '
    };
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        task.toTest = true;

      }
      this.taskService.updateTask(task, task._id).subscribe(res => {
          console.log(res);
          this.refreshTasks();
        },
        error => {
          console.log(error);
          this.snackBar.open('❌ Erreur lors de l\'affection de la tâche  !', 'Fermer', this.configSnackBar);

        }
      );
    });

  }



  goBack() {
    this.location.back();
  }

  getState() {
    if (this.sprint.state === 'In progress') {
      return 'En cours';
    }
    if (this.sprint.state === 'Completed') {
      return 'Terminé';
    }
    return 'Non Debuté';
  }

  getNbreDay(date1, date2) {
    const diffTime = Math.abs(date1.getTime() - date2.getTime()) ;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getDaysLeft() {
    const date1 = new Date(this.sprint.endDate);
    const date2 = new Date(this.sprint.startDate);
    return this.getNbreDay(date1, date2);
  }

  getStateColor() {
    switch (this.getState()
      ) {
      case 'En cours': return 'primary';
      case 'Terminé': return 'accent';
      case 'Non Debuté': return 'warn';

    }
  }

  getStateTest(idTask: string) {
    const taskU = this.taskFinish.find(task => task._id === idTask);
    if (taskU) {
      if (taskU.toTest) {
        return 'accent';
      } else {
        return 'warn';
      }
    }
    return 'basic';
  }

  getStateDoc(idTask: string) {
    const taskU = this.taskFinish.find(task => task._id === idTask);
    if (taskU) {
      if (taskU.toDoc) {
        return 'accent';
      } else {
        return 'warn';
      }
    }
    return 'basic';
  }

  showStateTest(idTask: string) {
    switch (this.getStateTest(idTask)) {
      case 'accent' : return 'Tâche Testée';
      case 'warn' : return 'Tâche non testée ';
    }
  }
  showStateDoc(idTask: string) {
    switch (this.getStateDoc(idTask)) {
      case 'accent' : return 'Tâche documentée';
      case 'warn' : return 'Tâche non documentée ';
    }
  }
}
