import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-sprint-kanban',
  templateUrl: './sprint-kanban.component.html',
  styleUrls: ['./sprint-kanban.component.css']
})
export class SprintKanbanComponent implements OnInit {
  taskTodo: Task[] = [];
  taskEncours: Task[] = [];
  taskEnTermine: Task[] = [];
  allTasks: Task[] = [];
  sprintId: string;
  configSnackBar = new MatSnackBarConfig();
  constructor(private taskService: TaskService, private route: ActivatedRoute,
              private  router: Router, public snackBar: MatSnackBar) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('id');
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

  handleTasksBySprint(tasks) {
      this.allTasks = tasks;
      this.taskTodo = tasks.filter(task => task.state === 'TODO');
      this.taskEncours = tasks.filter(task => task.state === 'DOING');
      this.taskEnTermine = tasks.filter(task => task.state === 'DONE');
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
