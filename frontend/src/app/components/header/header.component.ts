import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.activePage = localStorage.getItem('activePage');
    this.registered = localStorage.getItem('registered');
    this.type = localStorage.getItem('type');
  }

  activePage:string;
  registered:string;
  type:string;

  logout() {
    localStorage.setItem('activePage', 'Home');
    localStorage.setItem('registered', 'no');
    localStorage.removeItem('type');
    localStorage.removeItem('loged');

    this.ruter.navigate(['']);
  }
}
