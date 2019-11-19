import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private useraddUrl = environment.BACK_END_URL_WITHOUT_API + '/signup';
  private userConnectUrl = environment.BACK_END_URL_WITHOUT_API + '/signin';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.useraddUrl);
  }

  addUser(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(this.useraddUrl, user, httpOptions);
  }

  connect(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(this.userConnectUrl, user, httpOptions);
  }

  deleteUser(userId: string) {
    return this.http.delete<Response>(this.useraddUrl + '/' + userId);
  }

  getUser(userId: string) {
    return this.http.get<User>(this.useraddUrl + '/' + userId);
  }

  updateUser(user: User, id: string) {
    return this.http.put<Response>(this.useraddUrl + '/' + id, user, httpOptions);
  }

}
