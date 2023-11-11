import express from 'express';
import { DoctorController } from '../controllers/doctor.controller';
const doctorRouter = express.Router();

doctorRouter.route('/getAllDoctors').get(
    (req, res) => new DoctorController().getAllDoctors(req, res)
)

doctorRouter.route('/getUsername').post(
    (req, res) => new DoctorController().getUsername(req, res)
)

doctorRouter.route('/getUser').post(
    (req, res) => new DoctorController().getUser(req, res)
)

doctorRouter.route('/getEmail').post(
    (req, res) => new DoctorController().getEmail(req, res)
)

doctorRouter.route('/deleteDoctor').post(
    (req, res) => new DoctorController().deleteDoctor(req, res)
)

doctorRouter.route('/changePassword').post(
    (req, res) => new DoctorController().changePassword(req, res)
)

doctorRouter.route('/getAcceptedDoctors').get(
    (req, res) => new DoctorController().getAcceptedDoctors(req, res)
)

export default doctorRouter;

