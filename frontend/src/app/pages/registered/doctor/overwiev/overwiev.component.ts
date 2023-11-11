import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { Schedule } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-overwiev',
  templateUrl: './overwiev.component.html',
  styleUrls: ['./overwiev.component.css']
})
export class OverwievComponent implements OnInit {

  constructor(private route: ActivatedRoute, private reportService: ReportService, private doctorService: DoctorService, private patientService: PatientService, private scheduleService: ScheduleService, private ruter: Router) { }

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
    
        this.show = false
        this.name = ""
        this.date = ""
        this.time = ""
    
        this.reason = ""
        this.diagnosis = ""
        this.therapy = ""
        this.next = ""
        this.message = ""
    
        this.route.queryParams.subscribe((params: Params) => {
          this.username = params['patient']
    
          this.patientService.getUsername(this.username).subscribe((patient: Patient)=>{
            this.patient = patient
          })
    
          const logedUserJSON = localStorage.getItem('loged')
          this.doctor = JSON.parse(logedUserJSON)
    
          this.schedules = []
    
          this.reportService.getUser(this.username).subscribe((reports: Report[])=>{
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
          })
    
          this.scheduleService.getNoReportSchedule(this.username, this.doctor.username).subscribe((schedules: Schedule[])=>{
            this.temp = schedules
    
            this.temp.forEach(schedule => {
              const datePart = schedule.date;
              const timePart = schedule.time;
    
              const [day, month, year] = datePart.split('.').map(Number);
              const [hours, minutes] = timePart.split(':').map(Number);
    
              const combinedDate = new Date(year, month - 1, day, hours, minutes);
              if(combinedDate <= new Date()) {
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
          })
        });
      }
    }
  }

  username: string
  reports: Report[]
  patient: Patient
  doctor: Doctor

  temp: Schedule[]
  schedules: Schedule[]

  show: boolean
  name: string
  date: string
  time: string

  reason: string
  diagnosis: string
  therapy: string
  next: string
  message: string

  nextFormat(date) {
    if(date == "") return "/"
    else return date
  }

  open(name, date, time) {
    this.show = true

    this.name = name
    this.date = date
    this.time = time
  }

  close() {
    this.show = false
  }

  input() {
    if(this.reason == "") {
      this.message = "Unesite razlog dolaska!"
    } else {
      if(this.diagnosis == "") {
        this.message = "Unesite dijagnozu!"
      } else {
        if(this.therapy == "") {
          this.message = "Unesite terapiju!"
        } else {
          this.reportService.insertReport(this.name, this.date, this.time, this.patient.username, this.doctor.username, this.doctor.specialization, this.doctor.branch, this.reason, this.diagnosis, this.therapy, this.next).subscribe()
          this.scheduleService.updateReport(this.name, this.date, this.time, this.patient.username, this.doctor.username).subscribe()
          window.location.reload()
        }
      }
    }
  }
}
