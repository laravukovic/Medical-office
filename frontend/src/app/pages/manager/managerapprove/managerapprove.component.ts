import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { myLocalHost } from 'src/app/models/path.model';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-managerapprove',
  templateUrl: './managerapprove.component.html',
  styleUrls: ['./managerapprove.component.css']
})
export class ManagerapproveComponent implements OnInit {

  constructor(private patientService: PatientService, private ruter: Router) { }

  ngOnInit(): void {
    const logedUserJSON = localStorage.getItem('loged')
    if (!logedUserJSON) {
      this.ruter.navigate(['manager']);
    } else {
      this.admin = JSON.parse(logedUserJSON)

      if(this.admin.type != "admin") {
        localStorage.setItem('activePage', 'Manager')
        localStorage.setItem('registered', 'manager')
        localStorage.removeItem('type')
        localStorage.removeItem('loged')

        this.ruter.navigate(['manager']);
      } else {
        localStorage.setItem('activePage', 'Managerapprove');
        localStorage.setItem('registered', 'yes');
        localStorage.setItem('type', 'manager');
    
        this.patientService.getRequests().subscribe((patients: Patient[])=>{
          this.patients = patients
    
          if(this.patients.length == 0) {
            this.footBool = false
          } else {
            this.footBool = true
          }
        })
    
        this.word = ""
        this.firstname = ""
        this.lastname = ""
        this.username = ""
        this.show = false
      }
    }
  }

  admin: Admin

  patients: Patient[]

  word: string
  firstname: string
  lastname: string
  username: string
  show: boolean

  footBool: boolean

  getSrcPatient(img) {
    return myLocalHost + "/patient_images/" + img
  }

  getStatus(status) {
    if(status == "accepted") {
      return "Odobren"
    }
    if(status == "waiting") {
      return "Čekanje"
    }
    
    return "Odbijen";
  }

  accept(firstname, lastname, username) {
    this.show = true 
    this.word = "Prihvati"
    this.firstname = firstname
    this.lastname = lastname
    this.username = username
  }

  denny(firstname, lastname, username) {
    this.show = true
    this.word = "Odbij"
    this.firstname = firstname
    this.lastname = lastname
    this.username = username
  }

  action() {
    if(this.word == "Prihvati") {
      this.patientService.updateRequest(this.username, "accepted").subscribe()
      window.location.reload()
    } else {
      if(this.word == "Odbij") {
        this.patientService.updateRequest(this.username, "declined").subscribe()
        window.location.reload()
      }
    }
  }

  no() {
    this.show = false
  }

}
