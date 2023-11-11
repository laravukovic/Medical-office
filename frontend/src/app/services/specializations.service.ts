import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getAllSpecializations() {
    return this.http.get(`${this.uri}/specializations/getAllSpecializations`)
  }

  addSpecialization(specialization, branch) {
    const data={
      specialization: specialization,
      branch: branch
    }
    return this.http.post(`${this.uri}/specializations/addSpecialization`, data)
  }
}
