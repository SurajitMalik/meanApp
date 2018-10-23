import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authToken: string;
  private user: any;

  constructor(private http: Http) { }

  setHeader() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return header;
  }

  setAuthToken() {
    let header = this.setHeader();
    header.append('Authorization', sessionStorage.getItem('token'));
    return header;
  }

  storeUserData(token: any, user: any) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, user, { headers: this.setHeader() })
  }

  authenticate(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/authenticate`, user, { headers: this.setHeader() })
  }

  logout() {
    this.user = null;
    this.authToken = "";
    sessionStorage.clear();
  }

}
