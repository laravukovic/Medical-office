import * as express from 'express';
import Doctor from '../models/doctor'

export class DoctorController {
    getAllDoctors = (req: express.Request, res: express.Response) => {
        Doctor.find({}, (err, doctors)=>{
            if(err) console.log(err);
            else res.json(doctors);
        })
    }

    getUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
          
        Doctor.findOne({"username":username}, (err, doctor)=>{
            if(err) console.log(err);
            else res.json(doctor);
        })
    }
      
    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
          
        Doctor.findOne({"username":username, "password":password}, (err, doctor)=>{
            if(err) console.log(err);
            else res.json(doctor);
        })
    }

    getEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
      
        Doctor.findOne({"email":email}, (err, doctor)=>{
          if(err) console.log(err);
          else res.json(doctor);
        })
    }

    deleteDoctor = (req: express.Request, res: express.Response) => { 
        var username = req.body.username
        Doctor.collection.deleteOne({ "username": username })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
      
        Doctor.collection.updateMany({"username":username},{$set:{"password": password }})
    }

    getAcceptedDoctors = (req: express.Request, res: express.Response) => {
          
        Doctor.find({"status":"accepted"}, (err, doctors)=>{
            if(err) console.log(err);
            else res.json(doctors);
        })
    }
}