import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private adminService: AdminService, private ruter: Router) { }

  ngOnInit(): void {
    localStorage.setItem('activePage', 'Manager');
    localStorage.setItem('registered', 'manager');
    localStorage.setItem('type', 'manager');

    this.username = "";
    this.password = "";
    this.message = "";
  }

  username: string;
  password: string;
  message: string;

  login() { 
    if(this.username == "") {
      this.message = 'Unesite korisničko ime!';
    } else if(this.password == "") {
      this.message = 'Unesite lozinku!';
    } else {
      this.adminService.getUsername(this.username).subscribe((admin: Admin)=>{
        if(!admin) {
          this.message = 'Pogrešno korisničko ime!';
        } else {
          this.adminService.getUser(this.username, this.password).subscribe((admin: Admin)=>{
            if(!admin) {
              this.message = 'Pogrešna lozinka!';
            } else {
              localStorage.setItem('loged', JSON.stringify(admin));
              this.ruter.navigate(['managerusers']);
            }
          }) 
        }       
      })
    }
  }

}
