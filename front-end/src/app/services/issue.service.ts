import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Issue }  from '../models/issue';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueUrl = environment.BACK_END_URL + '/issue';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.issueUrl);
  }

  addIssue(issue: Issue) {
    return this.http.post(this.issueUrl, issue, httpOptions);
  }

  deleteIssue(issueId: number) {
    return this.http.delete<Response>(this.issueUrl + '/' + issueId);
  }

  getIssue(issueId: number) {
    return this.http.get<Issue>(this.issueUrl + '/' + issueId);
  }

  updateIssue(issue: Issue, id: number) {
    return this.http.put<Response>(this.issueUrl + '/' + id, issue, httpOptions);
  }
}
