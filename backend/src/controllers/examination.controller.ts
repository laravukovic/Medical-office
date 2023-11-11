import * as express from 'express';
import Examination from '../models/examination'

export class ExaminationController {

    getBranch = (req: express.Request, res: express.Response) => {
        let branch = req.body.branch;
          
        Examination.find({"branch":branch}, (err, examinations)=>{
            if(err) console.log(err);
            else res.json(examinations);
        })
    }

    getExamination = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
          
        Examination.findOne({"name":name}, (err, examination)=>{
            if(err) console.log(err);
            else res.json(examination);
        })
    }

    getDoctorsExaminations = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
          
        Examination.find({"doctors":doctor, "accepted": true}, (err, examinations)=>{
            if(err) console.log(err);
            else res.json(examinations);
        })
    }

    addDoctorToExamination = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let name = req.body.name; 
        
        Examination.collection.updateOne({"name":name},{$push:{"doctors": doctor}})
    }

    removeDoctorFromExamination = (req: express.Request, res: express.Response) => {
        let doctor = req.body.doctor;
        let name = req.body.name;  
        
        Examination.collection.updateOne({"name":name},{$pull:{"doctors": doctor}})
    }

    insertExamination = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let duration = req.body.duration;
        let price = req.body.price;
        let specialization = req.body.specialization
        let branch = req.body.branch;
        let doctors = req.body.doctors;
            
        Examination.insertMany({"name":name, "duration":duration, "price":price, "specialization":specialization, "branch":branch, "doctors": doctors, "accepted": false});
    }

    getRequests = (req: express.Request, res: express.Response) => {
          
        Examination.find({"accepted":false}, (err, examinations)=>{
            if(err) console.log(err);
            else res.json(examinations);
        })
    }

    updateRequest = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
      
        Examination.collection.updateMany({"name":name},{$set:{"accepted": true }})
    }

    deleteRequest = (req: express.Request, res: express.Response) => { 
        var name = req.body.name
        Examination.collection.deleteOne({ "name": name })
    }

    getBySpecialization = (req: express.Request, res: express.Response) => {
        let specialization = req.body.specialization;
          
        Examination.find({"specialization":specialization, "accepted":true}, (err, examinations)=>{
            if(err) console.log(err);
            else res.json(examinations);
        })
    }

    updatePrice = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let price = req.body.price;
      
        Examination.collection.updateMany({"name":name},{$set:{"price": price }})
    }

    addExamination = (req: express.Request, res: express.Response) => {
        let name = req.body.name;
        let duration = req.body.duration;
        let price = req.body.price;
        let specialization = req.body.specialization
        let branch = req.body.branch;
        let doctors = req.body.doctors;
            
        Examination.insertMany({"name":name, "duration":duration, "price":price, "specialization":specialization, "branch":branch, "doctors": doctors, "accepted": true});
    }

    getAllExaminations = (req: express.Request, res: express.Response) => {

        Examination.find({}, (err, examinations)=>{
            if(err) console.log(err);
            else res.json(examinations);
        })
    }
   
}