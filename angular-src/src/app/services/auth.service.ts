import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authToken: any;
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

  register(user: any) {
    this.http.post(`${this.apiUrl}/user/register`, user, { headers: this.setHeader() })
  }

}
