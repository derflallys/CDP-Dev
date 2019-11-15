import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import * as JWT from 'jwt-decode';

export const TOKEN_NAME = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = 'api/auth';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(encodedToken: string): Date {
    const token = JWT(encodedToken);

    // @ts-ignore
    if ( token.exp === undefined ) { return null; }

    const date = new Date(0);
    // @ts-ignore
    date.setUTCSeconds(token.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  signin(user): Promise<string> {
    return this.http
      .post(`${this.url}/signin`, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.text());
  }
}
