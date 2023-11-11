import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Examination } from 'src/app/models/examination.model';
import { Specialization } from 'src/app/models/specialization.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-managerrequests',
  templateUrl: './managerrequests.component.html',
  styleUrls: ['./managerrequests.component.css']
})
export class ManagerrequestsComponent implements OnInit {

  constructor(private examinationService: ExaminationService, private specializationService: SpecializationsService, private ruter: Router) { }

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
        localStorage.setItem('activePage', 'Managerrequests');
        localStorage.setItem('registered', 'yes');
        localStorage.setItem('type', 'manager');
    
        this.examinationService.getRequests().subscribe((examinations: Examination[])=>{
          this.examinations = examinations
    
          this.selectedOption = ""
          if(this.examinations.length != 0 || this.selectedOption != "") {
            this.footBool = true
          } else {
            this.footBool = false
          }
        })
    
        this.specializationService.getAllSpecializations().subscribe((specializations: Specialization[])=>{
          this.specializations = specializations
    
          this.options = []
          this.specializations.forEach(specialization => {
            this.options.push(specialization.specialization)
          });
        })
    
        this.word = ""
        this.name = ""
        this.duration = ""
        this.price = null
        this.specialization = ""
        this.branch = ""
        this.doctors = []
        this.show = false
    
        this.message = ""
        this.newSpecialization = ""
        this.newBranch = ""
    
        this.specBool = false
        this.optionExaminations = []
    
        this.selectedOption = ""
        this.addBool = false
        this.updateBool = false
        this.deleteBool = false
        this.selectedName = ""
        this.selectedPrice = null
        this.newPrice = null
    
        this.nameForm = ""
        this.durationForm = null
        this.priceForm = null
        this.branchForm = ""
        this.doctorsForm = []
      }
    }
  }

  admin: Admin

  examinations: Examination[]
  specializations: Specialization[]

  word: string
  name: string
  duration: string
  price: number
  specialization: string
  branch: string
  doctors: string[]
  show: boolean

  message: string
  newSpecialization: string
  newBranch: string

  options: string[] 
  selectedOption: string
  specBool: boolean
  optionExaminations: Examination[]

  addBool: boolean
  updateBool: boolean
  deleteBool: boolean
  selectedName: string
  selectedPrice: number
  newPrice: number

  nameForm: string
  durationForm: number
  priceForm: number
  branchForm: string
  doctorsForm: string[]

  footBool:boolean

  accept(name, duration, price, specialization, branch, doctors) {
    this.show = true 
    this.word = "Prihvati"
    this.name = name
    this.duration = duration
    this.price = price
    this.specialization = specialization
    this.branch = branch
    this.doctors = doctors
  }

  denny(name, duration, price,specialization, branch, doctors) {
    this.show = true
    this.word = "Odbij"
    this.name = name
    this.duration = duration
    this.price = price
    this.specialization = specialization
    this.branch = branch
    this.doctors = doctors
  }

  action() {
    if(this.word == "Prihvati") {
      this.examinationService.updateRequest(this.name).subscribe()
      window.location.reload()
    } else {
      if(this.word == "Odbij") {
        this.examinationService.deleteRequest(this.name).subscribe()
        window.location.reload()
      }
    }
  }

  no() {
    this.show = false
  }

  addSpecialization() {
    if(this.newSpecialization == "") {
      this.message = "Unesite specijalizaciju!"
    } else {
      if(this.newBranch == "") {
        this.message = "Unesite ogranak!"
      } else {
        this.specializationService.addSpecialization(this.newSpecialization, this.newBranch).subscribe()
        window.location.reload()
      }
    }
  }

  onOptionSelected(spec) {
    this.specBool = true
    this.examinationService.getBySpecialization(spec).subscribe((examinations: Examination[])=>{
      this.optionExaminations = examinations
    })
  }

  addShow() {
    this.message = ""
    this.addBool = true
    const foundSpecialization = this.specializations.find(spec => spec.specialization === this.selectedOption);
    this.branchForm = foundSpecialization.branch
  }

  addHide() {
    this.addBool = false
  }

  updateShow(name, price) {
    this.message = ""
    this.selectedName = name
    this.selectedPrice = price
    this.updateBool = true
  }

  updateHide() {
    this.updateBool = false
  }

  deleteShow(name) {
    this.message = ""
    this.selectedName = name
    this.deleteBool = true
  }

  deleteHide() {
    this.deleteBool = false
  }

  add() {
    if(this.nameForm == "") {
      this.message = "Unesite naziv pregleda!"
    } else {
      if(this.durationForm == null) {
        this.message = "Unesite trajanje pregleda!"
      } else {
        if(this.priceForm == null) {
          this.message = "Unesite cenu pregleda!"
        } else {
          this.examinationService.addExamination(this.nameForm, this.durationForm, this.priceForm, this.selectedOption, this.branchForm, this.doctorsForm).subscribe()
          window.location.reload()
        }
      }
    }
  }

  update() {
    if(this.newPrice == null) {
      this.message = "Unesite novu cenu!"
    } else {
      this.examinationService.updatePrice(this.selectedName, this.newPrice).subscribe()
      window.location.reload()
    }
  }

  delete() {
    this.examinationService.deleteRequest(this.selectedName).subscribe()
    window.location.reload()
  }

}
