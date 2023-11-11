import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Doctor } from 'src/app/models/doctor.model'
import { Examination } from 'src/app/models/examination.model'
import { Patient } from 'src/app/models/patient.model'
import { Schedule } from 'src/app/models/schedule.model'
import { DoctorService } from 'src/app/services/doctor.service'
import { ExaminationService } from 'src/app/services/examination.service'
import { ScheduleService } from 'src/app/services/schedule.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private doctorService: DoctorService, private examinationService: ExaminationService, private scheduleService: ScheduleService, private ruter: Router) { }

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
        localStorage.setItem('activePage', 'Doctors')
        localStorage.setItem('registered', 'yes')
        localStorage.setItem('type', 'patient')
    
        this.route.queryParams.subscribe((params: Params) => {
          this.username = params['username']
    
          this.doctorService.getUsername(this.username).subscribe((doctor: Doctor)=>{
            this.doctor = doctor
    
            this.examinationService.getDoctorsExaminations(this.doctor.username).subscribe((examinations: Examination[])=>{
              this.examinations = examinations
            })        
          })
        });
        
        this.name = ""
        this.price = ""
        this.duration = ""
        this.show = false
    
        this.date = ""
        this.time = ""
    
        this.schedules = []
        this.check = true
      }
    }
  }

  patient: Patient

  username: string
  doctor: Doctor
  examinations: Examination[]

  message: string
  date: string
  time: string

  show: boolean
  name: string
  price: string
  duration: string

  schedules: Schedule[]
  check: boolean

  view(name, price, duration) {
    this.name = name
    this.price = price
    this.duration = duration

    this.show = true
  }

  private isTimeBetween(startTime, endTime, targetTime) {
    var currentDate = new Date()   

    var startDate = new Date(currentDate.getTime())
    startDate.setHours(startTime.split(":")[0])
    startDate.setMinutes(startTime.split(":")[1])

    var endDate = new Date(currentDate.getTime())
    endDate.setHours(endTime.split(":")[0])
    endDate.setMinutes(endTime.split(":")[1])

    var targetDate = new Date(currentDate.getTime())
    targetDate.setHours(targetTime.split(":")[0])
    targetDate.setMinutes(targetTime.split(":")[1])

    return startDate <= targetDate && endDate >= targetDate
  }

  private addMinutesToTime(time, minutesToAdd) {
    const [hours, minutes] = time.split(':').map(Number)

    // Calculate the total minutes
    const totalMinutes = minutes + Number(minutesToAdd)

    // Calculate the new hours and minutes
    const finalHours = (hours + Math.floor(totalMinutes / 60)) % 24 // Ensure hours stay within 0-23 range
    const finalMinutes = totalMinutes % 60

    const finalTime = `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`

    //console.log(time, minutesToAdd, finalTime)
    return finalTime;
  }
  

  schedule() {
    let test = true
    this.check = true
  
    if (this.date == "") {
      this.message = "Unesite datum!";
      return;
    } else if (this.time == "") {
      this.message = "Unesite vreme!";
      return;
    }

    const regex = /^\d{2}\.\d{2}\.\d{4}$/;

    if (regex.test(this.date)) {
      const dateParts = this.date.split('.');

      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);    // Convert day to integer
        const month = parseInt(dateParts[1], 10);  // Convert month to integer
        const year = parseInt(dateParts[2], 10);   // Convert year to integer


        if(month < 1 || month > 12) {
          test = false
          this.message = "Datum nije u dobrom formatu!"
        } else {
          if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            if(day < 1 || day > 31) {
              test = false
              this.message = "Datum nije u dobrom formatu!"
            } 
          } else {
            if(month == 4 || month == 6 || month == 9 || month == 11) {
              if(day < 1 || day > 30) {
                test = false
                this.message = "Datum nije u dobrom formatu!"
              } 
            } else {
              if(month == 2) {
                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                  if(day < 1 || day > 29) {
                    test = false
                    this.message = "Datum nije u dobrom formatu!"
                  } 
                } else {
                  if(day < 1 || day > 28) {
                    test = false
                    this.message = "Datum nije u dobrom formatu!"
                  } 
                }
              }
            }
          }
        }

        if(test) {
          const today = new Date()
          if(today.getFullYear() > year) {
            this.message = "Nije moguće zakazivanje!"
          } else {
            if((today.getFullYear() == year) && (today.getMonth() + 1 > month)) {
              this.message = "Nije moguće zakazivanje!"
            } else {
              if((today.getFullYear() == year) && (today.getMonth() + 1 == month) && (today.getDate() > day)) {
                this.message = "Nije moguće zakazivanje!"
              } else {
                
                const regex = /^([01]\d|2[0-3]):[0-5]\d$/;

                if (regex.test(this.time)) {
                  let test1 = true
                  const currentHours = today.getHours();
                  const currentMinutes = today.getMinutes();

                  const timeParts = this.time.split(':');

                  if (timeParts.length === 2) {
                    const hours = parseInt(timeParts[0], 10);    // Convert hours to integer
                    const minutes = parseInt(timeParts[1], 10);  // Convert minutes to integer

                    if(year == today.getFullYear() && month == today.getMonth() + 1 && day == today.getDate()) {
                      if(currentHours > hours) {
                        test1 = false
                        this.message = "Nije moguće zakazivanje!"
                      } else {
                        if(currentHours == hours && currentMinutes > minutes) {
                          test1 = false
                          this.message = "Nije moguće zakazivanje!"
                        } 
                      }
                    }

                  } else {
                    test1 = false
                    this.message = "Vreme nije u dobrom formatu!"
                  }

                  if(test1) {
                    this.scheduleService.getDoctor(this.username).subscribe((schedules: Schedule[]) => {
                      this.schedules = schedules;
          
                      const examinationPromises = this.schedules.map(schedule => {
                        return this.examinationService.getExamination(schedule.name).toPromise();
                      });
          
                      Promise.all(examinationPromises)
                        .then((examinations: Examination[]) => {
                          for (let i = 0; i < this.schedules.length; i++) {
                            const schedule = this.schedules[i];
                            const examination = examinations[i];

                            const dateParts1 = this.date.split('.');
                            const dateParts2 = schedule.date.split('.');

                            const day1 = parseInt(dateParts1[0], 10);    // Convert day to integer
                            const month1 = parseInt(dateParts1[1], 10);  // Convert month to integer
                            const year1 = parseInt(dateParts1[2], 10);   // Convert year to integer

                            const day2 = parseInt(dateParts2[0], 10);    // Convert day to integer
                            const month2 = parseInt(dateParts2[1], 10);  // Convert month to integer
                            const year2 = parseInt(dateParts2[2], 10);   // Convert year to integer
          
                            if (year1 == year2 && month1 == month2 && day1 == day2) {
        
                              //console.log(this.isTimeBetween(schedule.time, this.addMinutesToTime(schedule.time, examination.duration), this.time) ,schedule.time, this.addMinutesToTime(schedule.time, examination.duration), this.time)
                              //console.log(this.isTimeBetween(schedule.time, this.addMinutesToTime(schedule.time, examination.duration), this.addMinutesToTime(this.time, this.duration)) ,schedule.time, this.addMinutesToTime(schedule.time, examination.duration), this.addMinutesToTime(this.time, this.duration))
                              if(this.isTimeBetween(schedule.time, this.addMinutesToTime(schedule.time, examination.duration), this.time) || this.isTimeBetween(schedule.time, this.addMinutesToTime(schedule.time, examination.duration), this.addMinutesToTime(this.time, this.duration))) {
                                this.check = false
                              }
                      
                            }
                          }
          
                          if (this.check) {
                            this.scheduleService.addSchedule(this.name, this.date, this.time, this.patient.username, this.username, this.doctor.branch).subscribe()
                            this.message = "Uspešno ste zakazali pregled!";
                    
                          } else {
                            this.message = "Doktor nije slobodan u navedenom terminu!";
                          }
                        })
                        .catch(error => {
                          // Handle errors from promise rejections
                        });
                    });  
                  }

                } else {
                  this.message = "Vreme nije u dobrom formatu!"
                }
              }
            }
          }
        }
      } else {
        this.message = "Datum nije u dobrom formatu!"
      }
    } else {
      this.message = "Datum nije u dobrom formatu!"
    }  
  }
  

  back() {
    this.message = ""
    this.date = ""
    this.time = ""
    this.show = false
  }
}
