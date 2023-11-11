import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Doctor } from 'src/app/models/doctor.model'
import { Patient } from 'src/app/models/patient.model'
import { DoctorService } from 'src/app/services/doctor.service'
import { PatientService } from 'src/app/services/patient.service'

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService, private doctorService: DoctorService, private ruter: Router) { }

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
        localStorage.setItem('activePage', 'Profile')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'patient')

        this.updateBool = false
        this.changePasswordBool = false
        this.logoutBool = false

        this.oldPass = ""
        this.newPass = ""
        this.repeatPass = ""

        this.message = ""

        this.action = "update"

        this.firstname = this.patient.firstname
        this.lastname = this.patient.lastname
        this.address = this.patient.address
        this.email = this.patient.email
        this.phone = this.patient.phone
        this.type = "patient"

        this.userImage = null
      }
    }
  }

  patient: Patient

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
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if(!this.email.match(emailRegex)) {
      this.message = "Email nije u dobrom formatu!"
    } else {
      this.patientService.getEmail(this.email).subscribe((user: Patient)=>{
        if(!user || user.email == this.email) {
          this.doctorService.getEmail(this.email).subscribe((user1: Doctor)=>{
            if(!user1) {
              if(!this.phone.match(phoneRegex)) {
                this.message = "Broj telefona nije u dobrom formatu!"
              } else {
                let userData = {
                  username: this.patient.username,
                  firstname: this.firstname,
                  lastname: this.lastname,
                  address : this.address,
                  email: this.email,
                  phone: this.phone,
                  type: this.type
                }

                console.log("ts", this.userImage)
                this.patientService.registerUser(userData, this.userImage, this.action).subscribe()

                this.patient.firstname = this.firstname
                this.patient.lastname = this.lastname
                this.patient.address = this.address
                this.patient.email = this.email
                this.patient.phone = this.phone
                this.patient.type = "patient"
                localStorage.setItem('loged', JSON.stringify(this.patient));

                //window.location.reload()
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
      if(this.oldPass != this.patient.password) {
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
            this.newPass.length < 8 || this.newPass.length > 14) || this.hasDuplicateAdjacentCharacters(this.newPass)) {
              this.message = "Lozinka mora da sadrži: minimum 8 a maksimum 14 karaktera, barem jedno veliko slovo, barem jedan broj, barem jedan specijalan simbol, mora početi slovom i dva susedna znaka ne smeju biti ista!";
            } else {
              if(this.newPass != this.repeatPass) {
                this.message = "Nova i ponovljena lozinka moraju da budu iste!";
              } else {
                this.patientService.changePassword(this.patient.username, this.newPass).subscribe();
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

}
