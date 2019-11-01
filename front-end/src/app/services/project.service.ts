import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl = environment.BACK_END_URL + '/get/projects';
  private addProjectUrl = environment.BACK_END_URL + '/add/project';
  private deleteProjectUrl = environment.BACK_END_URL + '/delete/project';
  private updateProjectUrl = environment.BACK_END_URL + '/update/project';
  private getProjectUrl = environment.BACK_END_URL + '/get/project';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  addProject(project: Project) {
    return this.http.post<Response>(this.addProjectUrl, project, httpOptions);
  }

  deleteProject(projectTitle: string) {
    return this.http.delete<Response>(this.deleteProjectUrl + '/' + projectTitle);
  }

  getProject(projectTitle: string) {
    return this.http.get<Project>(this.getProjectUrl + '/' + projectTitle);
  }

  updateProject(project: Project, projectTitle: string) {
    return this.http.put<Response>(this.updateProjectUrl + '/' + projectTitle, project, httpOptions);
  }
}
