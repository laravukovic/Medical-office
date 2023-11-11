import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private patientService: PatientService, private doctorService: DoctorService, private ruter: Router) { }

  ngOnInit(): void {
    localStorage.setItem('activePage', 'Login')
    localStorage.setItem('registered', 'no')

    this.username = "";
    this.password = "";
    this.message = "";
    this.type = "";
  }

  username: string;
  password: string;
  type: string;
  message: string;

  login() { 
    if(this.username == "") {
      this.message = 'Unesite korisničko ime!';
    } else if(this.password == "") {
      this.message = 'Unesite lozinku!';
    } else {
      if(this.type == "") {
        this.message = "Izaberite tip korisnika!"
      } else {
        if(this.type == "patient") {
          this.patientService.getUsername(this.username).subscribe((patient: Patient)=>{
            if(!patient) {
              this.message = 'Pogrešno korisničko ime!';
            } else {
              this.patientService.getUser(this.username, this.password).subscribe((patient: Patient)=>{
                if(!patient) {
                  this.message = 'Pogrešna lozinka!';
                } else {
                  if(patient.status == "waiting") {
                    this.message = "Korisnik je na čekanju!"
                  } else {
                    if(patient.status == "declined") {
                      this.message = "Korisnik je odbijen!"
                    } else {
                      localStorage.setItem('loged', JSON.stringify(patient));
                      this.ruter.navigate(['patient']);
                    } 
                  }
                }
              })    
            }       
          })
        } else {
          this.doctorService.getUsername(this.username).subscribe((doctor: Doctor)=>{
            if(!doctor) {
              this.message = 'Pogrešno korisničko ime!';
            } else {
              this.doctorService.getUser(this.username, this.password).subscribe((doctor: Doctor)=>{
                if(!doctor) {
                  this.message = 'Pogrešna lozinka!';
                } else {
                  localStorage.setItem('loged', JSON.stringify(doctor));
                  this.ruter.navigate(['doctor']);
                }
              }) 
            }       
          })
        }
      } 
    }
  }

}
