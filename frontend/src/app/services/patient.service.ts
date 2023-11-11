import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getUsername(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/patients/getUsername`, data)
  }

  getUser(username, password) {
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/patients/getUser`, data)
  }

  getEmail(email) {
    const data={
      email: email
    }
    return this.http.post(`${this.uri}/patients/getEmail`, data);
  }

  registerUser(user, userImage: File, action) {
    console.log(userImage)
    if(action == "register") {
      //console.log(userImage)
      let fd = new FormData()
      fd.append('userImage', userImage)
      fd.append("username", user.username)
      fd.append("password", user.password)
      fd.append("firstname", user.firstname)
      fd.append("lastname", user.lastname)
      fd.append("phone", user.phone)
      fd.append("address", user.address)
      fd.append("email", user.email)
      fd.append("status", user.status)
      fd.append("type", user.type)
    
      fd.append("action", action)

      if(user.type == "doctor") {
        fd.append("license", user.license)
        fd.append("specialization", user.specialization)
        fd.append("branch", user.branch)
      }

      if(userImage != null) {
        fd.append("image", user.username)
      }
      else {
        fd.append("image", "defaultUser")
      }

      //console.log(user);
      return this.http.post(`${this.uri}/registerUser`, fd)
    
    } else {
      let fd = new FormData()
      fd.append('userImage', userImage)
      fd.append("username", user.username)
      fd.append("firstname", user.firstname)
      fd.append("lastname", user.lastname)
      fd.append("address", user.address)
      fd.append("email", user.email)
      fd.append("phone", user.phone)
      fd.append("type", user.type)

      if(user.type == "doctor") {
        fd.append("license", user.license)
        fd.append("specialization", user.specialization)
        fd.append("branch", user.branch)
      }

      if(userImage != null) {
        fd.append("image", user.username)
      }
      else {
        fd.append("image", "defaultUser")
      }

      fd.append("action", action)

      console.log()

      return this.http.post(`${this.uri}/registerUser`, fd)
    }
  }

  changePassword(username, password) {
    const data={
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/patients/changePassword`, data);
  }

  getAllPatients() {
    return this.http.get(`${this.uri}/patients/getAllPatients`)
  }

  deletePatient(username) {
    const data={
      username: username
    }
    return this.http.post(`${this.uri}/patients/deletePatient`, data);
  }

  getRequests() {
    return this.http.get(`${this.uri}/patients/getRequests`);
  }

  updateRequest(username, action) {
    const data={
      username: username,
      action: action
    }
    return this.http.post(`${this.uri}/patients/updateRequest`, data);
  }

  getAcceptedPatients() {
    return this.http.get(`${this.uri}/patients/getAcceptedPatients`)
  }
}
