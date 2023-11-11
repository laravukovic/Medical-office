import * as express from 'express';
import Patient from '../models/patient'

const fs = require('fs');
const path = require('path');

export class PatientController {

    getUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
          
        Patient.findOne({"username":username}, (err, patient)=>{
            if(err) console.log(err);
            else res.json(patient);
        })
    }
      
    getUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
          
        Patient.findOne({"username":username, "password":password}, (err, patient)=>{
            if(err) console.log(err);
            else res.json(patient);
        })
    }

    getEmail = (req: express.Request, res: express.Response) => {
        let email = req.body.email;
      
        Patient.findOne({"email":email}, (err, patient)=>{
          if(err) console.log(err);
          else res.json(patient);
        })
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
      
        Patient.collection.updateMany({"username":username},{$set:{"password": password }})
    }

    getAllPatients = (req: express.Request, res: express.Response) => {
        Patient.find({}, (err, patients)=>{
            if(err) console.log(err);
            else res.json(patients);
        })
    }

    deletePatient = (req: express.Request, res: express.Response) => { 
        var username = req.body.username
        Patient.collection.deleteOne({ "username": username })
    }

    getRequests = (req: express.Request, res: express.Response) => {
          
        Patient.find({"status":"waiting"}, (err, patients)=>{
            if(err) console.log(err);
            else res.json(patients);
        })
    }

    updateRequest = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let action = req.body.action;
      
        Patient.collection.updateMany({"username":username},{$set:{"status": action }})
    }

    getAcceptedPatients = (req: express.Request, res: express.Response) => {
        
        Patient.find({"status": { $ne: "waiting" }}, (err, patients) => {
          if (err) console.log(err);
          else res.json(patients);
        });
      }
      
}