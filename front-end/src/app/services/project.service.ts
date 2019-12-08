import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Project} from '../models/project';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl = environment.BACK_END_URL + '/project';
  private projectByUserUrl = environment.BACK_END_URL + '/project/byuser';
  private projectUserUrl = environment.BACK_END_URL + '/project/user';
  private projectUsers = environment.BACK_END_URL + '/project/users';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }



  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project, httpOptions);
  }

  deleteProject(projectId: string) {
    return this.http.delete<Response>(this.projectUrl + '/' + projectId);
  }

  getProject(projectId: string) {
    return this.http.get<Project>(this.projectUrl + '/' + projectId);
  }

  getProjectByUser(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectByUserUrl + '/' + userId);
  }

  updateProject(project: Project, id: string) {
    return this.http.put<Response>(this.projectUrl + '/' + id, project, httpOptions);
  }

  addUserOnProject(project: Project, id: string, username: string) {
    return this.http.post<Project>(this.projectUserUrl + '/' + id + '/' + username, project, httpOptions);
  }

  getUsersByProject(projectId: string) {
    return this.http.get<[]>(this.projectUsers + '/' + projectId);
  }
}
