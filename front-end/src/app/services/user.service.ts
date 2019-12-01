import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {TokenUser} from '../models/TokenUser';
import {Sprint} from '../models/sprint';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.BACK_END_URL + '/user';
  private useraddUrl = environment.BACK_END_URL_WITHOUT_API + '/signup';
  private userConnectUrl = environment.BACK_END_URL_WITHOUT_API + '/signin';
  private userByProjectUrl = environment.BACK_END_URL + '/user/byproject';


  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }
  getUserByProject(projectId: number) {
  //  return this.http.get<User[]>(this.userByProjectUrl() + '/' + projectId);
  }

  addUser(user: User): Observable<TokenUser> {
    return this.http.post<TokenUser>(this.useraddUrl, user, httpOptions);
  }

  connect(user: User): Observable<TokenUser> {
    return this.http.post<TokenUser>(this.userConnectUrl, user, httpOptions);
  }

  deleteUser(userId: string) {
    return this.http.delete<Response>(this.useraddUrl + '/' + userId);
  }

  updateUser(user: User, id: string) {
    return this.http.put<Response>(this.useraddUrl + '/' + id, user, httpOptions);
  }

}
