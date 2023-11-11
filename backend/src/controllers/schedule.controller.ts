import * as express from 'express';
import Schedule from '../models/schedule'

export class ScheduleController {
    
  getDoctor = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
        
    Schedule.find({"doctor":username}, (err, schedules)=>{
      if(err) console.log(err);
      else res.json(schedules);
    })
  }

  addSchedule = (req: express.Request, res: express.Response) => {
    let name = req.body.name;
    let date = req.body.date;
    let time = req.body.time;
    let user = req.body.user;
    let doctor = req.body.doctor;
    let branch = req.body.branch
        
    Schedule.insertMany({"name":name, "date":date, "time":time, "user":user, "doctor": doctor, "branch": branch, "report": false});
  }

  getUser = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
        
    Schedule.find({"user":username}, (err, schedules)=>{
      if(err) console.log(err);
      else res.json(schedules);
    })
  }

  deleteSchedule = (req: express.Request, res: express.Response) => {
    let name = req.body.name;
    let date = req.body.date;
    let time = req.body.time;
    let user = req.body.user;
    let doctor = req.body.doctor;
        
    Schedule.collection.deleteMany({"name":name, "date":date, "time":time, "user":user, "doctor": doctor});
  }

  getNoReportSchedule = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
    let doctor = req.body.doctor;
        
    Schedule.find({"user":username, "doctor":doctor, "report": false}, (err, schedules)=>{
      if(err) console.log(err);
      else res.json(schedules);
    })
  }

  updateReport = (req: express.Request, res: express.Response) => {
    let name = req.body.name;
    let date = req.body.date;
    let time = req.body.time;
    let user = req.body.user;
    let doctor = req.body.doctor;
        
    Schedule.collection.updateMany({"name":name, "date":date, "time":time, "user":user, "doctor": doctor},{$set:{"report": true }});
  }

  deleteUserSchedule = (req: express.Request, res: express.Response) => {
    let user = req.body.user;
        
    Schedule.collection.deleteMany({"user":user});
  }

  deleteDoctorSchedule = (req: express.Request, res: express.Response) => {
    let doctor = req.body.doctor;
        
    Schedule.collection.deleteMany({"doctor":doctor, "report": false});
  }

}