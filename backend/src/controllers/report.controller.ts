import * as express from 'express';
import Report from '../models/report'

export class ReportController {
    
  getUser = (req: express.Request, res: express.Response) => {
    let username = req.body.username;
            
    Report.find({"user":username}, (err, reports)=>{
      if(err) console.log(err);
      else res.json(reports);
    })
  }

  insertReport = (req: express.Request, res: express.Response) => {
    let name = req.body.name;
    let date = req.body.date;
    let time = req.body.time;
    let user = req.body.user;
    let doctor = req.body.doctor;
    let specialization = req.body.specialization;
    let branch = req.body.branch;
    let reason = req.body.reason; 
    let diagnosis = req.body.diagnosis; 
    let therapy = req.body.therapy; 
    let next = req.body.next;
        
    Report.insertMany({"name":name, "date":date, "time":time, "user":user, "doctor": doctor, "specialization": specialization, "branch": branch, "reason": reason, "diagnosis": diagnosis, "therapy": therapy, "next": next});
  }

  deleteUserReport = (req: express.Request, res: express.Response) => {
    let user = req.body.user;
        
    Report.collection.deleteMany({"user":user});
  }

}