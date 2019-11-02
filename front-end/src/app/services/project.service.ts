import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  addProject(project: Project) {
    console.log(this.projectUrl)
    return this.http.post(this.projectUrl, project, httpOptions);
  }

  deleteProject(projectId: number) {
    return this.http.delete<Response>(this.projectUrl + '/' + projectId);
  }

  getProject(projectId: number) {
    return this.http.get<Project>(this.projectUrl + '/' + projectId);
  }

  updateProject(project: Project, id: number) {
    return this.http.put<Response>(this.projectUrl + '/' + id, project, httpOptions);
  }
}
