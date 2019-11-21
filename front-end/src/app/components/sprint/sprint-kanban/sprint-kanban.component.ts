import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute} from '@angular/router';

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
  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sprintId = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskBySprint(this.sprintId).subscribe(tasks => {
      this.handleTasksBySprint(tasks);
    },
      error => {
       console.log(error);
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
