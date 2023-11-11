import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getDoctor(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/schedules/getDoctor`, data);
  }

  addSchedule(name, date, time, user, doctor, branch) {
    const data={
      name: name,
      date: date,
      time: time,
      user: user,
      doctor: doctor,
      branch: branch
    }
    return this.http.post(`${this.uri}/schedules/addSchedule`, data);
  }

  getUser(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/schedules/getUser`, data);
  }

  deleteSchedule(name, date, time, user, doctor) {
    const data={
      name: name,
      date: date,
      time: time,
      user: user,
      doctor: doctor
    }
    return this.http.post(`${this.uri}/schedules/deleteSchedule`, data);
  }

  getNoReportSchedule(username, doctor) {
    const data={
      username: username,
      doctor: doctor
    }
    return this.http.post(`${this.uri}/schedules/getNoReportSchedule`, data);
  }

  updateReport(name, date, time, user, doctor) {
    const data={
      name: name,
      date: date,
      time: time,
      user: user,
      doctor: doctor
    }
    return this.http.post(`${this.uri}/schedules/updateReport`, data);
  }

  deleteUserSchedule(user) {
    const data={
      user: user
    }
    return this.http.post(`${this.uri}/schedules/deleteUserSchedule`, data);
  }

  deleteDoctorSchedule(doctor) {
    const data={
      doctor: doctor
    }
    return this.http.post(`${this.uri}/schedules/deleteDoctorSchedule`, data);
  }
}
