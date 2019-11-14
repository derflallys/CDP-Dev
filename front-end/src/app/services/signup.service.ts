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
export class SignupService {

  private userUrl = environment.BACK_END_URL + '/signup';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions);
  }

  deleteUser(userId: string) {
    return this.http.delete<Response>(this.userUrl + '/' + userId);
  }

  getUser(userId: string) {
    return this.http.get<User>(this.userUrl + '/' + userId);
  }

  updateUser(user: User, id: string) {
    return this.http.put<Response>(this.userUrl + '/' + id, user, httpOptions);
  }

}
