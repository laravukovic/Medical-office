import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Examination } from 'src/app/models/examination.model';
import { myLocalHost } from 'src/app/models/path.model';
import { Patient } from 'src/app/models/patient.model';
import { Specialization } from 'src/app/models/specialization.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { PatientService } from 'src/app/services/patient.service';
import { ReportService } from 'src/app/services/report.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-managerusers',
  templateUrl: './managerusers.component.html',
  styleUrls: ['./managerusers.component.css']
})
export class ManagerusersComponent implements OnInit {

  constructor(private doctorService: DoctorService, private patientService: PatientService, private scheduleService: ScheduleService, private reportService: ReportService, private examinationService: ExaminationService, private ruter: Router, private specializationService: SpecializationsService) { }

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
        localStorage.setItem('activePage', 'Managerusers');
        localStorage.setItem('registered', 'yes');
        localStorage.setItem('type', 'manager');
    
        this.deletePatientBool = false
        this.patientFirstName = ""
        this.patientLastName = ""
        this.patientUsername = ""
    
        this.deleteDoctorBool = false
        this.doctorFirstName = ""
        this.doctorLastName = ""
        this.doctorUsername = ""
    
        this.updateBoolP = false
        this.updateBoolD = false
    
        this.examinations = []
    
        this.doctorService.getAcceptedDoctors().subscribe((doctors : Doctor[])=>{
          this.doctors = doctors
        })
    
        this.patientService.getAcceptedPatients().subscribe((patients : Patient[])=>{
          this.patients = patients
        })
    
        this.examinationService.getAllExaminations().subscribe((examinations: Examination[])=>{
          this.examinations = examinations
        })
    
        this.specializationService.getAllSpecializations().subscribe((specializations: Specialization[])=>{
          this.specializations = specializations
    
          this.options = []
          this.specializations.forEach(specialization => {
            this.options.push(specialization.specialization)
          });
        })
    
        this.action = "update"
        this.selectedOption = ""
    
        this.userImage = null
        this.message = ""
      }
    }
  }

  admin: Admin

  doctors: Doctor[]
  patients: Patient[]
  examinations: Examination[]

  deletePatientBool: boolean
  patientFirstName: string
  patientLastName: string
  patientUsername: string

  deleteDoctorBool: boolean
  doctorFirstName: string
  doctorLastName: string
  doctorUsername: string

  updateBoolP:boolean
  action: string
  
  usernameP: string
  firstnameP: string
  lastnameP: string
  addressP: string
  emailP: string
  phoneP: string
  typeP: string
  userImage: File = null

  updateBoolD:boolean

  usernameD: string
  firstnameD: string
  lastnameD: string
  addressD: string
  emailD: string
  phoneD: string
  licenseD: string
  selectedOption: string
  branchD: string
  typeD: string

  specializations: Specialization[]
  options: string[]

  message: string

  getStatus(status) {
    if(status == "accepted") {
      return "Odobren"
    }
    if(status == "waiting") {
      return "Čekanje"
    }
    
    return "Odbijen";
  }

  deletePatientShow(first, last, user) {
    this.patientFirstName = first
    this.patientLastName = last
    this.patientUsername = user
    this.deletePatientBool = true
  }

  noPatient() {
    this.deletePatientBool = false
  }

  updatePatientShow(user, firstname, lastname, address, email, phone) {
    this.updateBoolP = !this.updateBoolP

    this.usernameP = user
    this.firstnameP = firstname
    this.lastnameP = lastname
    this.addressP = address
    this.emailP = email
    this.phoneP = phone
    this.typeP = "patient"
  }

  updatePatient() {
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if(!this.emailP.match(emailRegex)) {
      this.message = "Email nije u dobrom formatu!"
    } else {
      this.patientService.getEmail(this.emailP).subscribe((user: Patient)=>{
        console.log(1, user)
        if(!user) {
          this.doctorService.getEmail(this.emailP).subscribe((user1: Doctor)=>{
            console.log(2, user)
            if(!user1) {
              if(!this.phoneP.match(phoneRegex)) {
                this.message = "Broj telefona nije u dobrom formatu!"
              } else {
                let userData = {
                  username: this.usernameP,
                  firstname: this.firstnameP,
                  lastname: this.lastnameP,
                  address : this.addressP,
                  email: this.emailP,
                  phone: this.phoneP,
                  type: this.typeP
                }

                //console.log("ts", this.userImage)
                this.patientService.registerUser(userData, this.userImage, this.action).subscribe()

                window.location.reload()
              }
            } else {
              this.message = "Email koji ste uneli je u upotrebi!"
            }
          })
        } else {
          this.message = "Email koji ste uneli je u upotrebi!"
        }
      })
    }
  }

  deletePatient() {
    this.patientService.deletePatient(this.patientUsername).subscribe()
    this.scheduleService.deleteUserSchedule(this.patientUsername).subscribe()
    this.reportService.deleteUserReport(this.patientUsername).subscribe()
    window.location.reload()
  }

  deleteDoctorShow(first, last, user) {
    this.doctorFirstName = first
    this.doctorLastName = last
    this.doctorUsername = user
    this.deleteDoctorBool = true
  }

  noDoctor() {
    this.deleteDoctorBool = false
  }

  updateDoctorShow(user, firstname, lastname, address, license, phone, spec) {
    this.updateBoolD = !this.updateBoolD

    this.usernameD = user
    this.firstnameD = firstname
    this.lastnameD = lastname
    this.addressD = address
    this.licenseD = license
    this.phoneD = phone
    this.typeD = "doctor"
    if(this.selectedOption == "") {
      this.selectedOption = spec
    }
  }

  updateDoctor() {

    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    if(!this.phoneD.match(phoneRegex)) {
      this.message = "Broj telefona nije u dobrom formatu!"
    } else {
      let userData = {
        username: this.usernameD,
        firstname: this.firstnameD,
        lastname: this.lastnameD,
        address : this.addressD,
        license: this.licenseD,
        phone: this.phoneD,
        specialization: this.selectedOption,
        branch: this.branchD,
        type: this.typeD
      }

      console.log(userData)
  
      this.patientService.registerUser(userData, this.userImage, this.action).subscribe()

      window.location.reload()
    }
  }

  deleteDoctor() {
    this.doctorService.deleteDoctor(this.doctorUsername).subscribe()
    
    this.examinations.forEach(examination => {
      if(examination.doctors.includes(this.doctorUsername)) {
        this.examinationService.removeDoctorFromExamination(this.doctorUsername, examination.name).subscribe()
      }
    });

    this.scheduleService.deleteDoctorSchedule(this.doctorUsername).subscribe()

    window.location.reload()
  }

  onFileSelected(event) {
    //console.log(event)
    this.userImage = <File>event.target.files[0]
  }

  onOptionSelected(spec) {
    const foundSpecialization = this.specializations.find(spec => spec.specialization === this.selectedOption);
    this.branchD = foundSpecialization.branch
    console.log(this.branchD)
  }

  hidePassword = function(password) {
    // Replace the password with asterisks or any other character you prefer
    return '*'.repeat(password.length);
  };
  

}
