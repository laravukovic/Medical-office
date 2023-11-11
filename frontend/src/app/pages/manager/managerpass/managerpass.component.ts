import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-managerpass',
  templateUrl: './managerpass.component.html',
  styleUrls: ['./managerpass.component.css']
})
export class ManagerpassComponent implements OnInit {

  constructor(private adminService: AdminService, private ruter: Router) { }

  ngOnInit(): void {
    const logedUserJSON = localStorage.getItem('loged')
    if (!logedUserJSON) {
      this.ruter.navigate(['manager']);
    } else {
      this.manager = JSON.parse(logedUserJSON)

      if(this.manager.type != "admin") {
        localStorage.setItem('activePage', 'Manager')
        localStorage.setItem('registered', 'manager')
        localStorage.removeItem('type')
        localStorage.removeItem('loged')

        this.ruter.navigate(['manager']);
      } else {
        if(this.manager.type != "admin") {
          this.ruter.navigate(['manager']);
        }
    
        localStorage.setItem('activePage', 'Managerpass');
        localStorage.setItem('registered', 'yes');
        localStorage.setItem('type', 'manager');
    
        this.oldPass = ""
        this.newPass = ""
        this.repeatPass = ""
        
        this.message = ""
      }
    }
  }

  manager: Admin

  oldPass: string
  newPass: string
  repeatPass: string
  
  message: string

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
      if(this.oldPass != this.manager.password) {
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
                this.adminService.changePassword(this.manager.username, this.newPass).subscribe();
                localStorage.setItem('activePage', 'Home');
                localStorage.setItem('registered', 'no');
                localStorage.removeItem('type');
                localStorage.removeItem('loged');

                this.ruter.navigate(['manager']);
              }
            }
          }
        }
      }
    }
  }

}
