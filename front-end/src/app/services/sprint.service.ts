import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Sprint } from '../models/sprint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintUrl = environment.BACK_END_URL + '/sprint';
  private sprintNextUrl = environment.BACK_END_URL + '/sprint/next';
  private sprintByProjectUrl = environment.BACK_END_URL + '/sprint/byproject';

  constructor(private http: HttpClient) { }

  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.sprintUrl);
  }

  addSprint(sprint: Sprint) {
    return this.http.post<Response>(this.sprintUrl, sprint, httpOptions);
  }

  deleteSprint(sprintNum: number) {
    return this.http.delete<Response>(this.sprintUrl + '/' + sprintNum);
  }

  getSprint(sprintNum: string) {
    return this.http.get<Sprint>(this.sprintUrl + '/' + sprintNum);
  }

  getNextSprint(sprintNum: string) {
    return this.http.get<Sprint>(this.sprintNextUrl + '/' + sprintNum);
  }

  getSprintByProject(projectId: number) {
    return this.http.get<Sprint[]>(this.sprintByProjectUrl + '/' + projectId);
  }

  updateSprint(sprint: Sprint, sprintNum: string) {
    return this.http.put<Response>(this.sprintUrl + '/' + sprintNum, sprint, httpOptions);
  }

}
