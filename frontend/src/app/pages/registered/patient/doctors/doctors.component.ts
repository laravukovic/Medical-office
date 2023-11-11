import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Doctor } from 'src/app/models/doctor.model'
import { Patient } from 'src/app/models/patient.model'
import { DoctorService } from 'src/app/services/doctor.service'

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(private doctorService: DoctorService, private ruter: Router) { }

  ngOnInit(): void {
    const logedUserJSON = localStorage.getItem('loged')
    if (!logedUserJSON) {
      this.ruter.navigate(['']);
    } else {
      this.patient = JSON.parse(logedUserJSON)

      if(this.patient.type != "patient") {
        localStorage.setItem('activePage', 'Home')
        localStorage.setItem('registered', 'no')
        localStorage.removeItem('type')
        localStorage.removeItem('loged')

        this.ruter.navigate(['']);
      } else {
        localStorage.setItem('activePage', 'Doctors')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'patient')
    
        this.direction = "inc"
        this.type = "firstname"
    
        this.firstname = ""
        this.lastname = ""
        this.specialization = ""
        this.branch = ""
    
        this.doctorService.getAllDoctors().subscribe((doctors : Doctor[])=>{
          this.allDoctors = doctors
          this.shownDoctors = doctors
        })
      }
    }
  }

  patient: Patient

  allDoctors: Doctor[]
  shownDoctors: Doctor[]
  direction: string
  type: string
  firstname: string
  lastname: string
  specialization: string
  branch: string

  sort() {
    if(this.direction == "inc") {
      if(this.type == "firstname") {
        this.shownDoctors.sort((a, b)=>{
          if(a.firstname < b.firstname) {
            return -1
          } 
          if(a.firstname > b.firstname) {
            return 1
          } 
          return 0
        })
      } else {
        if(this.type == "lastname") {
          this.shownDoctors.sort((a, b)=>{
            if(a.lastname < b.lastname) {
              return -1
            } 
            if(a.lastname > b.lastname) {
              return 1
            } 
            return 0
          })
        } else {
          if(this.type == "specialization") {
            this.shownDoctors.sort((a, b)=>{
              if(a.specialization < b.specialization) {
                return -1
              } 
              if(a.specialization > b.specialization) {
                return 1
              } 
              return 0
            })
          } else {
            this.shownDoctors.sort((a, b)=>{
              if(a.branch < b.branch) {
                return -1
              } 
              if(a.branch > b.branch) {
                return 1
              } 
              return 0
            })
          }
        }
      }
    } else {
      if(this.type == "firstname") {
        this.shownDoctors.sort((a, b)=>{
          if(a.firstname < b.firstname) {
            return 1
          } 
          if(a.firstname > b.firstname) {
            return -1
          } 
          return 0
        })
      } else {
        if(this.type == "lastname") {
          this.shownDoctors.sort((a, b)=>{
            if(a.lastname < b.lastname) {
              return 1
            } 
            if(a.lastname > b.lastname) {
              return -1
            } 
            return 0
          })
        } else {
          if(this.type == "specialization") {
            this.shownDoctors.sort((a, b)=>{
              if(a.specialization < b.specialization) {
                return 1
              } 
              if(a.specialization > b.specialization) {
                return -1
              } 
              return 0
            })
          } else {
            this.shownDoctors.sort((a, b)=>{
              if(a.branch < b.branch) {
                return 1
              } 
              if(a.branch > b.branch) {
                return -1
              } 
              return 0
            })
          }
        }
      }
    }
  }

  search() {
    this.shownDoctors = []
    
    if(this.firstname.length != 0 || this.lastname.length != 0 || this.specialization.length != 0 || this.branch.length != 0) {
      this.allDoctors.forEach(doctor => {
        if(doctor.firstname.toLowerCase() == this.firstname.toLowerCase()) {
          this.shownDoctors.push(doctor)
        }
        if(doctor.lastname.toLowerCase() == this.lastname.toLowerCase()) {
          this.shownDoctors.push(doctor)
        }
        if(doctor.specialization.toLowerCase() == this.specialization.toLowerCase()) {
          this.shownDoctors.push(doctor)
        }
        if(doctor.branch.toLowerCase() == this.branch.toLowerCase()) {
          this.shownDoctors.push(doctor)
        }
      });
    } else {
      this.allDoctors.forEach(doctor => {
        this.shownDoctors.push(doctor)
      })
    }
  }
}
