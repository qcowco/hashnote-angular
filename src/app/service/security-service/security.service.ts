import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = environment.url;
  }

  isLogged(): boolean {
    return localStorage.getItem('access_token') != null;
  }

  public login(username: string, password: string) {
    return this.http.post<JwtUser>(`${this.userUrl}/login`, { username, password });
  }

  public saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public registerUser(username: string, password: string) {
    return this.http.post(`${this.userUrl}/register`, { username, password });
  }

  public getLoggedUser(): string {
    const token = localStorage.getItem('access_token');
    if (token) {
      let payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload).sub;
    }
  }
}

export interface JwtUser {
  token: string;
}
