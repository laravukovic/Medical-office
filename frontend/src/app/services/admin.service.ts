import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsername(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/admin/getUsername`, data);
  }

  getUser(username, password) {
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/admin/getUser`, data);
  }

  changePassword(username, password) {
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/admin/changePassword`, data);
  }
}
