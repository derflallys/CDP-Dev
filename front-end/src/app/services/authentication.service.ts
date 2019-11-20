import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';


export const TOKEN_NAME = 'token';

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

  public logout() {
    sessionStorage.clear();
  }

}
