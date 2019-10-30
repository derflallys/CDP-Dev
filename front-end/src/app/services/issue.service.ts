import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Issue} from '../models/issue';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueUrl = environment.BACK_END_URL + '/get/issues';
  private addIssueUrl = environment.BACK_END_URL + '/add/issue';
  private deleteIssueUrl = environment.BACK_END_URL + '/delete/issue';
  private updateIssueUrl = environment.BACK_END_URL + '/update/issue';
  private getIssueUrl = environment.BACK_END_URL + '/get/issue';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issueUrl);
  }

  addIssue(issue: Issue) {
    return this.http.post<Response>(this.addIssueUrl, issue, httpOptions);
  }

  deleteIssue(issueId: number) {
    return this.http.delete<Response>(this.deleteIssueUrl + '/' + issueId);
  }

  getIssue(issueId: number) {
    return this.http.get<Issue>(this.getIssueUrl + '/' + issueId);
  }

  updateIssue(issue: Issue, id: number) {
    return this.http.put<Response>(this.updateIssueUrl + '/' + id, issue, httpOptions);
  }
}
