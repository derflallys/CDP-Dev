import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Sprint} from '../models/sprint';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintUrl = environment.BACK_END_URL + '/get/sprints';
  private addSprintUrl = environment.BACK_END_URL + '/add/sprint';
  private deleteSprintUrl = environment.BACK_END_URL + '/delete/sprint';
  private updateSprintUrl = environment.BACK_END_URL + '/update/sprint';
  private getSprintUrl = environment.BACK_END_URL + '/get/sprint';

  constructor(private http: HttpClient) { }

  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.sprintUrl);
  }

  addSprint(sprint: Sprint) {
    return this.http.post<Response>(this.addSprintUrl, sprint, httpOptions);
  }

  deleteSprint(sprintNum: number) {
    return this.http.delete<Response>(this.deleteSprintUrl + '/' + sprintNum);
  }

  getSprint(sprintNum: number) {
    return this.http.get<Sprint>(this.getSprintUrl + '/' + sprintNum);
  }

  updateSprint(sprint: Sprint, sprintNum: number) {
    return this.http.put<Response>(this.updateSprintUrl + '/' + sprintNum, sprint, httpOptions);
  }
}
