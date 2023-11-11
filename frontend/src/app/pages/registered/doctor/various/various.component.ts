import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Specialization } from 'src/app/models/specialization.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-various',
  templateUrl: './various.component.html',
  styleUrls: ['./various.component.css']
})
export class VariousComponent implements OnInit {

  constructor(private examinationService: ExaminationService, private specializationService: SpecializationsService, private ruter: Router) { }

  ngOnInit(): void {
    const logedUserJSON = localStorage.getItem('loged')
    if (!logedUserJSON) {
      this.ruter.navigate(['']);
    } else {
      this.doctor = JSON.parse(logedUserJSON)

      if(this.doctor.type != "doctor") {
        localStorage.setItem('activePage', 'Home')
        localStorage.setItem('registered', 'no')
        localStorage.removeItem('type')
        localStorage.removeItem('loged')

        this.ruter.navigate(['']);
      } else {
        localStorage.setItem('activePage', 'Various')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'doctor')

        this.name = ""
        this.duration = null
        this.price = null
        this.branch = ""
        this.doctors = []
        this.message = ""

        this.specializationService.getAllSpecializations().subscribe((specializations: Specialization[])=>{
          this.specializations = specializations

          this.options = []
          this.specializations.forEach(specialization => {
            this.options.push(specialization.specialization)
          });
        })
      }
    }
  }

  doctor: Doctor

  name: string
  duration: number
  price: number
  branch: string
  doctors: string[]
  message: string

  specializations: Specialization[]
  options: string[] 
  selectedOption: string


  insert() {
    if(this.name == "") {
      this.message = "Unesite naziv pregleda!"
    } else {
      if(this.duration == null) {
        this.message = "Unesite dužinu trajanja pregleda!"
      } else {
        if(this.price == null) {
          this.message = "Unesite cenu pregleda!"
        } else {
          if(this.branch == "") {
            this.message = "Unesite ogranak pregleda!"
          } else {
            this.examinationService.insertExamination(this.name, this.duration, this.price, this.selectedOption ,this.branch, this.doctors).subscribe()
            this.message = "Uspešno ste poslali zahtev!"
          }
        }
      }
    }
  }

  onOptionSelected(spec) {
    const foundSpecialization = this.specializations.find(spec => spec.specialization === this.selectedOption);
    this.branch = foundSpecialization.branch
  }

}
