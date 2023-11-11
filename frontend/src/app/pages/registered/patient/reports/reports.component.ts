import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Report } from 'src/app/models/report.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ReportService } from 'src/app/services/report.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private scheduleService: ScheduleService, private doctorService: DoctorService, private reportService: ReportService, private ruter: Router) { }

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
        localStorage.setItem('activePage', 'Reports')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'patient')
    
        this.schedules = []
    
        this.scheduleService.getUser(this.patient.username).subscribe((schedules: Schedule[])=>{
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
            this.doctorService.getUsername(schedule.doctor).subscribe((doctor: Doctor)=>{
              schedule.doctorFullName = doctor.firstname + " " + doctor.lastname
            })
          });
        })
    
        this.reportService.getUser(this.patient.username).subscribe((reports: Report[])=>{
          this.reports = reports
    
          this.reports.sort((a, b) => {
            const [day, month, year] = a.date.split('.').map(Number);
            const [hours, minutes] = a.time.split(':').map(Number);
            const dateA = new Date(year, month - 1, day, hours, minutes);
            
            const [day1, month1, year1] = b.date.split('.').map(Number);
            const [hours1, minutes1] = b.time.split(':').map(Number);
            const dateB = new Date(year1, month1 - 1, day1, hours1, minutes1);
          
            return dateA.getTime() - dateB.getTime();
          });
    
          this.reports.forEach(report => {
            this.doctorService.getUsername(report.doctor).subscribe((doctor: Doctor)=>{
              report.doctorFullName = doctor.firstname + " " + doctor.lastname
            })
          });
    
          if(this.reports.length == 0) {
            this.footBool = false
          } else {
            this.footBool = true
          }
        })
    
        this.show = false
        this.name = ""
        this.date = ""
        this.time = ""
        this.user = ""
        this.doctor = ""
      }
    }
  }

  patient: Patient
  temp: Schedule[]
  schedules: Schedule[]
  reports: Report[]

  show: boolean
  name: string
  date: string
  time: string
  user: string
  doctor: string

  footBool: boolean

  cancelShow(name, date, time, user, doctor) {
    this.show = true
    this.name = name
    this.date = date
    this.time = time
    this.user = user
    this.doctor = doctor
  }

  cancel() {
    this.scheduleService.deleteSchedule(this.name, this.date, this.time, this.user, this.doctor).subscribe()
    window.location.reload()
  }

  no() {
    this.show = false
  }

  nextFormat(date) {
    if(date == "") return "/"
    else return date
  }
}
