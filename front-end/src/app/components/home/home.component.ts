import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {TaskService} from 'src/app/services/task.service';
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: Task[];
  displayedColumns = ['Projet', 'ID', 'Date début', 'Date fin', 'Lien'];

  constructor(
    private authService: AuthenticationService,
    private taskService: TaskService,
  ) { }

  async ngOnInit() {
    if (this.authService.isAuth()) {
      this.taskService.getTaskByUser(this.authService.getIdUser()).subscribe(
        res => { this.tasks = res; }
      );
    }
  }

}
