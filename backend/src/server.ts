import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import adminRouter from './routers/admin.router';
import doctorRouter from './routers/doctor.router';
import patientRouter from './routers/patient.router';
import patient from './models/patient';
import examinationRouter from './routers/examination.router';
import scheduleRouter from './routers/schedule.router';
import reportRouter from './routers/report.router';
import doctor from './models/doctor';
import specializationRouter from './routers/specialization.router';

const path = require('path');

const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');

const storage = multer.memoryStorage()

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: any, arg1: boolean) => void) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: fileFilter
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ordination');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connection ok')
})

const router = express.Router();
router.use('/admin', adminRouter)
router.use('/doctors', doctorRouter)
router.use('/patients', patientRouter)
router.use('/examinations', examinationRouter)
router.use('/schedules', scheduleRouter)
router.use("/reports", reportRouter)
router.use("/specializations", specializationRouter)

app.use('/uploads', express.static('uploads'))

router.post('/registerUser', upload.single('userImage'), async (req, res, next) => {
  let action = req.body.action;

  if(action == "register") {
    console.log(req.body);
    // // @ts-ignore
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;
    let img = req.body.image + ".jpg";
    let type = req.body.type;
    let status = req.body.status;

    if(type == "patient") {
      if(req.file != null) {

        fs.access('./uploads/patient_images', (err: any) => {
          if(err) {
            fs.mkdirSync('./uploads/patient_images')
          }
        })

        // @ts-ignore
        await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/patient_images/' + username + ".jpg");

      }
    } else {
      if(req.file != null) {

        fs.access('./uploads/doctor_images', (err: any) => {
          if(err) {
            fs.mkdirSync('./uploads/doctor_images')
          }
        })

        // @ts-ignore
        await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/doctor_images/' + username + ".jpg");

      }
    }     

    if(type == "patient") {
      patient.insertMany({"username":username, "password":password, "firstname":firstname, "lastname":lastname, "address":address, "phone":phone, "email":email, "img": img, "status":status, "type": "patient"});
    } else {
      let license = req.body.license
      let specialization = req.body.specialization
      let branch = req.body.branch
      doctor.insertMany({"username":username, "password":password, "firstname":firstname, "lastname":lastname, "address":address, "phone":phone,"email":email, "license":license, "specialization": specialization, "branch":branch ,"img": img, "status":status, "type": "doctor"});
    }
  } else {
    console.log(req.body);
    // // @ts-ignore
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let address = req.body.address;
    let email = req.body.email;
    let img = req.body.image + ".jpg";
    let type = req.body.type;

    if(type == "patient") {
      if(req.file != null) {

        fs.access('./uploads/patient_images', (err: any) => {
          if(err) {
            fs.mkdirSync('./uploads/patient_images')
          }
        })

        // @ts-ignore
        await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/patient_images/' + username + ".jpg");

      }
    } else {
      if(req.file != null) {

        fs.access('./uploads/doctor_images', (err: any) => {
          if(err) {
            fs.mkdirSync('./uploads/doctor_images')
          }
        })

        // @ts-ignore
        await sharp(req.file.buffer).toFile('./uploads/doctor_images/' + username + ".jpg");

      }
    }     

    if(type == "patient") {
      patient.collection.updateMany({"username":username},{$set:{"firstname":firstname, "lastname":lastname, "phone":phone, "address":address, "email":email}});
    } else {
      let license = req.body.license
      let specialization = req.body.specialization
      let branch = req.body.branch
      doctor.collection.updateMany({"username":username},{$set:{"firstname":firstname, "lastname":lastname, "phone":phone, "address":address, "license":license, "specialization": specialization, "branch": branch}});
    }
  }
    
})

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));