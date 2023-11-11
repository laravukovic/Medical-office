import * as express from 'express';
import Specialization from '../models/specialization'

export class SpecializationController {

    getAllSpecializations = (req: express.Request, res: express.Response) => {
        Specialization.find({}, (err, specializations)=>{
            if(err) console.log(err);
            else res.json(specializations);
        })
    }

    addSpecialization = (req: express.Request, res: express.Response) => {
        let specialization = req.body.specialization;
        let branch = req.body.branch;
            
        Specialization.insertMany({"specialization":specialization, "branch":branch});
    }
   
}