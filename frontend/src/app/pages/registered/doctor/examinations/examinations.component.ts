import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { Schedule } from 'src/app/models/schedule.model';
import { PatientService } from 'src/app/services/patient.service';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-examinations',
  templateUrl: './examinations.component.html',
  styleUrls: ['./examinations.component.css']
})
export class ExaminationsComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private patientService: PatientService, private ruter: Router) { }

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
        localStorage.setItem('activePage', 'Examinations')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'doctor')
    
        this.schedules = []
    
        this.scheduleService.getDoctor(this.doctor.username).subscribe((schedules: Schedule[])=>{
          this.temp = schedules
    
          this.temp.forEach(schedule => {
            const datePart = schedule.date;
            const timePart = schedule.time;
    
            const [day, month, year] = datePart.split('.').map(Number);
            const [hours, minutes] = timePart.split(':').map(Number);
    
            const combinedDate = new Date(year, month - 1, day, hours, minutes);
            if(combinedDate >= new Date()) {
              this.schedules.push(schedule)
            }
          });  
    
          this.schedules.sort((a, b) => {
            const [day, month, year] = a.date.split('.').map(Number);
            const [hours, minutes] = a.time.split(':').map(Number);
            const dateA = new Date(year, month - 1, day, hours, minutes);
            
            const [day1, month1, year1] = b.date.split('.').map(Number);
            const [hours1, minutes1] = b.time.split(':').map(Number);
            const dateB = new Date(year1, month1 - 1, day1, hours1, minutes1);
          
            return dateA.getTime() - dateB.getTime();
          });
    
          this.schedules.forEach(schedule => {
            this.patientService.getUsername(schedule.user).subscribe((patient: Patient)=>{
              schedule.userFullName = patient.firstname + " " + patient.lastname
            })
          });
    
          this.schedules = this.schedules.slice(0,3)
        })
      }
    }
  }

  doctor: Doctor
  schedules: Schedule[]
  temp: Schedule[]
}
