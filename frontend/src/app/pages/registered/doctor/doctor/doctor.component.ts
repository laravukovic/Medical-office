import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Examination } from 'src/app/models/examination.model';
import { myLocalHost } from 'src/app/models/path.model';
import { Specialization } from 'src/app/models/specialization.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ExaminationService } from 'src/app/services/examination.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private doctorService: DoctorService, private ruter: Router, private examinationService: ExaminationService, private specializationService: SpecializationsService, private patientService: PatientService) { }

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
        localStorage.setItem('activePage', 'Profile')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'doctor')
    
        this.updateBool = false
        this.changePasswordBool = false
        this.logoutBool = false
    
        this.oldPass = ""
        this.newPass = ""
        this.repeatPass = ""
        
        this.message = ""
        
        this.action = "update"
    
        this.firstname = this.doctor.firstname
        this.lastname = this.doctor.lastname
        this.address = this.doctor.address
        this.email = this.doctor.email
        this.phone = this.doctor.phone
        this.license = this.doctor.license
        this.selectedOption = this.doctor.specialization
        this.branch = this.doctor.branch
        this.type = "doctor"
    
        this.examinationService.getBySpecialization(this.doctor.specialization).subscribe((examinations: Examination[])=>{
          this.examinations = examinations
        })
    
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
  examinations: Examination[]
  specializations: Specialization[]

  options: string[] 
  selectedOption: string
  
  updateBool: boolean
  changePasswordBool: boolean
  logoutBool: boolean
  
  oldPass: string
  newPass: string
  repeatPass: string
  
  message: string
  
  action: string
  
  firstname: string
  lastname: string
  address: string
  email: string
  phone: string
  license: string
  specialization: string
  branch: string
  type: string
  userImage: File = null

  showUpdate() {
    this.updateBool = !this.updateBool
    this.changePasswordBool = false
    this.logoutBool = false
  }

  showChangePassword() {
    this.changePasswordBool = !this.changePasswordBool
    this.updateBool = false
    this.logoutBool = false
  }

  showLogout() {
    this.logoutBool = !this.logoutBool
    this.changePasswordBool = false
    this.updateBool = false
  }

  update() {
    let userData = {
      username: this.doctor.username,
      firstname: this.firstname,
      lastname: this.lastname,
      address : this.address,
      license: this.license,
      phone: this.phone,
      specialization: this.selectedOption,
      type: this.type
    }

    this.patientService.registerUser(userData, this.userImage, this.action).subscribe()

    this.doctor.firstname = this.firstname
    this.doctor.lastname = this.lastname
    this.doctor.address = this.address
    this.doctor.license = this.license
    this.doctor.phone = this.phone
    this.doctor.specialization = this.selectedOption
    this.doctor.branch = this.branch
    this.doctor.type = "doctor"
    localStorage.setItem('loged', JSON.stringify(this.doctor));

    window.location.reload()
  }

  private hasDuplicateAdjacentCharacters(inputString) {
    for (let i = 0; i < inputString.length - 1; i++) {
      if (inputString[i] === inputString[i + 1] || inputString[i].toLowerCase() === inputString[i + 1].toLowerCase()) {
        return true; // Ima iste karaktere
      }
    }
    return false; // Nema iste karaktere
  }

  changePassword() {
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var special = /[~`!@#$%\^&*()\-_=+\[\]{};:\'.,\"\\|/?\>\<]/g;

    if(this.oldPass == "") {
      this.message = "Unesite staru lozinku!";
    } else {
      if(this.oldPass != this.doctor.password) {
        this.message = "Pogrešna lozinka!"
      } else {
        if(this.newPass == "") {
          this.message = "Unesite novu lozinku!";
        } else {
          if(this.repeatPass == "") {
            this.message = "Unesite ponovljenu novu lozinku!";
          } else {
            if((!this.newPass.match(lowerCaseLetters) || !this.newPass.match(upperCaseLetters) || !this.newPass.match(numbers) ||
            !this.newPass.match(special) || !(!this.newPass[0].match(lowerCaseLetters) || !this.newPass[0].match(upperCaseLetters)) ||
            this.newPass.length < 8 || this.newPass.length > 14 || this.hasDuplicateAdjacentCharacters(this.newPass))) {
              this.message = "Lozinka mora da sadrži: minimum 8 a maksimum 14 karaktera, barem jedno veliko slovo, barem jedan broj, barem jedan specijalan simbol, mora početi slovom i dva susedna znaka ne smeju biti ista!";
            } else {
              if(this.newPass != this.repeatPass) {
                this.message = "Nova i ponovljena lozinka moraju da budu iste!";
              } else {
                this.doctorService.changePassword(this.doctor.username, this.newPass).subscribe();
                localStorage.setItem('activePage', 'Home');
                localStorage.setItem('registered', 'no');
                localStorage.removeItem('type');
                localStorage.removeItem('loged');

                this.ruter.navigate(['']);
              }
            }
          }
        }
      }
    }
  }

  logout() {
    localStorage.setItem('activePage', 'Home')
    localStorage.setItem('registered', 'no')
    localStorage.removeItem('type')
    localStorage.removeItem('loged')

    this.ruter.navigate([''])
  }

  no() {
    this.updateBool = false
    this.changePasswordBool = false
    this.logoutBool = false
  }

  onFileSelected(event) {
    //console.log(event)
    this.userImage = <File>event.target.files[0]
  }

  checkIfHis(doctors) {
    const specificName = this.doctor.username; // Replace with the name you want to check
    const isPresent = doctors.includes(specificName);
    return isPresent;
  }

  accept(name) {
    this.examinationService.addDoctorToExamination(this.doctor.username, name).subscribe()
    window.location.reload()
  }

  denny(name) {
    this.examinationService.removeDoctorFromExamination(this.doctor.username, name).subscribe()
    window.location.reload()
  }

  onOptionSelected(spec) {
    const foundSpecialization = this.specializations.find(spec => spec.specialization === this.selectedOption);
    this.branch = foundSpecialization.branch
  }

}
