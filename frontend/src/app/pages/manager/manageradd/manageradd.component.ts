import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { Specialization } from 'src/app/models/specialization.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-manageradd',
  templateUrl: './manageradd.component.html',
  styleUrls: ['./manageradd.component.css']
})
export class ManageraddComponent implements OnInit {

  constructor(private patientService: PatientService, private doctorService: DoctorService, private http: HttpClient, private ruter: Router, private specializationService: SpecializationsService) { }

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
        localStorage.setItem('activePage', 'Manageradd');
        localStorage.setItem('registered', 'yes');
        localStorage.setItem('type', 'manager');
    
        this.username = ""
        this.password = ""
        this.firstname = ""
        this.lastname = ""
        this.phone = ""
        this.address = ""
        this.email = ""
        this.license = ""
        this.branch = ""
        this.type = "doctor"
        this.status = "accepted"
        this.action = "register"

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

  admin: Admin

  organisator: boolean
  message: string

  username : string
  password : string
  repeatPassword : string
  firstname : string
	lastname : string
	phone : string
  address : string
	email : string
  license : string
  specialization : string
  branch : string
	type : string;
	status : string
  action: string
  userImage: File = null

  specializations: Specialization[]
  options: string[] 
  selectedOption: string

  private hasDuplicateAdjacentCharacters(inputString) {
    for (let i = 0; i < inputString.length - 1; i++) {
      if (inputString[i] === inputString[i + 1] || inputString[i].toLowerCase() === inputString[i + 1].toLowerCase()) {
        return true; // Ima iste karaktere
      }
    }
    return false; // Nema iste karaktere
  }

  register() {
    let userData = {
      username: this.username,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      address : this.address,
      license : this.license,
      specialization : this.selectedOption,
      branch : this.branch,
      type: this.type,
      status: this.status
    }

    var lowerCaseLetters = /[a-z]/g
    var upperCaseLetters = /[A-Z]/g
    var numbers = /[0-9]/g
    var special = /[~`!@#$%\^&*()\-_=+\[\]{};:\'.,\"\\|/?\>\<]/g
    var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if(this.username == "") {
      this.message = "Unesite korisničko ime!"
    } else {
      if(this.password == "") {
        this.message = "Unesite lozinku!"
      } else {
        if(!this.password.match(lowerCaseLetters) || !this.password.match(upperCaseLetters) || !this.password.match(numbers) ||
          !this.password.match(special) || !(!this.password[0].match(lowerCaseLetters) || !this.password[0].match(upperCaseLetters)) ||
          this.password.length < 8 || this.password.length > 14 || this.hasDuplicateAdjacentCharacters(this.password)) {
            this.message = "Lozinka mora da sadrži: minimum 8 a maksimum 14 karaktera, barem jedno veliko slovo, barem jedan broj, barem jedan specijalan simbol, mora početi slovom i dva susedna znaka ne smeju biti ista!"    
        } else {
          if(this.repeatPassword == "") {
            this.message = "Unesite ponovljenu lozinku!"
          } else {
            if(this.password != this.repeatPassword) {
              this.message = "Lozinka i ponovljena lozinka moraju biti iste!"
            } else {
              if(this.firstname == "") {
                this.message = "Unesite ime!"
              } else {
                if(this.lastname == "") {
                  this.message = "Unesite prezime!"
                } else {
                  if(this.phone == "") {
                    this.message = "Unesite telefon!"
                  } else {
                    if(!this.phone.match(phoneRegex)) {
                      this.message = "Broj telefona nije u dobrom formatu!"
                    } else {
                      if(this.address == "") {
                        this.message = "Unesite Adresu!"
                      } else {
                        if(this.email == "") {
                          this.message = "Unesite Email!"
                        } else {
                          if(!this.email.match(emailRegex)) {
                            this.message = "Email nije u dobrom formatu!"
                          } else {
                            if(this.license == "") {
                              this.message = "Unesite licencu!"
                            } else {
                              if(this.specialization == "") {
                                this.message = "Unesite specijalizaciju!"
                              } else {
                                if(this.branch == "") {
                                  this.message = "Unesite ogranak!"
                                } else {
                                  this.patientService.getEmail(this.email).subscribe((user: Patient)=>{
                                    if(!user) {
                                      this.doctorService.getEmail(this.email).subscribe((user1: Doctor)=>{
                                        if(!user1) {
                                          this.patientService.getUsername(this.username).subscribe((user2 : Patient)=>{
                                            if(!user2) {
                                              this.doctorService.getUsername(this.username).subscribe((user3: Doctor)=>{
                                                if(!user3) {
                                                  this.patientService.registerUser(userData, this.userImage, this.action).subscribe()
                                                  this.message = "Uspešno ste se registrovali!"
                                                } else {
                                                  this.message = "Korisničko ime već postoji!"
                                                }
                                              })
                                            } else {
                                              this.message = "Korisničko ime već postoji!"
                                            }
                                          })
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
                            }
                          }
                        }
                      }
                    } 
                  }
                }
              }     
            } 
          }
        }
      }
    } 
  }

  onFileSelected(event) {
    //console.log(event)
    this.userImage = <File>event.target.files[0]
  }

  onOptionSelected(spec) {
    const foundSpecialization = this.specializations.find(spec => spec.specialization === this.selectedOption);
    this.branch = foundSpecialization.branch
  }

}
