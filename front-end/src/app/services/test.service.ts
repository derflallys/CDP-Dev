import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Test} from '../models/test';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private testUrl = environment.BACK_END_URL + '/test';

  constructor(private http: HttpClient) { }

  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(this.testUrl);
  }
  getTest(testId: number) {
    return this.http.get<Test>(this.testUrl + '/' + testId);
  }
  addTest(test: Test) {
    return this.http.post(this.testUrl, test, httpOptions);
  }

  deleteTest(testId: number) {
    return this.http.delete<Response>(this.testUrl + '/' + testId);
  }
}
