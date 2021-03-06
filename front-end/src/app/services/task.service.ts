import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Task} from '../models/task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = environment.BACK_END_URL + '/task';
  private taskBySprintUrl = environment.BACK_END_URL + '/task/bysprint';
  private taskByUserUrl = environment.BACK_END_URL + '/task/byuser';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  addTask(task: Task) {
    return this.http.post<Response>(this.taskUrl, task, httpOptions);
  }

  deleteTask(taskNum: number) {
    return this.http.delete<Response>(this.taskUrl + '/' + taskNum);
  }

  getTask(taskNum: number) {
    return this.http.get<Task>(this.taskUrl + '/' + taskNum);
  }

  updateTask(task: Task, taskNum: string) {
    return this.http.put<Response>(this.taskUrl + '/' + taskNum, task, httpOptions);
  }

  getTaskBySprint(sprintId: string) {
    return this.http.get<Task[]>(this.taskBySprintUrl + '/' + sprintId);
  }

  getTaskByUser(userId: string) {
    return this.http.get<Task[]>(this.taskByUserUrl + '/' + userId);
  }

}
