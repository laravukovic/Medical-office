import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class ExaminationService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getBranch(branch) {
    const data={
      branch: branch
    }
    return this.http.post(`${this.uri}/examinations/getBranch`, data)
  }

  getAllExaminations() {
    return this.http.get(`${this.uri}/examinations/getAllExaminations`)
  }

  getExamination(name) {
    const data={
      name: name
    }
    return this.http.post(`${this.uri}/examinations/getExamination`, data)
  }

  getDoctorsExaminations(doctor) {
    const data={
      doctor: doctor
    }
    return this.http.post(`${this.uri}/examinations/getDoctorsExaminations`, data)
  }

  addDoctorToExamination(doctor, name) {
    const data={
      doctor: doctor,
      name: name
    }
    return this.http.post(`${this.uri}/examinations/addDoctorToExamination`, data)
  }

  removeDoctorFromExamination(doctor, name) {
    const data={
      doctor: doctor,
      name: name
    }
    return this.http.post(`${this.uri}/examinations/removeDoctorFromExamination`, data)
  }

  insertExamination(name, duration, price, specialization, branch, doctors) {
    const data={
      name: name,
      duration: duration,
      price: price,
      specialization: specialization,
      branch: branch,
      doctors: doctors
    }
    return this.http.post(`${this.uri}/examinations/insertExamination`, data);
  }

  getRequests() {
    return this.http.get(`${this.uri}/examinations/getRequests`)
  }

  updateRequest(name) {
    const data={
      name: name
    }
    return this.http.post(`${this.uri}/examinations/updateRequest`, data)
  }

  deleteRequest(name) {
    const data={
      name: name
    }
    return this.http.post(`${this.uri}/examinations/deleteRequest`, data)
  }

  getBySpecialization(specialization) {
    const data={
      specialization: specialization
    }
    return this.http.post(`${this.uri}/examinations/getBySpecialization`, data)
  }

  updatePrice(name, price) {
    const data={
      name: name,
      price: price
    }
    return this.http.post(`${this.uri}/examinations/updatePrice`, data)
  }

  addExamination(name, duration, price, specialization, branch, doctors) {
    const data={
      name: name,
      duration: duration,
      price: price,
      specialization: specialization,
      branch: branch,
      doctors: doctors
    }
    return this.http.post(`${this.uri}/examinations/addExamination`, data);
  }

  

}
