import { Component, OnInit } from '@angular/core'
import { Doctor } from 'src/app/models/doctor.model'
import { DoctorService } from 'src/app/services/doctor.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    localStorage.setItem('activePage', 'Home')
    localStorage.setItem('registered', 'no')

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
      });
    } else {
      this.allDoctors.forEach(doctor => {
        this.shownDoctors.push(doctor)
      })
    }
  }

}


