import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import { AuthenticationService } from './auth.service';

@Injectable()
export class HttpClient {
  
  baseUrl: string = "/api";

  constructor(
    private http: Http,
    private authService: AuthenticationService
  ) { }

  createAuthorizationHeader(headers:Headers) {
    let token = this.authService.token;
    headers.append('Authorization', token);
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseUrl + url, {
      headers: headers
    });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.baseUrl + url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.baseUrl + url, data, {
      headers: headers
    });
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.baseUrl + url, data, {
      headers: headers
    });
  }
}