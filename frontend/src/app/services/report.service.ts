import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUser(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/reports/getUser`, data);
  }

  insertReport(name, date, time, user, doctor, specialization, branch, reason, diagnosis, therapy, next) {
    const data={
      name: name,
      date: date,
      time: time,
      user: user,
      doctor: doctor,
      specialization: specialization,
      branch: branch, 
      reason: reason, 
      diagnosis: diagnosis, 
      therapy: therapy, 
      next: next
    }
    return this.http.post(`${this.uri}/reports/insertReport`, data);
  }

  deleteUserReport(user) {
    const data={
      user: user
    }
    return this.http.post(`${this.uri}/reports/deleteUserReport`, data);
  }
}
