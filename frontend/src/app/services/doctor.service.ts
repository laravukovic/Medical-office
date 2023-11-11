import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllDoctors() {
    return this.http.get(`${this.uri}/doctors/getAllDoctors`)
  }

  getUsername(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/doctors/getUsername`, data)
  }

  getUser(username, password) {
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/doctors/getUser`, data)
  }

  getEmail(email) {
    const data={
      email: email
    }
    return this.http.post(`${this.uri}/doctors/getEmail`, data);
  }

  deleteDoctor(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/doctors/deleteDoctor`, data);
  }

  changePassword(username, password) {
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/doctors/changePassword`, data);
  }

  getAcceptedDoctors() {
    return this.http.get(`${this.uri}/doctors/getAcceptedDoctors`)
  }

}
