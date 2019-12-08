import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

export const TOKEN_NAME = 'token';
export const SESSION_USER = 'username';
export const SESSION_USER_ID = 'iduser';
export const SESSION_EMAIL = 'email';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private jwtHelperService: JwtHelperService) { }

  public isAuth(): boolean {
    const token = sessionStorage.getItem(TOKEN_NAME);
    return !this.jwtHelperService.isTokenExpired(token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_NAME);
  }

  public setToken(token: string): void {
    sessionStorage.setItem(TOKEN_NAME, token);
  }

  public setUsername(username: string): void {
    sessionStorage.setItem(SESSION_USER, username);
  }

  public setIdUser(idUser: string): void {
    sessionStorage.setItem(SESSION_USER_ID, idUser);
  }

  public setEmail(email: string): void {
    sessionStorage.setItem(SESSION_EMAIL, email);
  }

  public getIdUser(): string {
    return sessionStorage.getItem(SESSION_USER_ID);
  }

  public getEmail(): string {
    return sessionStorage.getItem(SESSION_EMAIL);
  }



  public getUsername(): string {
    return sessionStorage.getItem(SESSION_USER);
  }

  public logout(): void {
    sessionStorage.clear();
  }

}
